const router = require('express').Router()
const MetaService = require('../models/MetaService')
const Cache = require("../Services/Cache.service");

const key = "metaService";
Cache.register(key, () => MetaService.find({}));

router.get('/', async (req, res) => {
  try {
    const metaService = await Cache.retrieve(key)
    res.status(200).json(metaService)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/post', async (req, res) => {
  try {
    const metaService = new MetaService(req.body)
    const data = await metaService.save()
    res.status(200).json(data)
    await Cache.refresh(key)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const id = req.body._id
    await MetaService.findByIdAndUpdate(
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
