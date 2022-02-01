const router = require('express').Router();
const { all, one, create, edit, remove } = require('../actions/categories');

router.get(`/`, all);
router.get('/:id', one);
router.post(`/`, create);
router.put('/:id' , edit);
router.delete(`/:id`, remove);

module.exports = router;