const router = require("express").Router();
const VirtualService = require("../models/WhyChooseVirtualExports");

router.get("/", async (req, res) => {
  try {
    const virtualService = await VirtualService.find({});
    res.status(200).json(virtualService);
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
    const virtualService = new VirtualService(req.body);
    const data = await virtualService.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  console.log(req.body);
  try {
    const id = req.body._id;
    if (req.body.uploadImage === false) {
      await VirtualService.findByIdAndUpdate(
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
      res.status(200).json("Updated Successful");
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
      await VirtualService.findByIdAndUpdate(
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
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
