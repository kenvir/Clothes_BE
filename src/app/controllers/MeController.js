const Blog = require('../models/Blogs');
// const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  // [GET] /me/stored/blogs
  storedBlogs(req, res, next) {
    Blog.find({})
      .lean()
      .then((blogs) => res.render('me/stored-blogs', { blogs }))
      .catch(next);
  }
}

module.exports = new MeController();
