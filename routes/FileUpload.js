// const express = require('express');
// const router = express.Router();
// const uploader = require('../Middlewares/Uploader');


// module.exports = router;


// router.post("/file", uploader.single("image"),  async (req, res) => {
//     try {
//         res.status(200).json({
//             stauts: "success",
//             message: "Successfully Upload a File",
//             data: req.file
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "failed",
//             message: "File isn't Inserted",
//             error: error.message
//         })
//     }
// })

// module.exports = router;