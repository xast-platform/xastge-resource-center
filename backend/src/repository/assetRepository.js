const Asset = require("../model/asset");

function createAsset(data) {
   const asset = new Asset(data);
   return asset.save();
}

module.exports = {
   createAsset,
};
