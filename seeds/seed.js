// const sequelize = require('../config/connection');
// const { User, Blog, Comment } = require('../models');

// const userData = require('./userData');
// const blogData = require('./blogData');
// const commentData = require('./commentData');

const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
const seedUser = require('./userData');
const seedComment = require('./commentData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedUser();

  console.log('\n-------User Seeded------------\n')

  await seedBlog();

  console.log('\n---------------Blog Seeded-----------------\n')


  await seedComment();

  console.log('\n-------------------Comment Seeded--------------------------\n')

  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // for (const blog of blogData) {
  //   await Blog.create({
  //     ...blog,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
