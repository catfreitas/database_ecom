const {Order} = require('../../models/order');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    try {
      const orderList = await Order
      .find()
      .populate("user", "name")
      .populate({
          path: "orderItems",
          populate: {
            path: "product"
          },
        })
      .sort({'dateOrdered': -1});
        
      return res.status(200).send(orderList);
      
    } catch (err) {
      errorHandler(err, req, res);
    }
}