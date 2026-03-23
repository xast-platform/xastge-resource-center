const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   username: String,
   email: String,
   password: String, // Hashed
   role: { type: String, default: "user" },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;