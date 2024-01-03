const router = require("express").Router();
const Contact = require("../models/ContactForm");

router.get("/", async (req, res) => {
  try {
    const contact = await Contact.find({});
    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const data = await contact.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

// delete data from service card collection
router.delete("/delete/:id", async (req, res) => {
    try {
      const contactCard = await Contact.findByIdAndDelete({
        _id: req.params.id,
      });
      res.status(200).json(contactCard);
    } catch (err) {
      res.status(404).json(err);
    }
  });


module.exports = router;
