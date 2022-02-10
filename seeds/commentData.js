const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "That's nice.",
    user_id: 1,
    blog_id: 1,
  },
  {
    comment_text: "Great idea!",
    user_id: 2,
    blog_id: 2,
  },
  {
    comment_text: "Interesting.",
    user_id: 3,
    blog_id: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
