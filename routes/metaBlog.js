const router = require('express').Router()
const MetaBlog = require('../models/MetaBlog')
const Cache = require("../Services/Cache.service");

const key = "metaBlog";
Cache.register(key, () => MetaBlog.find({}));

router.get('/', async (req, res) => {
  try {
    const metaBlog = await Cache.retrieve(key)
    res.status(200).json(metaBlog)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/post', async (req, res) => {
  try {
    const metaBlog = new MetaBlog(req.body)
    const data = await metaBlog.save()
    res.status(200).json(data)
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const id = req.body._id
    await MetaBlog.findByIdAndUpdate(
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
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router
