const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";

function optionalAuth(req, _res, next) {
   const authorization = req.headers.authorization || "";

   if (!authorization) {
      next();
      return;
   }

   const [scheme, rawToken] = authorization.split(" ");
   const token = (rawToken || "").trim();

   if (scheme !== "Bearer" || !token) {
      next();
      return;
   }

   try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
   } catch (_err) {
   }

   next();
}

module.exports = optionalAuth;
