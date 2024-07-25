var express = require('express');
var router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/blogs', meController.storedBlogs);

module.exports = router;
