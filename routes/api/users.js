const express = require("express");
const { check, validationResult } = require("express-validator");
const Users = require("../../models/Users");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();

// @route  POST api/users
// @desc   test routes
//@acess   public
router.post(
  "/",
  [
    check("name", "name is required!").not().isEmpty(),
    check("email", "please enter a valid email address!").isEmail(),
    check(
      "password",
      "enter a password that containt 6 or more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        const user = await Users.findOne({ email });
        if (user) {
          res
            .status(400)
            .json({ errors: [{ msg: "This email address already exists." }] });
        } else {
          const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
          });
          const user = new Users({
            name,
            email,
            password,
            avatar,
          });
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
          await user.save();
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
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

module.exports = router;
