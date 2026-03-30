const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema(
   {
      ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
      assetType: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      tags: { type: [String], default: [] },
      fileName: { type: String, required: true },
      fileKey: { type: String, required: true, unique: true },
      fileUrl: { type: String, required: true },
      fileType: { type: String, required: true },
      fileSize: { type: Number, required: true },
      thumbnailName: { type: String, default: null },
      thumbnailKey: { type: String, default: null },
      thumbnailUrl: { type: String, default: null },
      thumbnailType: { type: String, default: null },
      thumbnailSize: { type: Number, default: null },
   },
   { timestamps: true },
);

module.exports = mongoose.model("Asset", AssetSchema);
