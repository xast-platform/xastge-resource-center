const jwt = require("jsonwebtoken");

function auth(req, res, next) {
   const authorization = req.headers.authorization || "";
   const [scheme, rawToken] = authorization.split(" ");
   const token = (rawToken || "").trim();

   if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "No token" });
   }

   if (!token) {
      return res.status(401).json({ message: "No token" });
   }

   try {
      const payload = jwt.verify(token, "SECRET");
      req.user = payload;
      next();
   } catch (err) {
      if (err.name == "TokenExpiredError") {
         return res.status(401).json({ message: "Token expired" });
      }

      res.status(401).json({ message: "Invalid token" });
   }
}

module.exports = auth;