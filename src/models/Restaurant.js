const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Restaurant = new Schema(
    {
        name: {
            type: String,
            index: true,
        },
        auth0Id: {
            type: String,
            index: true,
        },
        email: {
            type: String,
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
        },
        stripeAccountId: {
            type: String
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'RestaurantReview'
        }]
    },
    { timestamps: true },
);

module.exports = mongoose.model('Restaurant', Restaurant);
