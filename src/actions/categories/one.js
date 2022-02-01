const {Category} = require('../../models/category');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {  
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid Category ID. ID is not a Mongoose ID'
        });
    }

    try {
        const category = await Category.findById(req.params.id);

        if(!category){
            return res.status(400).json({
                success: false,
                message: 'Invalid Category ID'
            });
        }

        return res.status(200).send(category);
        
    } catch (err) {
        errorHandler(err, req, res);  
    }
}