const router = require("express").Router();
const ServiceCardHeader = require("../models/ServiceCardHeader");
const Cache = require("../Services/Cache.service");

const key = "serviceCardHeader";
Cache.register(key, () => ServiceCardHeader.find({}));

router.get("/", async (req, res) => {
  try {
    const serviceCardHeader = await Cache.retrieve(key);
    res.status(200).json(serviceCardHeader[0]);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const serviceCardHeader = new ServiceCardHeader(req.body);
    const data = await serviceCardHeader.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    await ServiceCardHeader.findByIdAndUpdate(
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
    res.status(200).json("Updated Successfully");
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
