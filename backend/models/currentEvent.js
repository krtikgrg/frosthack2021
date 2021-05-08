const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentEvent = new Schema({
    
    email: {
        type:String,
        required: true
    },
    vid: {
        type:String,
        required: false
    },
    vselected: {
        type:Number,
        default: 0,
        required: true
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
    cselected: {
        type:Number,
        default: 0,
        required: true
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
    tselected: {
        type:Number,
        default: 0,
        required: true
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
    pselected: {
        type:Number,
        default: 0,
        required: true
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
    dselected: {
        type:Number,
        default: 0,
        required: true
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

module.exports = User = mongoose.model("currentEvent",currentEvent);