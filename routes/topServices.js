const router = require("express").Router();
const TopServices = require("../models/TopServices");
const Cache = require("../Services/Cache.service");

const key = "topServices";
Cache.register(key, () => TopServices.find({}, { img: 0 }));

router.get("/", async (req, res) => {
  try {
    const topServices = await Cache.retrieve(key);
    res.status(200).json(topServices);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const file = req.files.file;
    const newImg = file.data;
    const encImg = newImg.toString("base64");
    let coverImage = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, "base64"),
    };
    req.body.img = coverImage;
    const topServices = new TopServices(req.body);
    const data = await topServices.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    if (req.body.uploadImage === false) {
      await TopServices.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            img: req.body.img,
            title: req.body.title,
            description: req.body.description,
          },
        },
        {
          useFindAndModify: false,
        }
      );
    } else {
      const file = req.files.file;
      const newImg = file.data;
      const encImg = newImg.toString("base64");
      let coverImage = {
        contentType: file.mimetype,
        size: file.size,
        img: Buffer.from(encImg, "base64"),
      };
      req.body.img = coverImage;
      await TopServices.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            img: req.body.img,
            title: req.body.title,
            description: req.body.description,
          },
        },
        {
          useFindAndModify: false,
        }
      );
    }
    res.status(200).json("Updated Successful");
    await Cache.refresh(key);
  } catch (err) {
    console.log(err)
    res.status(404).json(err);
  }
});

module.exports = router;
