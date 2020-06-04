const mongoose = require('mongoose');

const Favorite = mongoose.model('Favorite', {
  gif: {
    type: Array,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = Favorite;
