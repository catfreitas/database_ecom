const {Order} = require('../../models/order');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    try {
        const orderCount =  await Order.countDocuments({});

        if(!orderCount){
            return res.status(400).json({success: false, message: "Cannot count the orders!"});
        }

        return res.status(200).send({orderCount: orderCount});
    } catch (err) {
        errorHandler(err, req ,res);
    }
}