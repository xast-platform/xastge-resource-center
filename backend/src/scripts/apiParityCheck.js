const baseUrl = process.env.PARITY_BASE_URL || "http://localhost:3000";
const parityUser = process.env.PARITY_USER || "john_creator";
const parityPass = process.env.PARITY_PASS || "password123";

async function ensureServerIsReachable() {
   try {
      const response = await fetch(`${baseUrl}/graphql`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ query: "query { __typename }" }),
      });

      if (!response.ok) {
         throw new Error(`healthcheck failed with status ${response.status}`);
      }
   } catch (_err) {
      throw new Error(
         [
         `Cannot reach API server at ${baseUrl}`,
         "Start backend first, then rerun parity tests",
         "From project root:",
         "  cd .. && npm run dev",
         "From backend folder:",
         "  npm run start",
         ].join("\n")
      );
   }
}

async function rest(method, path, { token, body } = {}) {
   const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
         ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
   });

   const text = await response.text();
   let data;
   try {
      data = text ? JSON.parse(text) : {};
   } catch (_err) {
      data = { raw: text };
   }

   return { ok: response.ok, status: response.status, data };
}

async function gql(query, variables = {}, { token } = {}) {
   const response = await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
   });

   const payload = await response.json();
   const hasErrors = Array.isArray(payload.errors) && payload.errors.length > 0;

   return {
      ok: response.ok && !hasErrors,
      status: response.status,
      data: payload.data || {},
      errors: payload.errors || [],
   };
}

function stableSortObject(value) {
   if (Array.isArray(value)) {
      return value.map(stableSortObject);
   }

   if (value && typeof value === "object") {
      return Object.keys(value)
         .sort()
         .reduce((acc, key) => {
         acc[key] = stableSortObject(value[key]);
         return acc;
         }, {});
   }

   return value;
}

function assert(condition, message) {
   if (!condition) {
      throw new Error(message);
   }
}

function pickUser(user) {
   return {
      username: user.username,
      email: user.email,
      confirmed: Boolean(user.confirmed),
      role: user.role,
   };
}

function pickAsset(asset) {
   return {
      id: String(asset.id),
      ownerId: String(asset.ownerId || ""),
      authorName: String(asset.authorName || ""),
      assetType: asset.assetType,
      description: asset.description,
      tags: Array.isArray(asset.tags) ? [...asset.tags].sort() : [],
      fileName: asset.fileName,
      fileUrl: asset.fileUrl,
      thumbnailUrl: asset.thumbnailUrl || "",
      favoriteCount: Number(asset.favoriteCount || 0),
      downloadCount: Number(asset.downloadCount || 0),
      isFavorite: Boolean(asset.isFavorite),
   };
}

function normalizeAssetList(assets) {
   return assets
      .map(pickAsset)
      .sort((a, b) => a.id.localeCompare(b.id));
}

function compareEqual(label, left, right) {
   const a = JSON.stringify(stableSortObject(left));
   const b = JSON.stringify(stableSortObject(right));

   if (a !== b) {
      throw new Error(`${label} mismatch\nREST: ${a}\nGQL : ${b}`);
   }

   console.log(`PASS ${label}`);
}

async function main() {
   console.log(`Running parity checks against ${baseUrl}`);

   await ensureServerIsReachable();

   const restLogin = await rest("POST", "/api/auth/login", {
      body: {
         username: parityUser,
         password: parityPass,
         saveSession: true,
      },
   });

   assert(restLogin.ok, `REST login failed (${restLogin.status})`);
   assert(restLogin.data.token, "REST login did not return token");

   const gqlLogin = await gql(
      `mutation Login($username: String!, $password: String!, $saveSession: Boolean) {
         login(username: $username, password: $password, saveSession: $saveSession) {
         token
         user { username email confirmed role }
         }
      }`,
      {
         username: parityUser,
         password: parityPass,
         saveSession: true,
      }
   );

   assert(gqlLogin.ok, `GraphQL login failed (${gqlLogin.status}) ${JSON.stringify(gqlLogin.errors)}`);
   assert(gqlLogin.data.login && gqlLogin.data.login.token, "GraphQL login did not return token");

   compareEqual("login user payload", pickUser(restLogin.data.user), pickUser(gqlLogin.data.login.user));

   const token = restLogin.data.token;

   const restMe = await rest("GET", "/api/auth/me", { token });
   assert(restMe.ok, `REST me failed (${restMe.status})`);

   const gqlMe = await gql(
      `query {
         me {
         user { username email confirmed role }
         }
      }`,
      {},
      { token }
   );

   assert(gqlMe.ok, `GraphQL me failed (${gqlMe.status}) ${JSON.stringify(gqlMe.errors)}`);
   compareEqual("me user payload", pickUser(restMe.data.user), pickUser(gqlMe.data.me.user));

   const listQuery = "?mine=false&favorites=false&limit=20&page=1&type=Scene";
   const restList = await rest("GET", `/api/assets${listQuery}`, { token });
   assert(restList.ok, `REST list assets failed (${restList.status})`);

   const gqlList = await gql(
      `query ListAssets($mine: Boolean, $favorites: Boolean, $limit: Int, $page: Int, $type: String) {
         listAssets(mine: $mine, favorites: $favorites, limit: $limit, page: $page, type: $type) {
         assets {
            id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite
         }
         }
      }`,
      {
         mine: false,
         favorites: false,
         limit: 20,
         page: 1,
         type: "Scene",
      },
      { token }
   );

   assert(gqlList.ok, `GraphQL list assets failed (${gqlList.status}) ${JSON.stringify(gqlList.errors)}`);
   compareEqual(
      "list assets",
      normalizeAssetList(restList.data.assets || []),
      normalizeAssetList((gqlList.data.listAssets && gqlList.data.listAssets.assets) || [])
   );

   const restLatest = await rest("GET", "/api/assets?limit=12", { token });
   assert(restLatest.ok, `REST latest assets failed (${restLatest.status})`);

   const gqlLatest = await gql(
      `query {
         latestAssets(limit: 12) {
         assets {
            id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite
         }
         }
      }`,
      {},
      { token }
   );

   assert(gqlLatest.ok, `GraphQL latest assets failed (${gqlLatest.status}) ${JSON.stringify(gqlLatest.errors)}`);
   compareEqual(
      "latest assets",
      normalizeAssetList(restLatest.data.assets || []),
      normalizeAssetList((gqlLatest.data.latestAssets && gqlLatest.data.latestAssets.assets) || [])
   );

   const candidateAsset = (restLatest.data.assets || [])[0] || (restList.data.assets || [])[0];
   assert(candidateAsset && candidateAsset.id, "No assets found to compare by id");

   const restById = await rest("GET", `/api/assets/${candidateAsset.id}`, { token });
   assert(restById.ok, `REST get asset by id failed (${restById.status})`);

   const gqlById = await gql(
      `query AssetById($id: ID!) {
         asset(id: $id) {
         asset {
            id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite
         }
         }
      }`,
      { id: candidateAsset.id },
      { token }
   );

   assert(gqlById.ok, `GraphQL get asset by id failed (${gqlById.status}) ${JSON.stringify(gqlById.errors)}`);
   compareEqual("asset by id", pickAsset(restById.data.asset), pickAsset(gqlById.data.asset.asset));

   const restAnalytics = await rest("GET", "/api/assets/analytics/downloads", { token });
   assert(restAnalytics.ok, `REST analytics failed (${restAnalytics.status})`);

   const gqlAnalytics = await gql(
      `query {
         downloadAnalytics {
         analytics { assetType totalDownloads assetsCount }
         }
      }`,
      {},
      { token }
   );

   assert(gqlAnalytics.ok, `GraphQL analytics failed (${gqlAnalytics.status}) ${JSON.stringify(gqlAnalytics.errors)}`);

   const normAnalytics = (rows) =>
      (rows || [])
         .map((row) => ({
         assetType: row.assetType,
         totalDownloads: Number(row.totalDownloads || 0),
         assetsCount: Number(row.assetsCount || 0),
         }))
         .sort((a, b) => a.assetType.localeCompare(b.assetType));

   compareEqual(
      "download analytics",
      normAnalytics(restAnalytics.data.analytics),
      normAnalytics(gqlAnalytics.data.downloadAnalytics && gqlAnalytics.data.downloadAnalytics.analytics)
   );

   console.log("\nAll parity checks passed");
}

main().catch((err) => {
   console.error("\nParity checks failed");
   console.error(err.message || String(err));
   process.exit(1);
});
