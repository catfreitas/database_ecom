
const router = require('express').Router();
const { all, one, create, edit, remove, count, totalSales, userOrders } = require('../actions/orders');

router.get(`/`, all);
router.get(`/:id`, one);
router.get('/get/totalsales', totalSales);
router.get('/get/count', count);
router.get(`/get/userorders/:id`, userOrders);
router.post(`/`, create); //confirmar
router.put('/:id' , edit);
router.delete(`/:id`, remove); //confirmar



module.exports = router;