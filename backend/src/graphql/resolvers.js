const authService = require("../service/authService");
const assetService = require("../service/assetService");

function streamToBuffer(stream) {
   return new Promise((resolve, reject) => {
      const chunks = [];

      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("error", reject);
   });
}

async function toServiceFile(uploadPromise) {
   const upload = await uploadPromise;
   const resolvedUpload = upload && upload.promise ? await upload.promise : upload;
   const fileUpload = resolvedUpload && resolvedUpload.file ? resolvedUpload.file : resolvedUpload;

   if (!fileUpload || typeof fileUpload.createReadStream !== "function") {
      const error = new Error("Invalid upload payload");
      error.status = 400;
      throw error;
   }

   const stream = fileUpload.createReadStream();
   const buffer = await streamToBuffer(stream);

   return {
      originalname: fileUpload.filename,
      mimetype: fileUpload.mimetype,
      size: buffer.length,
      buffer,
   };
}

function requireAuthUser(context) {
   if (!context || !context.user || !context.user.id) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
   }

   return context.user;
}

function makeAssetReq({ context, params = {}, body = {}, query = {}, files = undefined }) {
   return {
      user: context.user || undefined,
      params,
      body,
      query,
      files,
   };
}

module.exports = {
   register: async ({ username, email, password, saveSession = false }) => {
      return authService.register({ username, email, password, saveSession });
   },

   login: async ({ username, password, saveSession = false }) => {
      return authService.login({ username, password, saveSession });
   },

   uploadAsset: async ({ assetType, description, tags = "", assetFile, thumbnailFile = null }, context) => {
      const user = requireAuthUser(context);

      const mainFile = await toServiceFile(assetFile);
      const thumb = thumbnailFile ? await toServiceFile(thumbnailFile) : null;

      const req = {
         user,
         body: {
            assetType,
            description,
            tags,
         },
         files: {
            assetFile: [ mainFile ],
            thumbnailFile: thumb ? [ thumb ] : undefined,
         },
      };

      return assetService.uploadAsset(req);
   },

   me: async (_args, context) => {
      const user = requireAuthUser(context);
      return authService.getMe(user.id);
   },

   verifyEmail: async ({ token }) => {
      return authService.verifyEmail(token);
   },

   updateUsername: async ({ username, password }, context) => {
      const user = requireAuthUser(context);
      return authService.updateUsername(user.id, { username, password });
   },

   updatePassword: async ({ currentPassword, newPassword }, context) => {
      const user = requireAuthUser(context);
      return authService.updatePassword(user.id, { currentPassword, newPassword });
   },

   deleteAccount: async ({ password }, context) => {
      const user = requireAuthUser(context);
      return authService.deleteAccount(user.id, { password });
   },

   listAssets: async ({ mine = false, favorites = false, name = "", type = "", tag = "", author = "", q = "", limit = 60, page = 1 }, context) => {
      const req = makeAssetReq({
         context,
         query: {
            mine: mine ? "true" : "false",
            favorites: favorites ? "true" : "false",
            name,
            type,
            tag,
            author,
            q,
            limit: String(limit),
            page: String(page),
         },
      });

      return assetService.listAssets(req);
   },

   latestAssets: async ({ limit = 12 }, context) => {
      const req = makeAssetReq({
         context,
         query: {
            mine: "false",
            favorites: "false",
            limit: String(limit),
            page: "1",
         },
      });

      return assetService.listAssets(req);
   },

   asset: async ({ id }, context) => {
      return assetService.getAssetById(id, context.user ? context.user.id : null);
   },

   downloadAsset: async ({ id }) => {
      return assetService.downloadAsset(id);
   },

   updateAsset: async ({ id, description, tags, thumbnailFile = null }, context) => {
      requireAuthUser(context);

      const thumb = thumbnailFile ? await toServiceFile(thumbnailFile) : null;

      const req = makeAssetReq({
         context,
         params: { id },
         body: { description, tags },
         files: thumb ? { thumbnailFile: [ thumb ] } : undefined,
      });

      const result = await assetService.updateAsset(req);
      return { message: result.message };
   },

   deleteAsset: async ({ id }, context) => {
      requireAuthUser(context);

      const req = makeAssetReq({ context, params: { id } });
      return assetService.deleteAsset(req);
   },

   favoriteAsset: async ({ id }, context) => {
      requireAuthUser(context);

      const req = makeAssetReq({ context, params: { id } });
      return assetService.favoriteAsset(req);
   },

   unfavoriteAsset: async ({ id }, context) => {
      requireAuthUser(context);

      const req = makeAssetReq({ context, params: { id } });
      return assetService.unfavoriteAsset(req);
   },

   reportAsset: async ({ id, reason, message = "" }, context) => {
      requireAuthUser(context);

      const req = makeAssetReq({
         context,
         params: { id },
         body: { reason, message },
      });

      return assetService.reportAsset(req);
   },

   downloadAnalytics: async (_args, context) => {
      const user = requireAuthUser(context);
      return assetService.getDownloadAnalytics(user.id);
   },
};