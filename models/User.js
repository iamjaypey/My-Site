const mongoose = require('mongoose')
const {Schema} = mongoose;
const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    summary: {
        type: String
    },
    image: {
        type: String
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

// Exporting
module.exports = User;
