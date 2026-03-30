const express = require("express");
const multer = require("multer");
const assetController = require("../controller/assetController");
const authMiddleware = require("../middleware/authMiddleware");

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

module.exports = router;
