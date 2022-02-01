const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: [true, "The quantity is required."],
    },
    productId:{
        type: String
    }
});

orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderItemSchema.set('toJSON', {
    virtuals: true
});

exports.OrderItem = mongoose.model('OrderItems', orderItemSchema);