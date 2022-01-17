const express = require("express");
const User = require("../model/User");
const Router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "chalajab$dk";

// route 1 create a user using post "./auth/signup". dosen't require auth

// adding input validation

Router.post(
  "/signup",
  [
    body("email", "Please Enter a valid Email").isEmail(),
    body("name", "Please Enter a valid Name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //   if any error in input validation return error
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check wheter the user with the same email

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            error:
              "Sorry a user with this email already exist . please try with an unique email",
          });
      }

      const salt = bcrypt.genSaltSync(10);
      const secpass = bcrypt.hashSync(req.body.password, salt);

      // create a new user

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // sending response
      success = true
      res.json({ success, authtoken });

      // catching  errors if any unexpacted error occured
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error:");
    }
  }
);

// route 2 authanticate & login a user using post "./auth/login". dosen't require auth

Router.post(
  "/login",
  [
    body("email", "Please Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank ").exists(),
  ],
  async (req, res) => {
    //   if any error in input validation return error
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check wheter the user exist

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ success, error: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({ success, error: "please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // sending response
      success = true
      res.json({ success, authtoken });

      // catching  errors if any unexpacted error occured
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error:");
    }
  }
);

// route 3 get user info using post "/auth/getuser". login required
Router.post(
    "/getuser", fetchuser,  async (req, res) => {
        try {
            userid = req.user.id;
            const user = await User.findById(userid).select('-password')
            res.send(user)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error:");
        }
    });

module.exports = Router;