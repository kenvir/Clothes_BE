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
    const blog = new Blog(req.body);
    blog
      .save()
      .then(() => res.redirect('/me/stored/blogs'))
      .catch(next);
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

  // [DELETE] /blogs/:id
  delete(req, res, next) {
    Blog.delete({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /blogs/:id/restore
  restore(req, res, next) {
    Blog.restore({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /blogs/:id/force
  forceDelete(req, res, next) {
    Blog.deleteOne({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [POST] /blogs/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Blog.delete({ _id: { $in: req.body.blogIds } })
          .then(() => res.redirect('back'))
          .catch(next);

        break;
      case 'forceDelete':
        Blog.deleteMany({ _id: { $in: req.body.blogIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'restore':
        Blog.restore({ _id: { $in: req.body.blogIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid!!!' });
    }
  }
}

module.exports = new BlogsController();
