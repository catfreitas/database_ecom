const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Name is required."],
        unique: true,
        trim: true,
        minLength: [2, "Name can't be shorter than 2 characters"],
        maxLength: [35, "Name can't be longer than 35 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        minLength: [6, "Description can't be shorter than 6 characters"],
        maxLength: [250, "Email can't be longer than 250 characters"]
    },
    details: {
        type: String,
        default: '',
        maxLength: [1500, "Details can't be longer than 1500 characters"]
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        img: {
            type: String,
            default: ''
        }
    }],
    brand: {
        type: String,
        default: '',
        trim: true,
        maxLength: [25, "Brand name can't be longer than 25 characters"]
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category is required."],
    },
    stock: {
        type: Number,
        required: [true, "Stock is required."],
    },
    rating: {
        type: Number,
        default: 0,
        max: [5, "Rating can't be longer than 5"]
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
    },
    {timestamps: true}
);

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true
});

exports.Product = mongoose.model('Product', productSchema);