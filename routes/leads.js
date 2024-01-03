const router = require("express").Router();
const Leads = require("../models/Leads");

router.get("/", async (req, res) => {
  try {
    const lead = await Leads.find({});
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
    } catch (err) {
      res.status(404).json(err);
    }
  });


module.exports = router;
