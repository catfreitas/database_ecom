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
        const order = await Order.findById(req.params.id)
        .populate('user')
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                populate: 'category'
            }
        });

        if(!order){
            return res.status(400).json({
                success: false,
                message: 'Invalid Order ID'
            });
        }
          
        res.status(200).send(order);
    } catch (err) {
        errorHandler(err, req, res);
    }
}