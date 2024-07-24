const Blog = require('../models/Blogs');
const { multipleMongooseToObject } = require('../../util/mongoose');

class BlogsController {
  // [GET] /blogs
  index(req, res, next) {
    // Blog.find({})
    //   .then((blogs) => {
    //     res.status(200).json({
    //       blogs: multipleMongooseToObject(blogs),
    //     });
    //   })
    //   .catch(next);

    Blog.find({})
      .lean()
      .then((blogs) =>
        res.render('blogs', {
          blogs,
        }),
      )
      .catch((err) => res.status(400).json({ error: 'error' }));

    // res.render('blogs');
  }

  // [GET] /blogs/:slug
  show(req, res) {
    res.send('NEWS BLOG!');
  }
}

module.exports = new BlogsController();
