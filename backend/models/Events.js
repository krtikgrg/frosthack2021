const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Events = new Schema({
    
    email: {
        type:String,
        required: true
    },
    name: {
        type: String,
        required: true

    },
    ongoing: {
        type: Number,
        default: 1,
        required: true 
    },
    vid: {
        type:String,
        required: false
    },
    vname: {
        type:String,
        required: false
    },
    vphone: {
        type:String,
        required: false
    },
    vprice: {
        type:String,
        required: false
    },
    cid: {
        type:String,
        required: false
    },
    cname: {
        type:String,
        required: false
    },
    cphone: {
        type:String,
        required: false
    },
    cprice: {
        type:String,
        required: false
    },
    tid: {
        type:String,
        required: false
    },
    tname: {
        type:String,
        required: false
    },
    tphone: {
        type:String,
        required: false
    },
    tprice: {
        type:String,
        required: false
    },
    pid: {
        type:String,
        required: false
    },
    pname: {
        type:String,
        required: false
    },
    pphone: {
        type:String,
        required: false
    },
    pprice: {
        type:String,
        required: false
    },
    did: {
        type:String,
        required: false
    },
    dname: {
        type:String,
        required: false
    },
    dphone: {
        type:String,
        required: false
    },
    dprice: {
        type:String,
        required: false
    }   
   
});

module.exports = User = mongoose.model("Events",Events);