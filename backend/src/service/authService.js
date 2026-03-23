const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/userRepository");

async function register({ username, email, password }) {
   const hashed = await bcrypt.hash(password, 10);
   return userRepo.createUser({ username, email, password: hashed });
}

async function login({ email, password }) {
   const user = userRepo.findByEmail(email);
   if (!user) {
      throw new Error("User not found");
   }

   const match = await bcrypt.compare(password, user.password);
   if (!match) {
      throw new Error("Invalid password");
   }

   const token = jwt.sign(
      { id: user._id },
      "SECRET",
      { expiresIn: "1h" },
   );

   return { user, token };
}

module.exports = { register, login }