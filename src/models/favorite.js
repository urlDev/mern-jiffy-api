const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  gif: {
    type: Array,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// favoriteSchema.methods.toJSON = function () {
//   const favorite = this;
//   const favoriteObject = favorite.toObject();

//   delete favoriteObject.owner;
//   delete favoriteObject._id;
//   delete favoriteObject.__v;

//   return favoriteObject;
// };

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
