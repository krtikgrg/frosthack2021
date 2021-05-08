const express = require("express");
const router = express.Router();

const validateCreateJobInput = require("../../validation/createjob");
const Job = require("../../models/Job");
const User = require("../../models/User");
const checkvaliddate = require("../../validation/checkvaliddate");
const validateEditJobInput = require("../../validation/editJob");
const JobApplied = require("../../models/JobApplied");
const Applicant = require("../../models/Applicant");
const isEmpty = require("is-empty");
const nodemailer = require("nodemailer");

router.post("/",(req,res)=>{
    const { errors,isValid } = validateCreateJobInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Job.findOne({ email: req.body.email, title: req.body.title, type: req.body.type}).then(job => {
        if(job){
            let dat = {};
            dat.date = job.deadlined;
            dat.month = job.deadlinem;
            dat.year = job.deadliney;
            if(checkvaliddate(dat))
                return res.status(400).json({job: "User already has an active job like this"});
        }else{
            User.findOne({email: req.body.email}).then(user => {
                if(user){
                    const newJob = new Job(req.body);
                    newJob.remaining = newJob.maxpositions;
                    newJob.save().then(job => res.json(user));
                }else{
                    return res.status(400).json({email:"No such user exists"});
                }
            });
        }
    });
});
router.post("/editJob",(req,res)=>{
    const {errors,isValid} = validateEditJobInput(req.body);
    if(!isValid)
        return res.status(400).json(errors);
    Job.findOne({_id:req.body.jid}).then(boj=>{
        var errors={};
        if(boj.numofapp>req.body.maxapplications)
            errors["maxapplications"]="Sorry, but you have already recieved more applications than that";
        if(boj.numofacc>req.body.maxpositions)
            errors["maxpositions"] = "Sorry, but you have already accepted more applicants than that";
        if(!isEmpty(errors))
            return res.status(400).json(errors);
        else{
            Job.updateOne({_id:req.body.jid},{$set:{maxapplications:req.body.maxapplications,maxpositions:req.body.maxpositions,deadlined:req.body.deadlined,deadlinem:req.body.deadlinem,deadliney:req.body.deadliney}}).then(job=>{
                res.json(job);
            })
        }
    })
});
router.post("/shortListStatus",(req,res)=>{
    JobApplied.updateOne({_id:req.body.jaid},{$set:{status:"Shortlisted"}}).then(dat => {
        res.json(dat);
    })
});
router.post("/acceptStatus",(req,res)=>{
    var d =new Date();
    var cdojd = d.getDate();
    var cdojm = d.getMonth()+1;
    var cdojy = d.getFullYear();
    JobApplied.updateOne({_id:req.body.jaid},{$set:{status:"Accepted", dojd:cdojd, dojm:cdojm, dojy:cdojy }}).then(dat => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tempmailxyz681@gmail.com',
              pass: 'dassassign1'
            }
        });
        var mailOptions = {
            from: 'tempmailxyz681@@gmail.com',
            to: req.body.email,
            subject: 'Accepted for a Job',
            text: 'Hello Applicant, This is the   e J 0 |3   team contacting you. We congratulate you and wish you a huge success on getting accepted to the job offer by '+req.body.name+' which was applied by you. In addition it is to inform you that we have rejected all your other applications so as to give other applicants a chance.'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        Job.updateOne({_id:req.body.jid},{$inc :{numofacc:1}}).then(dat => {
            Applicant.updateOne({email:req.body.email},{$set:{status:"E"}}).then(dat=>{
                JobApplied.updateMany({email:req.body.email},{$set:{status:"Rejected"}}).then(dat=>{
                    JobApplied.updateOne({_id:req.body.jaid},{$set:{status:"Accepted"}}).then(dat=>{
                        res.json(dat);
                    })
                })
            })
        })
    })
})
router.post("/rejectStatus",(req,res)=>{
    JobApplied.updateOne({_id:req.body.jaid},{$set : {status:"Rejected"}}).then(dat =>{
        res.json(dat);
    })
})
router.post("/rejectAll",(req,res)=>{
    JobApplied.updateMany({jid:req.body.jid, status: {$ne: "Accepted"}},{$set:{status: "Rejected"}}).then(dat =>{
        res.json(dat);
    })
})
router.post("/rate",(req,res) =>{
    JobApplied.updateOne({_id:req.body.jaid},{$set :{rating:req.body.rating}}).then(dat => {
        JobApplied.find({_id:req.body.jaid}).then(dat=>{
            dat = dat[0];
            JobApplied.find({email: dat.email}).then(allApp => {
                var i,x=0,ctr=0;
                for(i=0;i<allApp.length;i++){
                    if(!(allApp[i].rating===0))
                    {
                        x=x+allApp[i].rating;
                        ctr=ctr+1;
                    }
                }
                x=x/ctr;
                Applicant.updateOne({email:dat.email},{$set:{rating:x}}).then(result =>{
                    res.json(result);
                })
            })
        })
    })
})
module.exports = router;