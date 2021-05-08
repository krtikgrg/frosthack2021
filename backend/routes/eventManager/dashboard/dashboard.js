const express = require("express");
const router = express.Router();

const Job = require("../../../models/Job");
const JobApplied = require("../../../models/JobApplied");
const Applicant = require("../../../models/Applicant");

router.post("/", (req, res) => {
    Job.find({ email: req.body.email }).then(jobs => {
        res.json(jobs);
    });
})
router.post("/applications", (req, res) => {
    Job.aggregate([
        {
            $match: { email: req.body.email }
        },
        {
            $lookup: {
                from: "jobapplieds",
                localField: "_id",
                foreignField: "jid",
                as: "jcrossa"
            }
        },
        {
            $unwind: {
                path: "$jcrossa"
            }
        },
        {
            $lookup: {
                from: 'applicants',
                localField: 'jcrossa.email',
                foreignField: 'email',
                as: 'applicant'
            }
        },
        {
            $unwind: {
                path: "$applicant"
            }
        }
    ],
    function(err,data){
        res.json({ "applications" : JSON.stringify(data)});
    });
})
router.post("/employees",(req,res)=>{
    JobApplied.aggregate([
        {
            $match:{status: "Applied"}
        },
        {
            $lookup:{
                from:"jobs",
                localField:"jid",
                foreignField:"_id",
                as: "provider"
            }
        },
        {
            $unwind: {
                path: "$provider"
            }
        },
        {
            $match: { 'provider.email' : req.body.email }
        },
        {
            $project: { email:1 }
        },
        {
            $lookup:{
                from:"users",
                localField:"email",
                foreignField:"email",
                as:"employee"
            }
        },
        {
            $unwind:{
                path: "$employee"
            }
        },
        {
            $project:{
                employee:1
            }
        }
    ],
    function(err,data){
        res.json(JSON.stringify(data));
    });
});
router.post("/deleteJob",(req,res)=>{
    Job.deleteOne({ _id:req.body.jid}).then(job =>{
        JobApplied.find({jid:req.body.jid}).then(applications => {
            var arr=["tempkartikmailgen@gmail.com"];
            var i;
            for(i=0;i<applications.length;i++)
            {
                if(applications[i].status === "Accepted")
                    arr.push(applications[i].email);
            }
            Applicant.updateMany({email:{$in : arr}},{$set:{status:"U"}}).then(dat => {
                JobApplied.deleteMany({jid:req.body.jid}).then(dat=>{
                    res.json(dat);
                })
            })
        })
        
    })
});
module.exports = router;