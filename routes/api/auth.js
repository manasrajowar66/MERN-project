const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
// @route  api/auth
// @desc   test routes
//@acess   public
router.get("/", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/auth
// @desc   Authentication
//@acess   public
router.post(
  "/",
  [
    check("email", "please enter a valid email address!").isEmail(),
    check("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const { email, password } = req.body;
      try {
        const user = await Users.findOne({ email });
        if (!user) {
          res.status(400).json({ errors: [{ msg: "Invalid credential." }] });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            res.status(400).json({ errors: [{ msg: "Invalid credential." }] });
          } else {
            const playload = {
              user: {
                id: user.id,
              },
            };
            jwt.sign(
              playload,
              config.get("jwtSecret"),
              { expiresIn: 36000 },
              (err, token) => {
                if (err) throw err;
                res.json({ token });
              }
            );
          }
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  }
);
module.exports = router;
