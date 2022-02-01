const {Order} = require('../../models/order');
const { OrderItem } = require('../../models/order-item');
const {Product} = require('../../models/product');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    //OrderItems
    const orderPromise = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.productId,
        /*     product: orderItem.productId */
        });

        if (!newOrderItem || !orderItem.quantity || !orderItem.quantity){
            return res.status(400).send({success: false, message: "Cannot create a order item!"});
        }

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }));

    const orderItemsId = await orderPromise;

    //Totalprice all ordersItems
    const calcTotalPrice = await Promise.all(orderItemsId.map(async (orderItem) => {
        const item = await OrderItem.findById(orderItem).populate('product', 'price');

        if (!item || !item.product || !item.quantity){
            return res.status(400).send({success: false, message: "Cannot calculate de total price!"});
        }

        const totalPrice = item.product.price * item.quantity;

        return totalPrice;
    }));

    const totalPrice = calcTotalPrice.reduce((a,b) => a+b, 0);
    
    //Create order
    try {
        let order = new Order({
            orderItems: orderItemsId,
            street: req.body.street,
            apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            comment: req.body.comment,
            user: req.body.user,
            totalPrice: totalPrice
        })

        if(!order){
            return res.status(400).json({
                success: false,
                message: 'The order cannot be created!'
            });
        }

        order = await order.save();
        console.log(order);
        
        res.status(201).send(order);

    } catch (err) {
        errorHandler(err, req, res);
    }
}
