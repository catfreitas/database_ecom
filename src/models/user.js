const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minLength: [2, "Name can't be shorter than 2 characters"],
            maxLength: [64, "Name can't be longer than 64 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minLength: [6, "Email can't be shorter than 6 characters"],
            maxLength: [64, "Email can't be longer than 64 characters"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        phone: {
            type: Number,
            trim: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        street: {
            type: String,
            default: ''
        },
        apartment: {
            type: String,
            default: '',
            trim: true
        },
        zip: {
            type: String,
            default: '',
            maxLength: [24, "Zip Code can't be longer than 24 characters"],
            trim: true
        },
        city: {
            type: String,
            default: '',
            trim: true
        },
        country: {
            type: String,
            default: ''
        }
    },
    {timestamps: true}
);


userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});


exports.User = mongoose.model('User', userSchema);