const router = require("express").Router();
const FBAD1 = require("../models/FbaDesc1");

router.get("/", async (req, res) => {
  try {
    const fbad1 = await FBAD1.find({});
    res.status(200).json(fbad1);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const fbad1 = new FBAD1(req.body);
    const data = await fbad1.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    await FBAD1.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          discription: req.body.discription,
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
