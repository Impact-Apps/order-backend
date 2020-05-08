const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: {
            type: String,
        },
        auth0Id: {
            type: String,
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', User);
