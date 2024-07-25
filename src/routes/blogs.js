var express = require('express');
var router = express.Router();

const blogsController = require('../app/controllers/BlogsController');

router.get('/create', blogsController.create);
router.post('/store', blogsController.store);
router.get('/:id/edit', blogsController.edit);
router.put('/:id', blogsController.update);
router.get('/:slug', blogsController.show);
// router.get('/', blogsController.index);

module.exports = router;
