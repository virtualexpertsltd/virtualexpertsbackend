const router = require('express').Router()
const MetaAbout = require('../models/MetaAbout')
const Cache = require("../Services/Cache.service");

const key = "metaAbout";
Cache.register(key, () => MetaAbout.find({}));

router.get('/', async (req, res) => {
  try {
    const metaAbout = await Cache.retrieve(key)
    res.status(200).json(metaAbout)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/post', async (req, res) => {
  try {
    const metaAbout = new MetaAbout(req.body)
    const data = await metaAbout.save()
    res.status(200).json(data)
    await Cache.refresh(key)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const id = req.body._id
    await MetaAbout.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          keywords: req.body.keywords,
        }
      },
      {
        useFindAndModify: false
      }
    )
    res.status(200).json('updated')
    await Cache.refresh(key)
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router
