const router = require("express").Router();
const WhyShouldHire = require("../models/WhyShouldHire");
const Cache = require("../Services/Cache.service");

const key = "whyShouldHire";
Cache.register(key, () => WhyShouldHire.find({}));

router.get("/", async (req, res) => {
  try {
    const whyHire = await Cache.retrieve(key);
    res.status(200).json(whyHire);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const whyHire = new WhyShouldHire(req.body);
    const data = await whyHire.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    await WhyShouldHire.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json("updated");
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
