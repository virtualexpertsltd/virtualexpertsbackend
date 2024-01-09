const router = require("express").Router();
const Contact = require("../models/ContactForm");
const Cache = require("../Services/Cache.service");

const key = "contactForm";
Cache.register(key, () => Contact.find({}));

router.get("/", async (req, res) => {
  try {
    const contact = await Cache.retrieve(key);
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
    await Cache.refresh(key);
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
      await Cache.refresh(key);
    } catch (err) {
      res.status(404).json(err);
    }
  });


module.exports = router;
