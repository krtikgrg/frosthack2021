const express =require("express");
const router =express.Router();

const validateEducationInstanceInput = require("../../../validation/educationinstance");
const validateEditNameUserInput = require("../../../validation/editname");
const validateEditInput = require("../../../validation/editProfileServiceProvider");

const User = require("../../../models/User");
// const User = require("../../../models/User");
const isEmpty = require("is-empty");

router.post("/",(req,res)=>{
    console.log(req.body);
    User.find({type: req.body.type}).then(user => {
        res.json(user);
        console.log(res);
    });
});

router.post("/get",(req,res)=>{
    console.log(req.body);
    User.find({_id: req.body.id}).then(user => {
        res.json(user);
        console.log(res);
    });
});

/*router.post("/imageUpload/:email",(req,res)=>{
    console.log("in here")
    const eml = req.params.email;
    const img = req.files.img;
    img.mv(`${__dirname}/../../../public/Images/${eml}.jpeg`,function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: img.name, path: `/${img.name}`});
      });
})*/

// router.post("/addInstance",(req,res)=>{
    
//     let dat = [];
//     User.findOne({email: req.body.email}).then(user => {
//         var i;
//         for(i=0;i<user.education.length;i++){
//             dat.push(user.education[i]);
//         }
//         for(i=0;i<req.body.data.length;i++){
//             const {errors, isValid} = validateEducationInstanceInput(req.body.data[i]);
//             if(!isValid)
//                 return res.status(400).json(errors);
//         let data={};
//         data.namei = req.body.data[i].namei;
//         data.startd = parseInt(req.body.data[i].startd);
//         data.startm = parseInt(req.body.data[i].startm);
//         data.starty = parseInt(req.body.data[i].starty);
//         if(!isEmpty(req.body.data[i].endd))
//             data.endd = parseInt(req.body.data[i].endd);
//         if(!isEmpty(req.body.data[i].endm))
//             data.endm = parseInt(req.body.data[i].endm);
//         if(!isEmpty(req.body.data[i].endy))
//             data.endy = parseInt(req.body.data[i].endy);
//         dat.push(data);
//         }
//         User.updateOne({email: req.body.email},{$set:{education:dat}}).then(ser=>{
//             res.json(ser);
//         });
//     });
// });

router.post("/edit",(req,res)=>{
    const {errors,isValid} = validateEditInput(req.body);
    if(!isValid)
        return res.status(400).json(errors);
    User.updateOne({_id:req.body.id},{$set:{name: req.body.name , price: req.body.price , description: req.body.description }}).then(user =>{        
            if (user){
                res.json("Update Successful");
            }           
    });
});

// router.post("/addSkill",(req,res)=>{
//     User.findOne({email:req.body.email}).then(User=>{
//         let dat = [];
//         var i;
//         for(i=0;i<User.skills.length;i++){
//             dat.push(User.skills[i]);
//         }
//         for(i=0;i<req.body.skill.length;i++){
//         if(User.skills.includes(req.body.skill[i].skill))
//             continue;
//         dat.push(req.body.skill[i].skill);
//         }
//         User.updateOne({email:req.body.email},{$set:{skills:dat}}).then(user => {
//             res.json(user);
//         })
//     });
// });
module.exports = router;