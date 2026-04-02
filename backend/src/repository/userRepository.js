const User = require("../model/user");

function findByUsername(username) {
   return User.findOne({ username });
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

function findById(id) {
   return User.findById(id);
}

function findByIds(ids) {
   return User.find({ _id: { $in: ids } });
}

function findByUsernameLike(usernameRegex) {
   return User.find({ username: usernameRegex });
}

function findByVerificationToken(token) {
   return User.findOne({ verificationToken: token });
}

function markAsConfirmed(id) {
   return User.findByIdAndUpdate(
      id,
      {
         $set: { confirmed: true },
         $unset: { verificationToken: "", verificationTokenExpiresAt: "" },
      },
      { new: true },
   );
}

function updateVerificationToken(id, verificationToken, verificationTokenExpiresAt) {
   return User.findByIdAndUpdate(
      id,
      {
         $set: {
            verificationToken,
            verificationTokenExpiresAt,
         },
      },
      { new: true },
   );
}

function addFavorite(userId, assetId) {
   return User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: assetId } },
      { new: true },
   );
}

function removeFavorite(userId, assetId) {
   return User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: assetId } },
      { new: true },
   );
}

module.exports = {
   findByUsername,
   findByUsernameOrEmail,
   createUser,
   findById,
   findByIds,
   findByUsernameLike,
   findByVerificationToken,
   markAsConfirmed,
   updateVerificationToken,
   addFavorite,
   removeFavorite,
};