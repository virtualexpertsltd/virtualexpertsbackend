const router = require("express").Router();
const AdminLogin = require("../models/AdminLogin");
const bcrypt = require("bcryptjs");
const { findUserByUsername } = require("../Services/User.service");

// router.post("/login", async (req, res) => {
//   try {
//     const username = req.body.username;
//     const password = req.body.password;
//     const adminLogin = await AdminLogin.find({
//       username: username,
//     });

//     if (!adminLogin) {
//       return res.status(401).json({
//         status: "fail",
//         error: "No user found. Please create an account",
//       });
//     }

//     console.log("admin login info",adminLogin);
//     if(adminLogin){
//       console.log("show data", adminLogin.username);
//     }


//     console.log("ad pass", adminLogin?.verificationCode);
//     console.log("ad pass", password);
//     console.log(adminLogin.password);
//     console.log("cmp pass");
//     const isPasswordValid = AdminLogin.comparePassword(password, adminLogin.password);


//     if (!isPasswordValid) {
//       return res.status(403).json({
//         status: "fail",
//         error: "Password is not correct",
//       });
//     }


//     if (adminLogin.length > 0) {
//       if (adminLogin[0].password === password) {
//         res.status(200).send({ result: adminLogin[0].username });
//       } else {
//         res.status(200).send({
//           error: "Authentication ERROR",
//         });
//       }
//     } else {
//       res.status(200).send({
//         error: "Authentication ERROR",
//       });
//     }
//   } catch (err) {
//     res.status(404).json(err);
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const adminLogin = await findUserByUsername(username);

    if (!adminLogin) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = adminLogin.comparePassword(password, adminLogin.password);

    // console.log("ct pass", isPasswordValid);
    // console.log("old pass", adminLogin.password);
    // console.log("new pass", password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not correct",
      });
    }


    if (isPasswordValid) {
      res.status(200).send({ result: adminLogin.username });
    } else {
      res.status(200).send({
        error: "Authentication ERROR",
      });
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const adminLogin = new AdminLogin(req.body);
    const data = await adminLogin.save();
    await adminLogin.save({ validateBeforeSave: false });
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/verificationCode", async (req, res) => {
  try {
    const admin = await AdminLogin.find({});
    const adminId = admin[0]._id;

    await AdminLogin.findByIdAndUpdate(
      { _id: adminId },
      {
        $set: {
          verificationCode: req.body.verificationCode,
        },
      },
      { useFindAndModify: false }
    );

    res.status(200).json("Verification Code Added");
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/checkVerificationCode", async (req, res) => {
  const admin = await AdminLogin.find({});
  try {
    if (admin[0].verificationCode === req.body.verificationCode) {
      res.status(200).json("True");
    } else {
      res.json("Wrong Verification Code");
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/password", async (req, res) => {
  const admin = await AdminLogin.find({});
  try {
    const _id = admin[0]._id;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password);
    await AdminLogin.findByIdAndUpdate(
      { _id: _id },
      {
        $set: {
          password: hashedPassword,
          verification: "",
        },
      },
      { useFindAndModify: false }
    );
    res.status(200).json("Password changed");
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
