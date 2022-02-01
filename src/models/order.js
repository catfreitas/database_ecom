const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItems',
        required: [true, "At least one item is required on order."]
    }],
    street: {
        type: String,
        required: [true, "Shipping Adress/Street is required."],
        trim: true
    },
    zip: {
        type: String,
        required: [true, "Zip Code is required."],
        trim: true
    },
    apartment:{
        type: String,
        default: '',
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required."],
        trim: true
    },
    country: {
        type: String,
        required: [true, "Country is required."],
    },
    status:{
        type: String,
        default: '0'
    },
    totalPrice: {
        type: Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, "The order must have a user"],
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required."],
        trim: true,
    },
    comment:{
        type: String,
        default: '',
        trim: true,
        maxLength: [300, "The comment can't be longer than 300 characters"]
    }
    },
    {timestamps: true}
);

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true
});

exports.Order = mongoose.model('Order', orderSchema);