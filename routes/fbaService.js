const router = require("express").Router();
const FBAService = require("../models/FBAService");
const Cache = require("../Services/Cache.service");

const key = "fbaService";
Cache.register(key, () => FBAService.find({}));

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
    const fba = new FBAService(req.body);
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
    await FBAService.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
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
