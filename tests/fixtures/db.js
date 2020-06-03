const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Favorite = require('../../src/models/favorite');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Can',
  email: 'can@test.com',
  password: '123What?',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'John',
  email: 'john@test.com',
  password: 'hello123',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const favOne = {
  _id: new mongoose.Types.ObjectId(),
  id: 'firstUser123',
  owner: userOne._id,
};

const favTwo = {
  _id: new mongoose.Types.ObjectId(),
  id: 'secondUser123',
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Favorite.deleteMany();
  await new User(userOne).save();
  await new Favorite(favOne).save();
  await new Favorite(favTwo).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  favOne,
  favTwo,
  setupDatabase,
};
