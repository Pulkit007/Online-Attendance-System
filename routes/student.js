const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const keys = {
  secretOrKey: "secret",
};

const Student = require("../models/Student");
const auth = require("../middleware/auth");

// @route    POST api/student/register
// @desc     Register a student
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password").isLength({
      min: 1,
    }),
    check("roll", "Please enter roll").isLength({
      min: 1,
    }),
    check("dept", "Please enter department").isLength({
      min: 1,
    }),
    check("year", "Please enter year").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    const { email, password, name, roll, dept, year } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //check if email already exists. if it does, do not register
    try {
      let student = await Student.findOne({ email });

      if (student) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      student = new Student({
        email,
        password,
        name,
        roll,
        dept,
        year,
      });

      const salt = await bcrypt.genSalt(10);

      student.password = await bcrypt.hash(password, salt);

      await student.save();

      const payload = {
        email: email,
        name: name,
        roll: roll,
        dept: dept,
        year: year,
      };

      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;

          res.json({ success: true, token: "Bearer" + token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/student/login
// @desc     Login a student
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let student = await Student.findOne({ email });

      if (!student) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User does not exist" }] });
      }

      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid login" }] });
      }

      const payload = {
        email: email,
        name: student.name,
        roll: student.roll,
      };

      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/student/current
// @desc    Return current user
// @access  Private
router.get("/current", auth, async (req, res) => {
  try {
    const profile = await Student.findOne({ email: req.user.email });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;