const storage = require("../storage");
const assetRepository = require("../repository/assetRepository");
const userRepository = require("../repository/userRepository");
const assetReportRepository = require("../repository/assetReportRepository");
const emailService = require("./emailService");

function normalizeAssetType(assetType) {
   return (assetType || "Unknown").trim();
}

function normalizeDescription(description) {
   return (description || "").trim();
}

function parseTags(tagsValue) {
   if (Array.isArray(tagsValue)) {
      return tagsValue
         .map((tag) => String(tag).trim())
         .filter((tag) => tag.length > 0);
   }

   if (!tagsValue || typeof tagsValue !== "string") {
      return [];
   }

   return tagsValue
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
}

function escapeRegex(value) {
   return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toContainsRegex(value) {
   const safeValue = (value || "").trim();
   if (!safeValue) {
      return null;
   }

   return new RegExp(escapeRegex(safeValue), "i");
}

function getLowerName(file) {
   return (file?.originalname || "").toLowerCase();
}

function hasOneOfExtensions(file, extensions) {
   const name = getLowerName(file);
   return extensions.some(ext => name.endsWith(ext));
}

function isZip(file) {
   const mime = file.mimetype;
   return (
      mime === "application/zip" ||
      mime === "application/x-zip-compressed" ||
      mime === "application/x-zip" ||
      hasOneOfExtensions(file, [".zip"])
   );
}

function isModel(file) {
   const mime = file.mimetype;
   return (
      isZip(file) ||
      mime === "model/gltf+json" ||
      mime === "model/gltf-binary" ||
      hasOneOfExtensions(file, [".gltf", ".glb", ".obj"])
   );
}

function isImage(file) {
   return (file.mimetype || "").startsWith("image/");
}

function isTexture(file) {
   return isImage(file) || isZip(file);
}

function isAudio(file) {
   return (file.mimetype || "").startsWith("audio/");
}

function isScript(file) {
   const mime = file.mimetype;
   return (
      isZip(file) ||
      mime === "text/plain" ||
      mime === "application/javascript" ||
      mime === "text/javascript" ||
      mime === "application/json" ||
      hasOneOfExtensions(file, [".js", ".ts", ".lua", ".py", ".cs", ".json"])
   );
}

function isScene(file) {
   return hasOneOfExtensions(file, [".xsc", ".zip", ".rar", ".7z"]);
}

function validateAssetFileByType(assetType, file) {
   const validators = {
      Model: isModel,
      Texture: isTexture,
      Audio: isAudio,
      Script: isScript,
      Scene: isScene,
   };

   const validator = validators[assetType];
   if (!validator) {
      return;
   }

   if (!validator(file)) {
      const error = new Error(`Asset file type is invalid for ${assetType}`);
      error.status = 400;
      throw error;
   }
}

async function requireUser(userId) {
   if (!userId) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
   }

   const user = await userRepository.findById(userId);
   if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
   }

   return user;
}

async function requireConfirmedUser(userId) {
   const user = await requireUser(userId);

   if (!user.confirmed) {
      const error = new Error("Email must be confirmed before uploading assets");
      error.status = 403;
      throw error;
   }

   return user;
}

function mapAsset(asset, favoriteIdsSet, authorName = "") {
   const id = String(asset._id);

   return {
      id,
      ownerId: asset.ownerId,
      assetType: asset.assetType,
      description: asset.description,
      tags: asset.tags,
      fileName: asset.fileName,
      fileUrl: asset.fileUrl,
      thumbnailUrl: asset.thumbnailUrl,
      authorName,
      favoriteCount: asset.favoriteCount || 0,
      downloadCount: asset.downloadCount || 0,
      isFavorite: favoriteIdsSet ? favoriteIdsSet.has(id) : false,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt,
   };
}

async function getAssetOrThrow(assetId) {
   const asset = await assetRepository.findById(assetId);

   if (!asset) {
      const error = new Error("Asset not found");
      error.status = 404;
      throw error;
   }

   return asset;
}

function assertCanManageAsset(user, asset) {
   const isOwner = String(asset.ownerId) === String(user._id);
   const isAdmin = user.role === "admin";

   if (!isOwner && !isAdmin) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
   }
}

async function uploadAsset(req) {
   const { body, files, user } = req;
   const assetFile = files?.assetFile?.[0];
   const thumbnailFile = files?.thumbnailFile?.[0];

   const currentUser = await requireConfirmedUser(user?.id);

   if (!assetFile) {
      const error = new Error("Asset file is required");
      error.status = 400;
      throw error;
   }

    if (assetFile.size <= 0) {
      const error = new Error("Asset file is empty");
      error.status = 400;
      throw error;
   }

   const safeAssetType = normalizeAssetType(body.assetType);
   const safeDescription = normalizeDescription(body.description);

   if (!safeDescription) {
      const error = new Error("Description is required");
      error.status = 400;
      throw error;
   }

   validateAssetFileByType(safeAssetType, assetFile);

   if (thumbnailFile) {
      if (thumbnailFile.size <= 0) {
         const error = new Error("Thumbnail file is empty");
         error.status = 400;
         throw error;
      }

      if (!isImage(thumbnailFile)) {
         const error = new Error("Thumbnail must be an image");
         error.status = 400;
         throw error;
      }
   }

   const uploadedAsset = await storage.upload(assetFile, user.id);
   const uploadedThumbnail =
      thumbnailFile
         ? await storage.upload(thumbnailFile, user.id)
         : null;

   const savedAsset = await assetRepository.createAsset({
      ownerId: currentUser._id,
      assetType: safeAssetType,
      description: safeDescription,
      tags: parseTags(body.tags),
      fileName: assetFile.originalname,
      fileKey: uploadedAsset.id,
      fileUrl: uploadedAsset.url,
      fileType: uploadedAsset.type,
      fileSize: uploadedAsset.size,
      thumbnailName: thumbnailFile ? thumbnailFile.originalname : null,
      thumbnailKey: uploadedThumbnail ? uploadedThumbnail.id : null,
      thumbnailUrl: uploadedThumbnail ? uploadedThumbnail.url : null,
      thumbnailType: uploadedThumbnail ? uploadedThumbnail.type : null,
      thumbnailSize: uploadedThumbnail ? uploadedThumbnail.size : null,
      favoriteCount: 0,
      downloadCount: 0,
   });

   return {
      message: "Asset uploaded successfully",
      asset: mapAsset(savedAsset),
   };
}

async function listAssets(req) {
   const { mine, favorites, name, type, tag, author, q, limit, page } = req.query;
   const mineOnly = mine === "true";
   const onlyFavorites = favorites === "true";
   const safeLimit = Math.max(1, Math.min(Number(limit) || 60, 100));
   const safePage = Math.max(1, Number(page) || 1);
   const safeSkip = (safePage - 1) * safeLimit;

   let currentUser = null;

   if (req.user?.id) {
      currentUser = await userRepository.findById(req.user.id);
   }

   if ((mineOnly || onlyFavorites) && !currentUser) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
   }

   const nameRegex = toContainsRegex(name);
   const typeRegex = toContainsRegex(type);
   const tagRegex = toContainsRegex(tag);
   const textRegex = toContainsRegex(q);
   const authorRegex = toContainsRegex(author);

   let ownerIds = null;
   if (authorRegex) {
      const matchedUsers = await userRepository.findByUsernameLike(authorRegex);
      ownerIds = matchedUsers.map((user) => user._id);

      if (ownerIds.length === 0) {
         return { assets: [] };
      }
   }

   const assets = await assetRepository.listAssets({
      ownerId: mineOnly && currentUser ? currentUser._id : null,
      ownerIds,
      favoriteIds: onlyFavorites && currentUser ? currentUser.favorites : null,
      name: nameRegex,
      type: typeRegex,
      tag: tagRegex,
      text: textRegex,
      limit: safeLimit,
      skip: safeSkip,
   });

   const ownerIdList =
      assets
         .map((asset) => String(asset.ownerId))
         .filter((id, index, arr) => arr.indexOf(id) === index);

   const owners = ownerIdList.length > 0
      ? await userRepository.findByIds(ownerIdList)
      : [];

   const ownerNameById = new Map(
      owners.map((owner) => [String(owner._id), owner.username || ""]) 
   );

   const favoriteIdsSet = currentUser
      ? new Set((currentUser.favorites || []).map((assetId) => String(assetId)))
      : null;

   return {
      assets: assets.map((asset) =>
         mapAsset(asset, favoriteIdsSet, ownerNameById.get(String(asset.ownerId)) || "")
      )
   };
}

async function getAssetById(assetId, userId) {
   const [asset, currentUser] = await Promise.all([
      getAssetOrThrow(assetId),
      userId ? userRepository.findById(userId) : Promise.resolve(null),
   ]);

   const owner = await userRepository.findById(asset.ownerId);

   const favoriteIdsSet = currentUser
      ? new Set((currentUser.favorites || []).map((id) => String(id)))
      : null;

   return { asset: mapAsset(asset, favoriteIdsSet, owner ? owner.username : "") };
}

async function updateAsset(req) {
   const currentUser = await requireUser(req.user?.id);
   const asset = await getAssetOrThrow(req.params.id);
   assertCanManageAsset(currentUser, asset);

   const patch = {};

   if (typeof req.body.assetType === "string") {
      patch.assetType = normalizeAssetType(req.body.assetType);
   }

   if (typeof req.body.description === "string") {
      patch.description = normalizeDescription(req.body.description);
      if (!patch.description) {
         const error = new Error("Description is required");
         error.status = 400;
         throw error;
      }
   }

   if (req.body.tags !== undefined) {
      patch.tags = parseTags(req.body.tags);
   }

   const updated = await assetRepository.updateAsset(asset._id, patch);

   return {
      message: "Asset updated successfully",
      asset: mapAsset(updated),
   };
}

async function deleteAsset(req) {
   const currentUser = await requireUser(req.user?.id);
   const asset = await getAssetOrThrow(req.params.id);
   assertCanManageAsset(currentUser, asset);

   await Promise.all([
      storage.delete(asset.fileKey),
      asset.thumbnailKey ? storage.delete(asset.thumbnailKey) : Promise.resolve(),
   ]);

   await assetRepository.deleteAsset(asset._id);

   return { message: "Asset deleted successfully" };
}

async function favoriteAsset(req) {
   const currentUser = await requireUser(req.user?.id);
   const asset = await getAssetOrThrow(req.params.id);
   const favoriteIdsSet = new Set((currentUser.favorites || []).map((id) => String(id)));
   const assetId = String(asset._id);

   if (!favoriteIdsSet.has(assetId)) {
      await Promise.all([
         userRepository.addFavorite(currentUser._id, asset._id),
         assetRepository.incrementFavoriteCount(asset._id, 1),
      ]);
   }

   return { message: "Asset added to favorites" };
}

async function unfavoriteAsset(req) {
   const currentUser = await requireUser(req.user?.id);
   const asset = await getAssetOrThrow(req.params.id);
   const favoriteIdsSet = new Set((currentUser.favorites || []).map((id) => String(id)));
   const assetId = String(asset._id);

   if (favoriteIdsSet.has(assetId)) {
      await Promise.all([
         userRepository.removeFavorite(currentUser._id, asset._id),
         assetRepository.incrementFavoriteCount(asset._id, -1),
      ]);
   }

   return { message: "Asset removed from favorites" };
}

async function reportAsset(req) {
   const currentUser = await requireUser(req.user?.id);
   const asset = await getAssetOrThrow(req.params.id);
   const reason = (req.body.reason || "Inappropriate content").trim();
   const message = (req.body.message || "").trim();

   await assetReportRepository.createReport({
      assetId: asset._id,
      reporterId: currentUser._id,
      reason,
      message,
   });

   try {
      const mailResult = await emailService.sendAssetReportEmail({
         asset,
         reporter: currentUser,
         reason,
         message,
      });

      if (mailResult.sent) {
         console.log(`[asset-report] mail sent for asset=${asset._id}`);
      } else {
         console.log(`[asset-report] mail skipped (${mailResult.reason}) for asset=${asset._id}`);
      }
   } catch (err) {
      console.error("[asset-report] mail send failed", err);
   }

   console.log(`[asset-report] asset=${asset._id} by user=${currentUser._id} reason=${reason}`);

   return { message: "Report submitted and sent to admin" };
}

async function downloadAsset(assetId) {
   const asset = await getAssetOrThrow(assetId);
   await assetRepository.incrementDownloadCount(asset._id);

   return { url: asset.fileUrl };
}

async function getDownloadAnalytics(userId) {
   const currentUser = await requireUser(userId);

   const rows = await assetRepository.getDownloadAnalyticsByType(currentUser._id);

   return {
      analytics: rows.map((row) => ({
         assetType: row._id,
         totalDownloads: row.totalDownloads,
         assetsCount: row.assetsCount,
      })),
   };
}

module.exports = {
   uploadAsset,
   listAssets,
   getAssetById,
   updateAsset,
   deleteAsset,
   favoriteAsset,
   unfavoriteAsset,
   reportAsset,
   downloadAsset,
   getDownloadAnalytics,
};