const router = require('express').Router()
const MetaLetsTalk = require('../models/MetaLetsTalk')
const Cache = require("../Services/Cache.service");

const key = "metaLetsTalk";
Cache.register(key, () => MetaLetsTalk.find({}));

router.get('/', async (req, res) => {
  try {
    const metaLetsTalk = await Cache.retrieve(key)
    res.status(200).json(metaLetsTalk)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/post', async (req, res) => {
  try {
    const metaLetsTalk = new MetaLetsTalk(req.body)
    const data = await metaLetsTalk.save()
    res.status(200).json(data)
    await Cache.refresh(key)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const id = req.body._id
    await MetaLetsTalk.findByIdAndUpdate(
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
