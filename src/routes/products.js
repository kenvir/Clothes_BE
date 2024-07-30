var express = require('express');
var router = express.Router();

const productController = require('../app/controllers/ProductsController');

router.get('/create', productController.create);
router.post('/store', productController.store);
router.get('/', productController.index);

module.exports = router;
