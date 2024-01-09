const router = require('express').Router();
const MetaHome = require('../models/MetaHome');
const Cache = require("../Services/Cache.service");

const key = "metaHome";
Cache.register(key, () => MetaHome.find({}));

router.get('/', async (req, res) => {
  try {
    const metaHome = await Cache.retrieve(key);
    res.status(200).json(metaHome);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/post', async (req, res) => {
  try {
    const metaHome = new MetaHome(req.body);
    const data = await metaHome.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put('/update', async (req, res) => {
  try {
    const id = req.body._id;
    await MetaHome.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          keywords: req.body.keywords,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json('updated');
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
