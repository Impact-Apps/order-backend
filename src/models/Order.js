const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId, 
            required:true,
        },
        useriId: {
            type: mongoose.Schema.Types.ObjectId, 
            default: null,
        },
        items: [{type: Object}],
        price: {
            type: Number,
        },
        payementId: {
            type: mongoose.Schema.Types.ObjectId, 
            default: null,
        },
        total: {
            type: String,
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', Order);
