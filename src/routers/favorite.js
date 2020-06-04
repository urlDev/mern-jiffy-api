const express = require('express');
const router = new express.Router();
const Favorite = require('../models/favorite');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const favorite = new Favorite({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await favorite.save();
    res.status(201).send(favorite);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    await req.user.populate('favorites').execPopulate();
    res.send(req.user.favorites);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const favorite = await Favorite.findOne({ _id, owner: req.user._id });

    if (!favorite) {
      return res.status(404).send();
    }
    res.send(favorite);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/, auth, async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!favorite) {
      return res.status(404).send();
    }

    res.send(favorite);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
