const router = require('express').Router()
const MetaFBA = require('../models/MetaFBA')

router.get('/', async (req, res) => {
  try {
    const metaFBA = await MetaFBA.find({})
    res.status(200).json(metaFBA)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/post', async (req, res) => {
  try {
    const metaFBA = new MetaFBA(req.body)
    const data = await metaFBA.save()
    res.status(200).json(data)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const id = req.body._id
    await MetaFBA.findByIdAndUpdate(
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
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router
