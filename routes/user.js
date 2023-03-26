const router = require("express").Router();
const User = require("../modals/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
// const { sendEmail } = require("../utlis/index.js");

// register

router.post("/", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // validation

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        message: "Please enter a password of at least 6 characters.",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists.",
      });
    }
    const savedUser = await User.create(req.body);

    res.status(200).json({
      data: savedUser,
      message: "Record Saved",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// log in
// /api/user/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ message: "user is not registered." });

    const passwordCorrect = User.checkPassword(password, existingUser.password);

    if (!passwordCorrect)
      return res.status(401).json({ message: "Wrong email or password." });
    else {
      const payload = {
        id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser?.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.status(200).json({
        data: existingUser,
        token: token,
        userRole: existingUser?.role,
        message: "Login SuccessFull",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: error.message,
    });
  }
});


router.get("/", async (req, res) => {
  const query = {};
  if ("_id" in req.query) query._id = { $in: req.query._id.split(",") };
  if ("role" in req.query) query.role = req.query.role;
  let projections = { sort: "-_id" };
  await User.find(query, null, projections)
    .then((doc) => {
      if (doc.length == 0) {
        return res.status(404).json({ message: "No records found" });
      }
      res.status(200).json({ data: doc });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});


module.exports = router;
