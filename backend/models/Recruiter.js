const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    cnum: {
        type:String,
    },
    bio: {
        type:String
    },
    rating: {
        type:Number,
        default:0
    }
});

module.exports = Recruiter = mongoose.model("recruiters",RecruiterSchema);