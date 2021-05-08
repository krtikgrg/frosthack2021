const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,  
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: null,
        required: false
    },
    price: {
        type: String,
        default: null,
        required: false
    }
});

module.exports = User = mongoose.model("users",UserSchema);