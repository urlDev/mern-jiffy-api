const express = require('express');
const router = new express.Router();
const Favorite = require('../models/favorite');

router.post('/:slug', async (req, res) => {
  try {
    const favorite = new Favorite(req.body);
    await favorite.save();
    res.status(201).send(favorite);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const favorite = await Favorite.find({});
    res.status(200).send(favorite);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const favorite = await Favorite.findById(_id);
    if (!favorite) {
      return res.status(404).send();
    }
    res.send(favorite);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    if (!favorite) {
      return res.status(404).send();
    }

    res.send(favorite);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
