const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/userRepository");

function buildAuthResponse(user, saveSession = false) {
   const token = jwt.sign(
      { id: user._id },
      "SECRET",
      { expiresIn: saveSession ? "30d" : "30m" },
   );

   const userObject = user.toObject ? user.toObject() : user;
   const { password, ...safeUser } = userObject;

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
   const user = await userRepo.createUser({
      username, 
      email: normalizedEmail, 
      password: hashed,
   });

   return buildAuthResponse(user, saveSession);
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

module.exports = { register, login }