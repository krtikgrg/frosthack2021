const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobAppliedSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    jid: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Applied"
    },
    dojd: {
        type: Number
    },
    dojm: {
        type: Number
    },
    dojy: {
        type: Number
    },
    sop: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        deafult: 0
    },
    ratingrec: {
        type:Number,
        default: 0
    },
    doad: {
        type: Number
    },
    doam: {
        type: Number
    },
    doay: {
        type: Number
    }
});

module.exports = JobApplied = mongoose.model("jobapplieds",JobAppliedSchema);