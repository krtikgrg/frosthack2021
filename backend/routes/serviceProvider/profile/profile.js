const express =require("express");
const router =express.Router();

// const validateEducationInstanceInput = require("../../../validation/educationinstance");
// const validateEditNameUserInput = require("../../../validation/editname");
const validateEditInput = require("../../../validation/editProfileServiceProvider");

const User = require("../../../models/User");
// const User = require("../../../models/User");
const isEmpty = require("is-empty");



router.post("/get",(req,res)=>{
    // console.log(req.body);
    User.find({_id: req.body.id}).then(user => {
        res.json(user);
        // console.log(res);
    });
});



router.post("/edit",(req,res)=>{
    const {errors,isValid} = validateEditInput(req.body);
    if(!isValid)
        return res.status(400).json(errors);
    User.updateOne({_id:req.body.id},{$set:{name: req.body.name , price: req.body.price , description: req.body.description , phone : req.body.phone}}).then(user =>{        
            if (user){
                res.json("Update Successful");
            }           
    });
});


module.exports = router;