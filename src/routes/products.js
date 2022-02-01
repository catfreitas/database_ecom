const express = require('express');
const router = express.Router();
const { all, one, create, edit, remove, featured, count, search } = require('../actions/products');
const {uploadMultiple, uploadSingle} = require('../../middlewares/multer');

router.use(express.static('public/*'));

router.get('/', all);
router.get('/:id', one);
router.post(`/`, uploadMultiple, create);
router.put('/:id', uploadMultiple, edit);
router.delete(`/:id`, remove);
router.get('/get/count', count);
router.get('/get/featured/:count', featured);
router.get('/search/:name', search);

module.exports = router;

