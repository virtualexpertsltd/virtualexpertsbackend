const router = require("express").Router();
const Banner = require("../models/Banner");
const Cache = require("../Services/Cache.service");

const key = "banner";
Cache.register(key, () => Banner.find({}));

router.get("/", async (req, res) => {
  try {
    const banner = await Cache.retrieve(key);
    res.status(200).json(banner);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const banner = new Banner(req.body);
    const data = await banner.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    await Banner.findByIdAndUpdate(
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
    res.status(200).json("Updated Successfully");
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
