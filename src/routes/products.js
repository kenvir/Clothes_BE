var express = require('express');
var router = express.Router();

const productController = require('../app/controllers/ProductsController');

router.get('/create', productController.create);
router.post('/store', productController.store);
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete)
router.patch('/:id/restore', productController.restore)
router.delete('/:id/force', productController.forceDelete)
router.get('/:slug', productController.show);
router.post('/handle-form-actions', productController.handleFormActions)

router.get('/', productController.index);

module.exports = router;
