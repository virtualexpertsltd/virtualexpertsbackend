const router = require("express").Router();
const AboutMission = require("../models/AboutMission");
const Cache = require("../Services/Cache.service");

const key = "aboutMission";
Cache.register(key, () => AboutMission.find({}));


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
    const whyHire = new AboutMission(req.body);
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
    await AboutMission.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          mission: req.body.mission,
          vision: req.body.vision,
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
