const assetService = require("../service/assetService");
const { Readable } = require("stream");

async function uploadAsset(req, res, next) {
   try {
      const result = await assetService.uploadAsset(req);

      res.status(201).json(result);
   } catch (err) {
      next(err);
   }
}

async function listAssets(req, res, next) {
   try {
      const result = await assetService.listAssets(req);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function getAssetById(req, res, next) {
   try {
      const result = await assetService.getAssetById(req.params.id, req.user?.id);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function updateAsset(req, res, next) {
   try {
      const result = await assetService.updateAsset(req);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function deleteAsset(req, res, next) {
   try {
      const result = await assetService.deleteAsset(req);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function favoriteAsset(req, res, next) {
   try {
      const result = await assetService.favoriteAsset(req);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function unfavoriteAsset(req, res, next) {
   try {
      const result = await assetService.unfavoriteAsset(req);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function reportAsset(req, res, next) {
   try {
      const result = await assetService.reportAsset(req);
      res.status(201).json(result);
   } catch (err) {
      next(err);
   }
}

async function downloadAsset(req, res, next) {
   try {
      const result = await assetService.downloadAsset(req.params.id);

      const upstream = await fetch(result.url);

      if (!upstream.ok || !upstream.body) {
         const error = new Error("Failed to download file");
         error.status = 502;
         throw error;
      }

      res.setHeader("Content-Type", result.fileType || upstream.headers.get("content-type") || "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename="${result.fileName}"`);

      Readable.fromWeb(upstream.body).pipe(res);
   } catch (err) {
      next(err);
   }
}

async function getDownloadAnalytics(req, res, next) {
   try {
      const result = await assetService.getDownloadAnalytics(req.user.id);
      res.json(result);
   } catch (err) {
      next(err);
   }
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