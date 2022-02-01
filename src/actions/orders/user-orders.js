const {Order} = require('../../models/order');
const errorHandler = require('../../../middlewares/error-handler');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    console.log(req.params.id);
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid Order ID. ID is not a Mongoose ID'
        });
    }

    try {
        const userOrderList = await Order.find({ user: req.params.id})
        .populate({
            path: 'orderItems', populate: {
                path: 'product',
                populate: 'category'
            }
        })
        .sort({'dateOrdered': -1});

        if(!userOrderList || userOrderList == ''){
            return res.status(400).json({
                success: false,
                message: 'Invalid Order ID'
            });
        }
          
        res.status(200).send(userOrderList);

    } catch (err) {
        errorHandler(err, req, res);
    }
}