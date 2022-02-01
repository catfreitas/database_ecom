const { Product } = require('../../models/product');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({sucess: false, message: 'The ID Product is invalid!'});
    }

    try {
        const product = await Product.findById(req.params.id).populate({path: 'category', select:'id'});

        if(!product){
            return res.status(500).json({sucess: false, message: 'The product was not found'});
        }

        return res.status(200).send(product);

    } catch (err) {
        errorHandler(err, req, res)
    }
    
}