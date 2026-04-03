const authService = require("../service/authService");

async function register(req, res, next) {
   try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
   } catch (err) {
      next(err);
   }
}

async function login(req, res, next) {
   try {
      const result = await authService.login(req.body);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function verifyEmail(req, res, next) {
   try {
      const result = await authService.verifyEmail(req.query.token);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function me(req, res, next) {
   try {
      const result = await authService.getMe(req.user.id);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function updateUsername(req, res, next) {
   try {
      const result = await authService.updateUsername(req.user.id, req.body);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function updatePassword(req, res, next) {
   try {
      const result = await authService.updatePassword(req.user.id, req.body);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

async function deleteAccount(req, res, next) {
   try {
      const result = await authService.deleteAccount(req.user.id, req.body);
      res.json(result);
   } catch (err) {
      next(err);
   }
}

module.exports = {
   register,
   login,
   verifyEmail,
   me,
   updateUsername,
   updatePassword,
   deleteAccount,
};