const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "The name is required."],
        unique: true,
        minLength: [1, "Name can't be shorter than 1 character"],
        maxLength: [25, "Name can't be longer than 25 characters"]
    },
    color: {
        type: String,
        unique: true,
        maxLength: [7, "Color can't be longer than 7 characters"]
    },
    icon: {
        type: String,
        unique: true
    }
    },
    {timestamps: true}
);

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true
});

exports.Category = mongoose.model('Category', categorySchema);