const { Product } = require('../../models/product');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid Product ID. ID is not a Mongoose ID'
        });
    }

    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(product){
            return res.status(200).json({success: true, message: 'Product deleted'});
        }else{
            return res.status(404).send({sucess: false, message: 'Invalid Product ID'});
        }
    }).catch(err =>{
        errorHandler(err, req, res)
    })
}