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
            index: true,
        },

        isVegetarian: {
            type: Boolean,
            index: true,
        },
        image: {
            type: String,
            lowercase: true,
            index: true,
        },
        rating: {
            type: Number,
            index: true,
        },
        location: {
            type: String,
            lowercase: true,
            index: true,
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('Restaurant', Restaurant);
