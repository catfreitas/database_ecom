const { Category } = require('../../models/category');
const { Product } = require('../../models/product');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => { //Refatorizar
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid Product ID. ID is not a Mongoose ID'
        });
    }

    if(!mongoose.isValidObjectId(req.body.category)){
        return res.status(400).json({
            success: false,
            message: 'Invalid Product ID. ID is not a Mongoose ID'
        });
    }

    const category = await Category.findById(req.body.category);
    const product = await Product.findById(req.params.id);
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if(!category){
        return res.status(400).json({success: false, message: 'Invalid Category ID'})
    }
    if(!product){
        return res.status(400).json({success: false, message: 'Invalid Product ID'})
    }

    try {
        req.body.image = `${basePath}${req.files.image[0].filename}`;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {...req.body},
            { runValidators: true, new : true }
        );
    
        if(!updatedProduct){
            return res.status(400).json({success: false, message: 'Invalid Product ID'})
        }
        
        res.status(201).send(updatedProduct);
        
    } catch (err) {
        errorHandler(err, req, res);
    }
}