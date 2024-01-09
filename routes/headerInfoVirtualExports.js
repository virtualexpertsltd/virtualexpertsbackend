const router = require("express").Router();
const HeaderInfoVirtualExports = require("../models/HeaderInfoVirtualExports");
const Cache = require("../Services/Cache.service");

const key = "headerInfoVirtualExports";
Cache.register(key, () => HeaderInfoVirtualExports.find({}));

router.get("/", async (req, res) => {
  try {
    const headerInfoVirtualExports = await Cache.retrieve(key);
    res.status(200).json(headerInfoVirtualExports);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const headerInfoVirtualExports = new HeaderInfoVirtualExports(req.body);
    const data = await headerInfoVirtualExports.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    await HeaderInfoVirtualExports.findByIdAndUpdate(
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
    res.status(200).json("mawmaw");
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
