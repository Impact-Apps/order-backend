const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Restaurant = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a full name'],
            index: true,
        },
        cuisine: {
            type: String,
            lowercase: true,
        },
        isVegetarian: {
            type: Boolean,
        },
        image: {
            type: String,
            lowercase: true,
        },
        rating: {
            type: Number,
        },
        location: {
            type: String,
            lowercase: true,
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('Restaurant', Restaurant);
