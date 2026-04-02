const mongoose = require("mongoose");

const AssetReportSchema = new mongoose.Schema(
   {
      assetId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true, index: true },
      reporterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
      reason: { type: String, required: true, trim: true },
      message: { type: String, default: "", trim: true },
   },
   { timestamps: true },
);

module.exports = mongoose.model("AssetReport", AssetReportSchema);
