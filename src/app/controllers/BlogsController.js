const Blog = require('../models/Blogs');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Blogs = require('../models/Blogs');

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
  }

  // [GET] /blogs/:slug
  show(req, res, next) {
    Blog.findOne({ slug: req.params.slug })
      .lean()
      .then((blog) => {
        res.render('blogs/show', { blog });
      })
      .catch(next);
  }

  // [GET] /blogs/create
  create(req, res, next) {
    res.render('blogs/create');
  }

  // [POST] /blogs/store
  store(req, res, next) {
    // res.json(req.body);
    // req.body.image = `https://i.ytimg.com/vi/${req.body.image}/maxresdefault.jpg`;

    const blog = new Blog(req.body);
    blog
      .save()
      .then(() => res.redirect('/blogs'))
      .catch(next);

    // res.send('NEW BLOG!');
  }

  // [GET] /blogs/:id/edit
  edit(req, res, next) {
    Blog.findById(req.params.id)
      .lean()
      .then((blog) =>
        res.render('blogs/edit', {
          blog,
        }),
      )
      .catch(next);
  }

  // [PUT] /blogs/:id
  update(req, res, next) {
    Blog.updateOne({ _id: req.params.id }, req.body)
      .lean()
      .then(() => res.redirect('/me/stored/blogs'))
      .catch(next);
  }
}

module.exports = new BlogsController();
