const express =require("express");
const router =express.Router();

const validateEducationInstanceInput = require("../../../validation/educationinstance");
const validateEditNameApplicantInput = require("../../../validation/editname");

const User = require("../../../models/User");
const Applicant = require("../../../models/Applicant");
const isEmpty = require("is-empty");

router.post("/",(req,res)=>{
    Applicant.findOne({email: req.body.email}).then(user => {
        res.json(user);
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

router.post("/addInstance",(req,res)=>{
    
    let dat = [];
    Applicant.findOne({email: req.body.email}).then(user => {
        var i;
        for(i=0;i<user.education.length;i++){
            dat.push(user.education[i]);
        }
        for(i=0;i<req.body.data.length;i++){
            const {errors, isValid} = validateEducationInstanceInput(req.body.data[i]);
            if(!isValid)
                return res.status(400).json(errors);
        let data={};
        data.namei = req.body.data[i].namei;
        data.startd = parseInt(req.body.data[i].startd);
        data.startm = parseInt(req.body.data[i].startm);
        data.starty = parseInt(req.body.data[i].starty);
        if(!isEmpty(req.body.data[i].endd))
            data.endd = parseInt(req.body.data[i].endd);
        if(!isEmpty(req.body.data[i].endm))
            data.endm = parseInt(req.body.data[i].endm);
        if(!isEmpty(req.body.data[i].endy))
            data.endy = parseInt(req.body.data[i].endy);
        dat.push(data);
        }
        Applicant.updateOne({email: req.body.email},{$set:{education:dat}}).then(ser=>{
            res.json(ser);
        });
    });
});

router.post("/editName",(req,res)=>{
    const {errors,isValid} = validateEditNameApplicantInput(req.body);
    if(!isValid)
        return res.status(400).json(errors);
    User.updateOne({email:req.body.email},{$set:{name: req.body.name}}).then(user =>{
        Applicant.updateOne({email:req.body.email},{$set:{name: req.body.name}}).then(()=>{
            res.json(user);   
        });
    });
});

router.post("/addSkill",(req,res)=>{
    Applicant.findOne({email:req.body.email}).then(applicant=>{
        let dat = [];
        var i;
        for(i=0;i<applicant.skills.length;i++){
            dat.push(applicant.skills[i]);
        }
        for(i=0;i<req.body.skill.length;i++){
        if(applicant.skills.includes(req.body.skill[i].skill))
            continue;
        dat.push(req.body.skill[i].skill);
        }
        Applicant.updateOne({email:req.body.email},{$set:{skills:dat}}).then(user => {
            res.json(user);
        })
    });
});
module.exports = router;