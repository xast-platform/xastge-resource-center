const AssetReport = require("../model/assetReport");

function createReport(data) {
   const report = new AssetReport(data);
   return report.save();
}

module.exports = {
   createReport,
};
