var express = require('express');
var router = express.Router();

const blogsController = require('../app/controllers/BlogsController');

router.get('/create', blogsController.create);
router.post('/store', blogsController.store);
router.get('/:id/edit', blogsController.edit);
router.put('/:id', blogsController.update);
router.patch('/:id/restore', blogsController.restore);
router.delete('/:id', blogsController.delete);
router.delete('/:id/force', blogsController.forceDelete);
router.get('/:slug', blogsController.show);
router.post('/handle-form-actions', blogsController.handleFormActions);

router.get('/', blogsController.index);

module.exports = router;
