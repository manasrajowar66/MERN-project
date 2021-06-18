const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/Users");
const Post = require("../../models/Posts");

// @route  Post api/posts
// @desc   Create post
//@acess   Private

router.post(
  "/",
  [auth, [check("text", "Text is require.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    } else {
      try {
        let user = await User.findById(req.user.id).select("-password");
        const newPost = new Post({
          user: req.user.id,
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
        });
        const post = await newPost.save();
        res.send(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.");
      }
    }
  }
);

// @route  Get api/posts
// @desc   Get all the posts
//@acess   Private

router.get("/", auth, async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 });
    res.send(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route  Get api/posts/:id
// @desc   Get post by user_id
//@acess   Private

router.get("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    } else {
      res.send(post);
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error.");
  }
});

// @route  Delete api/posts/:id
// @desc   Delete post by user_id
//@acess   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    } else {
      if (post.user.toString() !== req.user.id)
        res.status(401).json({ msg: "User not autherized." });
      else {
        await post.remove();
        res.send("Post Removed.");
      }
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error.");
  }
});

// @route  Put api/posts/like/:id
// @desc   Like a post
//@acess   Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    //Check user already liked or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      res.status(400).json({ msg: "Already Liked." });
    } else {
      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.send(post.likes);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route  Put api/posts/unlike/:id
// @desc   Unlike a post
//@acess   Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    //Check user already liked or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      res.status(400).json({ msg: "Post has not yet been liked." });
    } else {
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
      await post.save();
      res.send(post.likes);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route  Post api/posts/comment/:id
// @desc   Add comment
//@acess   Private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is require.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    } else {
      try {
        let user = await User.findById(req.user.id).select("-password");
        let post = await Post.findById(req.params.id);
        const newCom = {
          user: req.user.id,
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
        };
        post.comments.unshift(newCom);
        await post.save();
        res.send(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.");
      }
    }
  }
);

// @route  Post api/posts/comment/:id/:comment_id
// @desc   Delete comment
//@acess   Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // let user = await User.findById(req.user.id).select("-password");
    let post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: "Post not fount." });
    } else {
      //pull out the comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      if (!comment) {
        res.status(404).json({ msg: "Comment not fount." });
      } else {
        if (comment.user.toString() !== req.user.id) {
          res.status(401).json({ msg: "User not authorized" });
        } else {
          post.comments = post.comments.filter(
            (comment) => comment.id !== req.params.comment_id
          );
          await post.save();
          res.send(post.comments);
        }
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
