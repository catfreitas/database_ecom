const { Category } = require('../../models/category');
const { Product } = require('../../models/product');
const fs = require('fs');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => { //Refatorizar
    if(!mongoose.isValidObjectId(req.body.category)){
        return res.status(400).json({
            success: false,
            message: 'Invalid category ID. ID is not a Mongoose ID'
        });
    }

    const category = await Category.findById(req.body.category);
    const imageIsUploaded = req.files['image'][0].filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
/*     console.log(req.files['image'][0].filename); */

    if(!category){
        return res.status(400).json({success: false, message: 'Invalid Category ID'})
    }
    if(imageIsUploaded === undefined){
        return res.status(400).json({success: false, message: 'Image Main is Required'})
    }
    
    try{
        const product = new Product({...req.body, image: `${basePath}${req.files['image'][0].filename}`});

        if (!product) return res.status(400).send("the product cannot be created!");

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (err){
        errorHandler(err, req ,res);
    }
}