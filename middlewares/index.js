const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const authJwts = require('./jwt');
const errorHandler = require('./error-handler');
const bodyParser = require('body-parser');
const path = require('path');

router.use(express.json());
router.use(morgan('tiny'));
router.use('/public/uploads/', express.static(path.join(__dirname + '/public/uploads/')));
router.use(authJwts());
router.use(errorHandler);



module.exports = router;