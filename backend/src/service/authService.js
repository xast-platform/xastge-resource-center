const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userRepo = require("../repository/userRepository");
const assetRepository = require("../repository/assetRepository");
const storage = require("../storage");
const emailService = require("./emailService");

const VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24;

function toPublicUser(user) {
   const userObject = user.toObject ? user.toObject() : user;
   const { password, verificationToken, verificationTokenExpiresAt, ...safeUser } = userObject;
   return safeUser;
}

function createVerificationToken() {
   return crypto.randomBytes(24).toString("hex");
}

function verificationUrl(token) {
   const baseUrl = process.env.PUBLIC_BACKEND_URL || "http://localhost:3000";
   return `${baseUrl}/api/auth/verify-email?token=${token}`;
}

async function notifyVerificationLink(email, token) {
   const url = verificationUrl(token);

   try {
      const result = await emailService.sendVerificationEmail(email, url);

      if (result.sent) {
         console.log(`[verify-email] sent to ${email}`);
         return { sent: true, mode: "smtp" };
      }

      console.log(`[verify-email] fallback for ${email}: ${url}`);
      return { sent: false, mode: "console", reason: result.reason };
   } catch (err) {
      console.error("[verify-email] mail send failed", err);
      console.log(`[verify-email] fallback for ${email}: ${url}`);
      return { sent: false, mode: "console", reason: "mail send failed" };
   }
}

function buildAuthResponse(user, saveSession = false) {
   const token = jwt.sign(
      { id: user._id },
      "SECRET",
      { expiresIn: saveSession ? "30d" : "30m" },
   );

   const safeUser = toPublicUser(user);

   return { user: safeUser, token };
}

async function register({ username, email, password, saveSession = false }) {
   if (!username || username.trim() === "" || username.length < 3) {
      const err = new Error("Username must be at least 3 characters long");
      err.status = 400;
      throw err;
   }

   if (!email || email.trim() === "" || !/^\S+@\S+\.\S+$/.test(email)) {
      const err = new Error("Invalid email format");
      err.status = 400;
      throw err;
   }

   if (!password || password.length < 6) {
      const err = new Error("Password must be at least 6 characters long");
      err.status = 400;
      throw err;
   }

   const normalizedEmail = email.trim().toLowerCase();
   const existingUser = await userRepo.findByUsernameOrEmail(username, normalizedEmail);

   if (existingUser) {
      const conflictField = existingUser.email === normalizedEmail ? "email" : "username";
      const err = new Error(`A user with this ${conflictField} already exists`);
      err.status = 409;
      throw err;
   }

   const hashed = await bcrypt.hash(password, 10);
   const token = createVerificationToken();
   const expiresAt = new Date(Date.now() + VERIFICATION_TTL_MS);

   const user = await userRepo.createUser({
      username, 
      email: normalizedEmail, 
      password: hashed,
      verificationToken: token,
      verificationTokenExpiresAt: expiresAt,
   });

   const verificationDelivery = await notifyVerificationLink(normalizedEmail, token);

   const verificationMessage = verificationDelivery.sent
      ? "Verification email sent"
      : "Verification link generated in server logs (SMTP is disabled or not configured)";

   return {
      ...buildAuthResponse(user, saveSession),
      verificationRequired: !user.confirmed,
      verificationMessage,
   };
}

async function login({ username, password, saveSession = false }) {
   const user = await userRepo.findByUsername(username);
   if (!user) {
      throw new Error("User \""+username+"\" not found");
   }

   const match = await bcrypt.compare(password, user.password);
   if (!match) {
      throw new Error("Invalid password");
   }

   return buildAuthResponse(user, saveSession);
}

async function verifyEmail(token) {
   if (!token || token.trim() === "") {
      const err = new Error("Verification token is required");
      err.status = 400;
      throw err;
   }

   const user = await userRepo.findByVerificationToken(token.trim());

   if (!user) {
      const err = new Error("Verification token is invalid");
      err.status = 400;
      throw err;
   }

   if (user.confirmed) {
      return { message: "Email already confirmed" };
   }

   if (!user.verificationTokenExpiresAt || user.verificationTokenExpiresAt.getTime() < Date.now()) {
      const err = new Error("Verification token has expired");
      err.status = 400;
      throw err;
   }

   await userRepo.markAsConfirmed(user._id);
   return { message: "Email confirmed successfully" };
}

async function getMe(userId) {
   const user = await userRepo.findById(userId);
   if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
   }

   return { user: toPublicUser(user) };
}

async function requireAuthUser(userId) {
   const user = await userRepo.findById(userId);

   if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
   }

   return user;
}

async function updateUsername(userId, { username, password }) {
   const currentUser = await requireAuthUser(userId);

   const safeUsername = (username || "").trim();
   if (safeUsername.length < 3) {
      const err = new Error("Username must be at least 3 characters long");
      err.status = 400;
      throw err;
   }

   if (!password) {
      const err = new Error("Password is required");
      err.status = 400;
      throw err;
   }

   const match = await bcrypt.compare(password, currentUser.password);
   if (!match) {
      const err = new Error("Invalid password");
      err.status = 400;
      throw err;
   }

   const existing = await userRepo.findByUsername(safeUsername);
   if (existing && String(existing._id) !== String(currentUser._id)) {
      const err = new Error("A user with this username already exists");
      err.status = 409;
      throw err;
   }

   const updated = await userRepo.updateUsername(currentUser._id, safeUsername);
   return { message: "Login updated successfully", user: toPublicUser(updated) };
}

async function updatePassword(userId, { currentPassword, newPassword }) {
   const currentUser = await requireAuthUser(userId);

   if (!currentPassword) {
      const err = new Error("Current password is required");
      err.status = 400;
      throw err;
   }

   if (!newPassword || newPassword.length < 6) {
      const err = new Error("New password must be at least 6 characters long");
      err.status = 400;
      throw err;
   }

   const match = await bcrypt.compare(currentPassword, currentUser.password);
   if (!match) {
      const err = new Error("Current password is invalid");
      err.status = 400;
      throw err;
   }

   const hashed = await bcrypt.hash(newPassword, 10);
   await userRepo.updatePassword(currentUser._id, hashed);

   return { message: "Password updated successfully" };
}

async function deleteAccount(userId, { password }) {
   const currentUser = await requireAuthUser(userId);

   if (!password) {
      const err = new Error("Password is required");
      err.status = 400;
      throw err;
   }

   const match = await bcrypt.compare(password, currentUser.password);
   if (!match) {
      const err = new Error("Invalid password");
      err.status = 400;
      throw err;
   }

   const ownedAssets = await assetRepository.findByOwnerId(currentUser._id);

   await Promise.all(
      ownedAssets.flatMap((asset) =>
         [
            asset.fileKey ? storage.delete(asset.fileKey) : Promise.resolve(),
            asset.thumbnailKey ? storage.delete(asset.thumbnailKey) : Promise.resolve(),
         ]
      )
   );

   await Promise.all([
      assetRepository.deleteByOwnerId(currentUser._id),
      userRepo.deleteById(currentUser._id),
   ]);

   return { message: "Account deleted successfully" };
}

module.exports = {
   register,
   login,
   verifyEmail,
   getMe,
   updateUsername,
   updatePassword,
   deleteAccount,
};