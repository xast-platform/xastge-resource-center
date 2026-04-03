const Asset = require("../model/asset");

function createAsset(data) {
   const asset = new Asset(data);
   return asset.save();
}

function listAssets({ ownerId, ownerIds, favoriteIds, name, type, tag, text, limit = 60, skip = 0 }) {
   const query = {};

   if (ownerId) {
      query.ownerId = ownerId;
   }

   if (Array.isArray(ownerIds)) {
      query.ownerId = { $in: ownerIds };
   }

   if (Array.isArray(favoriteIds)) {
      query._id = { $in: favoriteIds };
   }

   if (name) {
      query.fileName = name;
   }

   if (type) {
      query.assetType = type;
   }

   if (tag) {
      query.tags = tag;
   }

   if (text) {
      query.$or = [
         { fileName: text },
         { description: text },
         { assetType: text },
         { tags: text },
      ];
   }

   return Asset.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
}

function findById(assetId) {
   return Asset.findById(assetId);
}

function updateAsset(assetId, data) {
   return Asset.findByIdAndUpdate(assetId, { $set: data }, { new: true });
}

function deleteAsset(assetId) {
   return Asset.findByIdAndDelete(assetId);
}

function incrementFavoriteCount(assetId, delta) {
   return Asset.findByIdAndUpdate(
      assetId,
      { $inc: { favoriteCount: delta } },
      { new: true },
   );
}

function incrementDownloadCount(assetId) {
   return Asset.findByIdAndUpdate(
      assetId,
      {
         $inc: { downloadCount: 1 },
         $set: { lastDownloadedAt: new Date() },
      },
      { new: true },
   );
}

function getDownloadAnalyticsByType(ownerId) {
   const pipeline = [];

   if (ownerId) {
      pipeline.push({ $match: { ownerId: ownerId } });
   }

   pipeline.push(
      {
         $group: {
            _id: "$assetType",
            totalDownloads: { $sum: "$downloadCount" },
            assetsCount: { $sum: 1 },
         },
      },
      { $sort: { totalDownloads: -1 } },
   );

   return Asset.aggregate(pipeline);
}

function findByOwnerId(ownerId) {
   return Asset.find({ ownerId });
}

function deleteByOwnerId(ownerId) {
   return Asset.deleteMany({ ownerId });
}

module.exports = {
   createAsset,
   listAssets,
   findById,
   updateAsset,
   deleteAsset,
   incrementFavoriteCount,
   incrementDownloadCount,
   getDownloadAnalyticsByType,
   findByOwnerId,
   deleteByOwnerId,
};
