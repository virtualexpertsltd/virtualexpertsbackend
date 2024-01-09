const router = require("express").Router();
const HeaderInfoTopServices = require("../models/HeaderInfoTopService");
const Cache = require("../Services/Cache.service");

const key = "headerInfoTopServices";
Cache.register(key, () => HeaderInfoTopServices.find({}));

router.get("/", async (req, res) => {
  try {
    const headerInfoTopServices = await Cache.retrieve(key);
    res.status(200).json(headerInfoTopServices);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const headerInfoTopServices = new HeaderInfoTopServices(req.body);
    const data = await headerInfoTopServices.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    await HeaderInfoTopServices.findByIdAndUpdate(
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
    res.status(200).json("mawmaw");
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
