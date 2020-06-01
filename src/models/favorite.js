const mongoose = require('mongoose');

const Favorite = mongoose.model('Favorite', {
  id: {
    type: String,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = Favorite;
