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

async function restDownloadUrl(assetId) {
   const response = await fetch(`${baseUrl}/api/assets/${assetId}/download`, {
      method: "GET",
      redirect: "manual",
   });

   const location = response.headers.get("location") || "";

   return {
      ok: response.status === 302 && location !== "",
      status: response.status,
      location,
   };
}

async function restUploadAsset(token, fileName) {
   const formData = new FormData();
   const bytes = new Uint8Array([80, 75, 3, 4, 20, 0, 0, 0]); // tiny zip-like header
   const blob = new Blob([bytes], { type: "application/zip" });

   formData.append("assetType", "Scene");
   formData.append("description", "Parity upload asset description for GraphQL/REST check");
   formData.append("tags", "parity,upload");
   formData.append("assetFile", blob, fileName);

   const response = await fetch(`${baseUrl}/api/assets/upload`, {
      method: "POST",
      headers: {
         Authorization: `Bearer ${token}`,
      },
      body: formData,
   });

   const data = await response.json();
   return { ok: response.ok, status: response.status, data };
}

async function gqlUploadAsset(token, fileName) {
   const bytes = new Uint8Array([80, 75, 3, 4, 20, 0, 0, 0]);
   const blob = new Blob([bytes], { type: "application/zip" });

   const operations = {
      query: "mutation($assetType: String!, $description: String!, $tags: String, $assetFile: Upload!, $thumbnailFile: Upload) { uploadAsset(assetType: $assetType, description: $description, tags: $tags, assetFile: $assetFile, thumbnailFile: $thumbnailFile) { message asset { id } } }",
      variables: {
         assetType: "Scene",
         description: "Parity upload asset description for GraphQL/REST check",
         tags: "parity,upload",
         assetFile: null,
         thumbnailFile: null,
      },
   };

   const map = {
      0: ["variables.assetFile"],
   };

   const formData = new FormData();
   formData.append("operations", JSON.stringify(operations));
   formData.append("map", JSON.stringify(map));
   formData.append("0", blob, fileName);

   const response = await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      headers: {
         Authorization: `Bearer ${token}`,
      },
      body: formData,
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

   const restUpload = await restUploadAsset(token, "parity-rest-upload.zip");
   assert(restUpload.ok, `REST upload failed (${restUpload.status})`);

   const gqlUpload = await gqlUploadAsset(token, "parity-graphql-upload.zip");
   assert(gqlUpload.ok, `GraphQL upload failed (${gqlUpload.status}) ${JSON.stringify(gqlUpload.errors)}`);

   compareEqual(
      "upload message",
      { message: restUpload.data.message },
      { message: gqlUpload.data.uploadAsset.message }
   );

   const restUploadId = restUpload.data.asset && restUpload.data.asset.id;
   const gqlUploadId = gqlUpload.data.uploadAsset && gqlUpload.data.uploadAsset.asset && gqlUpload.data.uploadAsset.asset.id;

   assert(restUploadId, "REST upload did not return created asset id");
   assert(gqlUploadId, "GraphQL upload did not return created asset id");

   await rest("DELETE", `/api/assets/${restUploadId}`, { token });
   await rest("DELETE", `/api/assets/${gqlUploadId}`, { token });

   console.log("PASS upload asset");

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

   const invalidToken = "parity-invalid-token";
   const restVerify = await rest("GET", `/api/auth/verify-email?token=${encodeURIComponent(invalidToken)}`);
   assert(!restVerify.ok, "REST verifyEmail with invalid token unexpectedly succeeded");

   const gqlVerify = await gql(
      `query VerifyEmail($token: String!) {
         verifyEmail(token: $token) {
            message
         }
      }`,
      { token: invalidToken }
   );

   assert(!gqlVerify.ok, "GraphQL verifyEmail with invalid token unexpectedly succeeded");

   const restVerifyMessage = String(restVerify.data.message || "").toLowerCase();
   const gqlVerifyMessage = String((gqlVerify.errors[0] && gqlVerify.errors[0].message) || "").toLowerCase();
   assert(restVerifyMessage == gqlVerifyMessage, `verify email error mismatch\nREST: ${restVerifyMessage}\nGQL : ${gqlVerifyMessage}`);
   console.log("PASS verify email invalid token");

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

   const restDownload = await restDownloadUrl(candidateAsset.id);
   assert(restDownload.ok, `REST download redirect failed (${restDownload.status})`);

   const gqlDownload = await gql(
      `query DownloadAsset($id: ID!) {
         downloadAsset(id: $id) {
            url
         }
      }`,
      { id: candidateAsset.id }
   );

   assert(gqlDownload.ok, `GraphQL downloadAsset failed (${gqlDownload.status}) ${JSON.stringify(gqlDownload.errors)}`);
   compareEqual(
      "download asset url",
      { url: restDownload.location },
      { url: gqlDownload.data.downloadAsset.url }
   );

   console.log("\nAll parity checks passed");
}

main().catch((err) => {
   console.error("\nParity checks failed");
   console.error(err.message || String(err));
   process.exit(1);
});
