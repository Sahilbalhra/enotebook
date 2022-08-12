const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "sahilisgoodboy";
const fetchUser = require("../middleware/fetchuser");

//Route :1 create a user using :POST "/api/auth/createuser". doesn't require login-->(Signup)
authRouter.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check whether the user with this email exists already
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          errors: "user with this email is already exists",
        });
      }
      //getting salt
      const salt = await bcrypt.genSalt(10);
      //getting hash password
      const secPass = await bcrypt.hash(req.body.password, salt);
      //creating the document in MongoDb
      user = await userModel.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //user id obj
      const data = {
        user: {
          id: user.id,
        },
      };
      //jwt token
      var jwtAuthToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtToken);

      res.json({ jwtAuthToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 2: Authenticate a user using :POST "/api/auth/login". doesn't require login-->(login)
authRouter.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be black").exists(),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await userModel.findOne({ email });
      //if user not found
      if (!user) {
        return res.status(400).json({
          error: "Please try to login with correct credentials",
        });
      }
      //comparing password with the store hashed password
      const passwordCompare = await bcrypt.compare(password, user.password);
      //if password not match
      if (!passwordCompare) {
        return res.status(400).json({
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      //jwt token
      var jwtAuthToken = jwt.sign(data, JWT_SECRET);
      res.json({
        jwtAuthToken,
      });
    } catch (error) {
      // console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: get logged in user details using: POST "/api/auth/getuser" login required
authRouter.post("/getuser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await userModel.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
module.exports = authRouter;
