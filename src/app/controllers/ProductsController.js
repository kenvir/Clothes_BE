const Product = require('../models/Products');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductsController {
  // [GET] /products
  index(req, res, next) {
    Product.find({})
      .lean()
      .then((products) => {
        res.render('products', { products });
      })
      .catch(next);
  }

  // [GET] products/:slug
  show(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .lean()
      .then((product) => {
        res.render('products/show', { product });
      })
      .catch(next);
  }

  // [GET] /products/create
  create(req, res, next) {
    res.render('products/create');
  }

  // [POST] /products/store
  store(req, res, next) {
    const product = new Product(req.body);
    product
      .save()
      .then(() => res.redirect('/me/stored/products'))
      .catch(next);
  }

  // [GET] /products/:id/edit
  edit(req, res, next) {
    Product.findById(req.params.id)
      .lean()
      .then((product) => res.render('products/edit', { product }))
      .catch(next);
  }

  // [PUT] /products/:id
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
      .lean()
      .then(() => res.redirect('/me/stored/products'))
      .catch(next);
  }

  // [DELETE] /products/:id
  delete(req, res, next) {
    Product.delete({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /products/:id/restore
  restore(req, res, next) {
    Product.restore({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /products/:id/force
  forceDelete(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new ProductsController();
