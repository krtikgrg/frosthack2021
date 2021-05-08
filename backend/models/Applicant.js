const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    education: [{
        namei : String,
        startd: Number,
        startm: Number,
        starty: Number,
        endd: Number,
        endm: Number,
        endy: Number
    }],
    skills: [
        String
    ],
    rating:{
        type: Number,
        default:0
    },
    status:{
        type: String,
        default: "U"
    }
});

module.exports = Applicant = mongoose.model("applicants",ApplicantSchema);