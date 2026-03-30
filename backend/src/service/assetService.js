const storage = require("../storage");
const assetRepository = require("../repository/assetRepository");

function parseTags(tagsValue) {
   if (!tagsValue || typeof tagsValue !== "string") {
      return [];
   }

   return tagsValue
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
}

function getLowerName(file) {
   return (file?.originalname || "").toLowerCase();
}

function hasOneOfExtensions(file, extensions) {
   const name = getLowerName(file);
   return extensions.some(ext => name.endsWith(ext));
}

function isModel(file) {
   const mime = file.mimetype;
   return (
      mime === "model/gltf+json" ||
      mime === "model/gltf-binary" ||
      hasOneOfExtensions(file, [".gltf", ".glb", ".obj"])
   );
}

function isImage(file) {
   return (file.mimetype || "").startsWith("image/");
}

function isAudio(file) {
   return (file.mimetype || "").startsWith("audio/");
}

function isScript(file) {
   const mime = file.mimetype;
   return (
      mime === "text/plain" ||
      mime === "application/javascript" ||
      mime === "text/javascript" ||
      mime === "application/json" ||
      hasOneOfExtensions(file, [".js", ".ts", ".lua", ".py", ".cs", ".json"])
   );
}

function isScene(file) {
   return hasOneOfExtensions(file, [".ron", ".zip", ".rar", ".7z"]);
}

function validateAssetFileByType(assetType, file) {
   const validators = {
      Model: isModel,
      Texture: isImage,
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

async function uploadAsset(req) {
   const { body, files, user } = req;
   const assetFile = files?.assetFile?.[0];
   const thumbnailFile = files?.thumbnailFile?.[0];

   if (!user?.id) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
   }

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

   const safeAssetType = (body.assetType || "Unknown").trim();
   const safeDescription = (body.description || "").trim();

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
      ownerId: user.id,
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
   });

   return {
      message: "Asset uploaded successfully",
      asset: {
         id: savedAsset._id,
         ownerId: savedAsset.ownerId,
         assetType: savedAsset.assetType,
         description: savedAsset.description,
         tags: savedAsset.tags,
         fileName: savedAsset.fileName,
         fileUrl: savedAsset.fileUrl,
         thumbnailUrl: savedAsset.thumbnailUrl,
         createdAt: savedAsset.createdAt,
      },
   };
}

module.exports = { uploadAsset };