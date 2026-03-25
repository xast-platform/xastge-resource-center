const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const session = require("express-session");

const authRoutes = require("./route/authRoutes");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const mongoUrl = "mongodb://localhost:27017/resource-center";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(mongoUrl)
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.error("MongoDB connection error:", err));

// ------- REST API -------
app.use("/api/auth", authRoutes);

// ------- GraphQL -------
app.use("/graphql", graphqlHTTP({
   schema: schema,
   resolvers, resolvers,
   graphiql: true,
}));

// ------- Middleware -------
app.use((err, _req, res, _next) => {
   console.error(err);

   if (err.status) {
      return res.status(err.status).json({ message: err.message });
   }

   res.status(500).json({ message: err.message });
});

// ------- Cookies --------
app.use(session({
   secret: "cookieSecret",
   resave: false,
   saveUninitialized: false,
   cookie: {},
}));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));