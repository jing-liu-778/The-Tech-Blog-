const router = require("express").Router();
const { Comment, User, Blog } = require("../models");
const withAuth = require("../utils/auth");

// homepage
router.get("/", async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // console.log("blog------>", JSON.stringify(blogs, null, 2));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one blog by id
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["comment_text", "date_created", "user_id", "blog_id"],
          // this way can loop comment also include user table
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log("blog-->: ", JSON.stringify(blog, null, 2));
    // console.log(
    //   "each blog data---------------->",
    //   JSON.stringify(blog, null, 2)
    // );

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit blog route

router.get("/editblog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["comment_text", "date_created", "user_id", "blog_id"],
          // this way can loop comment also include user table
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log("blog-->: ", JSON.stringify(blog, null, 2));
    // console.log(
    //   "each blog data---------------->",
    //   JSON.stringify(blog, null, 2)
    // );

    res.render("editblog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
