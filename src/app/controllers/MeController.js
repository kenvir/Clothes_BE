const Blog = require('../models/Blogs');
const Product = require('../models/Products');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  ///////////////// BLOGS //////////////////////
  // [GET] /me/stored/blogs
  storedBlogs(req, res, next) {
    Promise.all([Blog.find({}).lean().sortable(req), Blog.countDocumentsWithDeleted({ deleted: true }).lean()])
      .then(([blogs, deletedCount]) =>
        res.render('me/stored-blogs', {
          deletedCount,
          blogs,
        }),
      )
      .catch(next);

    // Blog.countDocumentsDeleted()
    //   .lean()
    //   .then((deletedCount) => {
    //     console.log(deletedCount);
    //   })
    //   .catch(next);

    // Blog.find({})
    //   .lean()
    //   .then((blogs) => res.render('me/stored-blogs', { blogs }))
    //   .catch(next);
  }

  // [GET] /me/trash/blogs
  trashBlogs(req, res, next) {
    Blog.findWithDeleted({ deleted: true })
      .sortable(req)
      .then((blogs) => {
        res.render('me/trash-blogs', { blogs: multipleMongooseToObject(blogs) });
      })
      .catch(next);
  }

  ///////////////// PRODUCTS //////////////////////

  // [GET] me/stored/products
  storedProducts(req, res, next) {
    // Product.find({})
    //   .lean()
    //   .then((products) => res.render('me/stored-products', { products }))
    //   .catch(next);

    Promise.all([Product.find({}).lean().sortable(req), Product.countDocumentsWithDeleted({ deleted: true }).lean()])
      .then(([products, deletedCount]) =>
        res.render('me/stored-products', {
          deletedCount,
          products,
        }),
      )
      .catch(next);
  }

  // [GET] /me/trash/products
  trashProducts(req, res, next) {
    Product.findWithDeleted({ deleted: true })
      .sortable(req)
      .then((products) => {
        res.render('me/trash-products', { products: multipleMongooseToObject(products) });
      })
      .catch(next);
  }
}

module.exports = new MeController();
