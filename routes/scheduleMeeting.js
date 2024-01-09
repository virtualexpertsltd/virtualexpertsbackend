const router = require("express").Router();
const ScheduleMeeting = require("../models/ScheduleMeeting");
const Cache = require("../Services/Cache.service");

const key = "scheduleMeeting";
Cache.register(key, () => ScheduleMeeting.find({}));

router.post("/post", async (req, res) => {
  try {
    const newTitle = new ScheduleMeeting(req.body);
    await newTitle.save();
    res.status(200).json("Added Successfully");
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const scheduleMeeting = await Cache.retrieve(key);
    res.status(200).json(scheduleMeeting[0]);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    await ScheduleMeeting.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          title: req.body.title,
          link: req.body.link,
        },
      },
      { useFindAndModify: false }
    );
    res.status(200).json("Updated Successfully");
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
