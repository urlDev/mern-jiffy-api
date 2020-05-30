const mongoose = require('mongoose');
const User = require('../models/user');
const Favorite = require('../models/favorite');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
