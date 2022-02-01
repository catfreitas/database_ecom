const router = require('express').Router();
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const ordersRouter = require('./orders');
const usersRouter = require('./users');

const api = process.env.URL;

router.use(`${api}/products`, productsRouter);
router.use(`${api}/categories`, categoriesRouter);
router.use(`${api}/orders`, ordersRouter);
router.use(`${api}/users`, usersRouter);

router.get(`${api}/`, (_, res) => {
    res.send('API WORKS!');
});

router.get(`${api}/favicon.ico`), (_, res) =>{

}

router.get(`${api}/**`, (_, res) =>{
    res.status(404).send('Page Not Found!');
});

router.delete(`${api}/**`, (_, res) =>{
    res.status(404).send('Page Not Found!');
})

router.post(`${api}/**`, (_, res) =>{
    res.status(404).send('Page Not Found!');
})

router.put(`${api}/**`, (_, res) =>{
    res.status(404).send('Page Not Found!');
})

module.exports = router;