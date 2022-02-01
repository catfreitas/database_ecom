const {Category} = require('../../models/category');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid Category ID. ID is not a Mongoose ID'
        });
    }

    Category.findByIdAndRemove(req.params.id)
    .then(category => {
        if(category){
            return res.status(200).json({
                success: true, 
                message: 'Category deleted'
            });
        }else{
            return res.status(400).json({
                success: false,
                message: 'Invalid Category ID'
            });
        }
    }).catch(err =>{
        errorHandler(err, req, res);  
    })
}