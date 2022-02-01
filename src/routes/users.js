const router = require('express').Router();
const {one, all, create, edit, login, remove, count} = require('../actions/users');

router.get(`/`, all);
router.get('/:id', one);
router.post(`/`, create);
router.post('/login', login);
router.put('/:id' , edit);
router.delete(`/:id`, remove);
router.get('/get/count', count);

module.exports = router;