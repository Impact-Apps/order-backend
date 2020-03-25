const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter an item name'],
            index: true,
        },
        isVegetarian: {
            type: Boolean,
            default: false,
        },
        foodType: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: [true, 'Please enter a price for the item'],
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Item', Item);
