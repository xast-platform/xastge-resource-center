const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify-email", authController.verifyEmail);
router.get("/me", authMiddleware, authController.me);
router.patch("/username", authMiddleware, authController.updateUsername);
router.patch("/password", authMiddleware, authController.updatePassword);
router.delete("/account", authMiddleware, authController.deleteAccount);

module.exports = router;