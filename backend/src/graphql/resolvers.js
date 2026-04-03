const authService = require("../service/authService");
const assetService = require("../service/assetService");

function requireAuthUser(context) {
   if (!context || !context.user || !context.user.id) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
   }

   return context.user;
}

function makeAssetReq({ context, params = {}, body = {}, query = {} }) {
   return {
      user: context.user || undefined,
      params,
      body,
      query,
   };
}

module.exports = {
   register: async ({ username, email, password, saveSession = false }) => {
      return authService.register({ username, email, password, saveSession });
   },

   login: async ({ username, password, saveSession = false }) => {
      return authService.login({ username, password, saveSession });
   },

   me: async (_args, context) => {
      const user = requireAuthUser(context);
      return authService.getMe(user.id);
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

   updateAsset: async ({ id, assetType, description, tags }, context) => {
      requireAuthUser(context);

      const req = makeAssetReq({
         context,
         params: { id },
         body: { assetType, description, tags },
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