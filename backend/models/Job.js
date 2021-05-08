const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    maxapplications: {
        type: Number,
        required: true
    },
    maxpositions: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    deadlined: {
        type: Number,
        required: true
    },
    deadlinem: {
        type: Number,
        required: true
    },
    deadliney: {
        type: Number,
        required: true
    },
    skills: [
        String
    ],
    type: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required:true
    },
    rating: {
        type: Number,
        default: 0
    },
    remaining: {
        type: Number
    },
    numofapp:{
        type: Number,
        default: 0
    },
    numofacc:{
        type: Number,
        default: 0
    }
});

module.exports = Job = mongoose.model("jobs", JobSchema);