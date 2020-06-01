const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    // we are storing user object here to be able to access is later with route handlers
    // theres no req.user, we make it. It can be anything like req.me
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ Error: 'Please authenticate' });
  }
};

module.exports = auth;
