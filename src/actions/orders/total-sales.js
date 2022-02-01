const {Order} = require('../../models/order');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, totalSales: { $sum: '$totalPrice'}}}
        ]);

        if(!totalSales){
            return res.status(400).json({
                success: false,
                message: 'The total sales cannot be calculated'
            });
        }

        return res.status(200).send({totalsales: totalSales.pop().totalSales});

    } catch (err) {
        errorHandler(err, req, res);
    }
}