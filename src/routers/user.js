const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const avatar = require('../middleware/avatar');

router.post('/profile/register', async (req, res) => {
  const image = await avatar(req.query.email);
  const reqBodyWithImage = {
    ...req.query,
    avatar: {
      png: image,
    },
  };
  const user = new User(reqBodyWithImage);

  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/profile/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.query.email,
      req.query.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/profile/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/profile/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/profile', auth, async (req, res) => {
  res.send(req.user);
});

router.patch('/profile', auth, async (req, res) => {
  const updates = Object.keys(req.query);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ Error: 'Invalid update' });
  }

  try {
    const user = req.user;

    updates.forEach((update) => (user[update] = req.query[update]));
    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/profile', auth, async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(undefined, true);
  },
});

router.post(
  '/profile/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      // we can find the file as buffer under req.file.buffer
      // and we are saving it as avatar
      const imageWebP = await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .webp()
        .toBuffer();
      const imagePng = await sharp(req.file.buffer)
        .resize({
          width: 400,
          height: 400,
        })
        .png()
        .toBuffer();
      req.user.avatar = {
        png: imagePng,
        webp: imageWebP,
      };
      await req.user.save();
      res.send();
    } catch (error) {
      res.send(error);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ Error: error.message });
  }
);

router.delete('/profile/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/profile/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    // res.set('Content-Type', 'application/json');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
