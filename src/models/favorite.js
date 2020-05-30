const mongoose = require('mongoose');

const Favorite = mongoose.model('Favorites', {
  id: {
    type: String,
    trim: true,
  },
});

module.exports = Favorite;
