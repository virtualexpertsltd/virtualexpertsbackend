const router = require("express").Router();
const Leads = require("../models/Leads");
const Cache = require("../Services/Cache.service");

const key = "leads";
Cache.register(key, () => Leads.find({}));

router.get("/", async (req, res) => {
  try {
    const lead = await Cache.retrieve(key);
    res.status(200).json(lead);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const lead = new Leads(req.body);
    const data = await lead.save();
    res.status(200).json(data);
    await Cache.refresh(key);
  } catch (err) {
    res.status(404).json(err);
  }
});

// delete data from service card collection
router.delete("/delete/:id", async (req, res) => {
    try {
      const leadsCard = await Leads.findByIdAndDelete({
        _id: req.params.id,
      });
      res.status(200).json(leadsCard);
      await Cache.refresh(key);
    } catch (err) {
      res.status(404).json(err);
    }
  });


module.exports = router;
