const User = require("../model/user");

function findByEmail(email) {
   return User.findOne({ email });
}

function createUser(data) {
   const user = new User(data);
   return user.save();
}

module.exports = {
   findByEmail,
   createUser
};