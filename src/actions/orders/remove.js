const {Order} = require('../../models/order');
const { OrderItem } = require('../../models/order-item');
const errorHandler = require('../../../middlewares/error-handler');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid Order ID. ID is not a Mongoose ID'
        });
    }

    Order.findByIdAndRemove(req.params.id)
    .then(async order => {
        if(order){
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndDelete(orderItem);
            });

            return res.status(200).json({success: true, message: 'Order deleted'});
        }else{
            return res.status(404).send({sucess: false, message: 'Order not found'});
        }
    }).catch(err =>{
        errorHandler(err, req, res);
    })
}