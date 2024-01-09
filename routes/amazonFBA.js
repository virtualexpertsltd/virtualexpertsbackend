const router = require("express").Router();
const FBA = require("../models/AmazonFBA");
const Cache = require("../Services/Cache.service");

const key = "amazonFBA";
Cache.register(key, () => FBA.find({}));

router.get("/", async (req, res) => {
  try {
    const fba = await Cache.retrieve(key);
    res.status(200).json(fba);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const fba = new FBA(req.body);
    const data = await fba.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    await FBA.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          description_part_1: req.body.description_part_1,
          description_part_2: req.body.description_part_2,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json("Updated Successfully");
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;