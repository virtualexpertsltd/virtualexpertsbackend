const router = require("express").Router();
const Testimonial = require("../models/Testimonial");
const Cache = require("../Services/Cache.service");

const key = "testimonial";
Cache.register(key, () => Testimonial.find({}, { img: 0 }));

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
    const newTestimonial = new Testimonial(req.body);
    await newTestimonial.save();
    res.status(200).json("Testimonial added successful");
    await Cache.refresh(key);
  } catch (err) {
    console.log(err)
    res.status(404).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const testimonials = await Cache.retrieve(key);
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    if (req.body.uploadImage === false) {
      await Testimonial.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            img: req.body.img,
            name: req.body.name,
            jobTitle: req.body.jobTitle,
            review: req.body.review,
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
      await Testimonial.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            img: req.body.img,
            name: req.body.name,
            jobTitle: req.body.jobTitle,
            review: req.body.review,
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
    res.status(404).json(err);
  }
});


// delete data from testimonial card collection
router.delete("/delete/:id", async (req, res) => {
  try {
    const testimonialCard = await Testimonial.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(testimonialCard);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
