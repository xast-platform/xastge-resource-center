const assetService = require("../service/assetService");

async function uploadAsset(req, res, next) {
   try {
      const result = await assetService.uploadAsset(req);

      res.status(201).json(result);
   } catch (err) {
      next(err);
   }
}

module.exports = { uploadAsset };