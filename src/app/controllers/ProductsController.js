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
}

module.exports = new ProductsController();
