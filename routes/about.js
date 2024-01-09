const router = require("express").Router();
const About = require("../models/About");
const Cache = require("../Services/Cache.service");

const key = "about";
Cache.register(key, () => About.find({}));

router.get("/", async (req, res) => {
  try {
    const about = await Cache.retrieve(key);
    res.status(200).json(about);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const about = new About(req.body);
    const data = await about.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    await About.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          discription: req.body.discription,
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
