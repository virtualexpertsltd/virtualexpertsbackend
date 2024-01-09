const router = require('express').Router();
const AboutUnique = require('../models/AboutUnique');
const Cache = require("../Services/Cache.service");

const key = "aboutUnique";
Cache.register(key, () => AboutUnique.find({}));

router.get('/', async (req, res) => {
  try {
    const aboutUnique = await Cache.retrieve(key);
    res.status(200).json(aboutUnique);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/post', async (req, res) => {
  try {
    const aboutUnique = new AboutUnique(req.body);
    const data = await aboutUnique.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put('/update', async (req, res) => {
  try {
    const id = req.body._id;
    await AboutUnique.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json('update');
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
