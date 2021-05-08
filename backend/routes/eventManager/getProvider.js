const express = require("express");
const router = express.Router();

const User = require("../../models/User");


router.post("/",(req,res)=>{
    // console.log(req.body);
    User.find({type: req.body.type}).then(user => {
        res.json(user);
        // console.log(res);
    });
});

module.exports = router;