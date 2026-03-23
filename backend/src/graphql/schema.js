const fs = require("fs");
const path = require("path");
const { buildSchema } = require("graphql");

const schema = buildSchema(
   fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8")
);

module.exports = schema;

