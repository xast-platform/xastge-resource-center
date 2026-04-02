const express = require("express");
const multer = require("multer");
const assetController = require("../controller/assetController");
const authMiddleware = require("../middleware/authMiddleware");
const optionalAuthMiddleware = require("../middleware/optionalAuthMiddleware");

const router = express.Router();

const upload = multer({
   storage: multer.memoryStorage(),
   limits: {
      fileSize: 25 * 1024 * 1024,
   },
});

router.post(
   "/upload",
   authMiddleware,
   upload.fields([
      { name: "assetFile", maxCount: 1 },
      { name: "thumbnailFile", maxCount: 1 },
   ]),
   assetController.uploadAsset,
);

router.get("/", optionalAuthMiddleware, assetController.listAssets);
router.get("/analytics/downloads", authMiddleware, assetController.getDownloadAnalytics);
router.get("/:id/download", assetController.downloadAsset);
router.get("/:id", optionalAuthMiddleware, assetController.getAssetById);
router.put("/:id", authMiddleware, assetController.updateAsset);
router.delete("/:id", authMiddleware, assetController.deleteAsset);
router.post("/:id/favorite", authMiddleware, assetController.favoriteAsset);
router.delete("/:id/favorite", authMiddleware, assetController.unfavoriteAsset);
router.post("/:id/report", authMiddleware, assetController.reportAsset);

module.exports = router;
