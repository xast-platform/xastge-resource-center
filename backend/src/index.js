const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envCandidates = [
   path.resolve(__dirname, "../.env"),
   path.resolve(__dirname, "../../.env"),
];

for (const envPath of envCandidates) {
   if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
      break;
   }
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { graphqlUploadExpress } = require("graphql-upload");

const authRoutes = require("./route/authRoutes");
const assetRoutes = require("./route/assetRoutes");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

// Configuration from environment
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/resource-center";
const JWT_SECRET = process.env.JWT_SECRET || "SECRET";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "cookieSecret";
const NODE_ENV = process.env.NODE_ENV || "development";

// CORS configuration - restrictive in production
const corsOptions = NODE_ENV === "production"
   ? {
      origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["http://localhost"],
      credentials: true,
   }
   : { origin: "*" }; // Allow all in development

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(MONGO_URL)
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.error("MongoDB connection error:", err));

// ------- REST API -------
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);

// ------- GraphQL -------
app.use(graphqlUploadExpress({ maxFileSize: 25 * 1024 * 1024, maxFiles: 2 }));

function readGraphqlUser(req) {
   const authorization = req.headers.authorization || "";
   const [scheme, rawToken] = authorization.split(" ");
   const token = (rawToken || "").trim();

   if (scheme !== "Bearer" || !token) {
      return null;
   }

   try {
      return jwt.verify(token, JWT_SECRET);
   } catch (_err) {
      return null;
   }
}

app.use("/graphql", graphqlHTTP((req) => ({
   schema,
   rootValue: resolvers,
   graphiql: NODE_ENV === "development",
   context: {
      user: readGraphqlUser(req),
   },
})));

// ------- Middleware -------
app.use((err, _req, res, _next) => {
   console.error(err);

   if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "Uploaded file exceeds the 25MB size limit" });
   }

   if (err.status) {
      return res.status(err.status).json({ message: err.message });
   }

   res.status(500).json({ message: err.message });
});

// ------- Cookies --------
app.use(session({
   secret: COOKIE_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: { secure: NODE_ENV === "production" },
}));

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
   console.log(`Environment: ${NODE_ENV}`);
});