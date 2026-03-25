const User = require("../model/user");

function findByEmail(email) {
   return User.findOne({ email });
}

function findByUsernameOrEmail(username, email) {
   return User.findOne({
      $or: [{ username }, { email }],
   });
}

function createUser(data) {
   const user = new User(data);
   return user.save();
}

module.exports = {
   findByEmail,
   findByUsernameOrEmail,
   createUser
};