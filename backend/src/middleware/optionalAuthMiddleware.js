const jwt = require("jsonwebtoken");

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
      const payload = jwt.verify(token, "SECRET");
      req.user = payload;
   } catch (_err) {
   }

   next();
}

module.exports = optionalAuth;
