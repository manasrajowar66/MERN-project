const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const Profile = require("../../models/Profile");
const User = require("../../models/Users");
const Post = require("../../models/Posts");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route  api/profile/me
// @desc   get current user profile
//@acess   private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res
        .status(400)
        .json({ errors: [{ msg: "There is profile for this user." }] });
    } else {
      res.json(profile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  api/profile/me
// @desc   Create or update profile
//@acess   private

router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required.").not().isEmpty(),
      check("skills", "skills is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    } else {
      const {
        website,
        company,
        location,
        bio,
        status,
        gitHubUsername,
        skills,
        youtube,
        facebook,
        instagram,
        twitter,
        linkedin,
      } = req.body;

      //build profile object

      const profileField = {};

      profileField.user = req.user.id;
      if (website) profileField.website = website;
      if (company) profileField.company = company;
      if (location) profileField.location = location;
      if (bio) profileField.bio = bio;
      if (status) profileField.status = status;
      if (gitHubUsername) profileField.gitHubUsername = gitHubUsername;
      if (skills) {
        profileField.skills = skills.split(",").map((skill) => skill.trim());
      }

      //build social fields
      profileField.social = {};
      if (youtube) profileField.social.youtube = youtube;
      if (facebook) profileField.social.facebook = facebook;
      if (twitter) profileField.social.twitter = twitter;
      if (linkedin) profileField.social.linkedin = linkedin;
      if (instagram) profileField.social.instagram = instagram;

      try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
          //update profile
          profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileField },
            { new: true }
          );
          res.json(profile);
        } else {
          profile = new Profile(profileField);
          await profile.save();
          res.json(profile);
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error.");
      }
    }
  }
);

// @route  api/profile
// @desc   get all profiles
//@acess   public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

// @route  api/profile/user/user_id
// @desc   get profile by id
//@acess   public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ errors: [{ msg: "Profile not found." }] });
    } else {
      res.json(profile);
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      res.status(400).json({ errors: [{ msg: "Profile not found." }] });
    } else {
      res.status(500).send("Server Error.");
    }
  }
});

// @route  api/profile
// @desc   delete profile,user,post
//@acess   private
router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.send("User removed.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

// @route  api/profile/experience
// @desc   add profile experience
//@acess   private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is require.").not().isEmpty(),
      check("company", "Company is require.").not().isEmpty(),
      check("from", "From date is require.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    } else {
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      } = req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };

      try {
        let profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.send(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.");
      }
    }
  }
);

// @route  api/profile/experience/:exp_id
// @desc   Delete profile experience
//@acess   private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  let profile = await Profile.findOne({ user: req.user.id });
  profile.experience = profile.experience.filter(
    (exp) => exp.id !== req.params.exp_id
  );
  await profile.save();
  res.json(profile);
});

// @route  api/profile/education
// @desc   add profile education
//@acess   private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is require.").not().isEmpty(),
      check("degree", "degree is require.").not().isEmpty(),
      check("fieldOfStudy", "Field of study date is require.").not().isEmpty(),
      check("from", "from is require.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    } else {
      const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
      } = req.body;

      const newEdu = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
      };

      try {
        let profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.send(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.");
      }
    }
  }
);

// @route  api/profile/education/:edu_id
// @desc   Delete profile education
//@acess   private

router.delete("/education/:edu_id", auth, async (req, res) => {
  let profile = await Profile.findOne({ user: req.user.id });
  profile.education = profile.education.filter(
    (edu) => edu.id !== req.params.edu_id
  );
  await profile.save();
  res.json(profile);
});

// @route  api/profile/github/:username
// @desc   Get users github repos
//@acess   public

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "Get",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, responce, body) => {
      if (error) console.error(error);
      else {
        if (responce.statusCode !== 200)
          res
            .status(404)
            .json({ errors: [{ msg: "Github profile not found." }] });
        else res.send(JSON.parse(body));
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
