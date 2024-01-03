const router = require("express").Router();
const WhyShouldHire = require("../models/WhyShouldHire");

router.get("/", async (req, res) => {
  try {
    const whyHire = await WhyShouldHire.find({});
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
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
