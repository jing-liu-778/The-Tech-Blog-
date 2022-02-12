const router = require("express").Router();
const { Comment, Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

// get all comment
router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Blog,
        },
      ],
    });

    console.log("commentData", JSON.stringify(commentData, null, 2));
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post comment
router.post("/", withAuth, async (req, res) => {
  console.log("req-body-> ", req.body);
  console.log("req-session->: ", req.session);
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      blog_id: req.body.blog_id,
    });
    console.log(
      "new comment post---------",
      JSON.stringify(newComment, null, 2)
    );
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
