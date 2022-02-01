const {Order} = require('../../models/order');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid Order ID. ID is not a Mongoose ID'
        });
    }

    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { runValidators: true, new : true }
        )    
          
        res.status(201).send(order);
    } catch (err) {
        errorHandler(err, req, res);
    }
}