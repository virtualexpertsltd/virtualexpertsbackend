const router = require("express").Router();
const BlogsCard = require("../models/Blog");

// all data get from blog card collection
router.get("/", async (req, res) => {
  try {
    const blogsCard = await BlogsCard.find({});
    res.status(200).json(blogsCard);
  } catch (err) {
    res.status(404).json(err);
  }
});

// add data in blog card collection
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
    const blogsCard = new BlogsCard(req.body);
    const data = await blogsCard.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

// delete data from blog card collection
router.delete("/delete/:id", async (req, res) => {
  try {
    const blogsCard = await BlogsCard.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(blogsCard);
  } catch (err) {
    res.status(404).json(err);
  }
});

// update data from blog card collection
router.put("/update", async (req, res) => {
  try {
    if (req.body.uploadImage === false) {
      const blogsCard = await BlogsCard.findByIdAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            cardDescription: req.body.cardDescription,
            imgAlt: req.body.imgAlt,
            img: req.body.img,
            writerName: req.body.writerName,
          },
        },
        {
          useFindAndModify: false,
        }
      );
      res.status(200).json("Update Successfully Done");
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
      const blogsCard = await BlogsCard.findByIdAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            cardDescription: req.body.cardDescription,
            imgAlt: req.body.imgAlt,
            img: req.body.img,
            writerName: req.body.writerName,
          },
        },
        {
          useFindAndModify: false,
        }
      );
      res.status(200).json("Update Successfully Done");
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
