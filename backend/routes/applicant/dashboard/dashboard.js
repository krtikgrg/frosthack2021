const express = require("express");
const router = express.Router();

const Job = require("../../../models/Job");
const User = require("../../../models/User");
const JobApplied = require("../../../models/JobApplied");
const checkvaliddate = require("../../../validation/checkvaliddate");
const Recruiter = require("../../../models/Recruiter");
job = [];
var i = 0;
router.post("/", (req, res) => {
    job=[];
    Job.aggregate([
        {
            $lookup:{
                from:"recruiters",
                localField:"email",
                foreignField:"email",
                as:"recruiterinfo"
            }
        },
        {
            $unwind:{
                path:"$recruiterinfo"
            }
        }
    ],
    function(err,jobs){
        for (i = 0; i < jobs.length;i++ ) {
            let dat = {};
            dat.date = jobs[i].deadlined;
            dat.month = jobs[i].deadlinem;
            dat.year = jobs[i].deadliney;
            if (checkvaliddate(dat)) {
                job.push(jobs[i]);
            }
        }
        res.json(job);
    })
});
router.post("/apply",(req,res)=>{
    var d = new Date();
    var din = d.getDate();
    var mhina = d.getMonth()+1;
    var saal = d.getFullYear();
    newJob = new JobApplied({email: req.body.email,jid: req.body.jid,sop: req.body.sop,rating:0,ratingrec:0,doad:din,doam:mhina,doay:saal});
    newJob.status = "Applied";
    newJob.save().then(job => {
        Job.updateOne({_id:req.body.jid},{$inc : {numofapp: 1}}).then(job => {
            res.json(job);
        })
    });  
});
router.post("/numApp",(req,res)=>{
    JobApplied.find({email:req.body.email}).then(data => {
        var ctr=0,i;
        for(i=0; i<data.length;i++){
            if(data[i].status!=="Rejected")
                ctr++;
        }
        var dat={
            count:ctr
        }
        res.json(dat);
    })
})
router.post("/checkempstatus",(req,res)=>{
    Applicant.findOne({email:req.body.email}).then(user => {
        res.json(user);
    })
})
router.post("/myApplications",(req,res) => {
    JobApplied.aggregate([
        {
            $match : {email:req.body.email}
        },
        {
            $project : {
                "myemail":'$email',
                "jid" : 1,
                "status":1,
                "dojd" : 1,
                "dojm" : 1,
                "dojy" : 1,
                "sop":1,
                "rating":1,
                "ratingrec":1,
                "_id":1
            }
        },
        {
            $lookup: {
                from: "jobs",
                localField: "jid",
                foreignField:"_id",
                as:"jobdetail"
            }
        },
        {
            $unwind: {path:"$jobdetail"}
        }
    ],
    function(err,data){
        res.json(data);
    });
});
router.post("/rate",(req,res)=>{
    JobApplied.updateOne({_id:req.body.jaid},{$set:{ratingrec:req.body.rating}}).then(dat=>{
        JobApplied.find({_id:req.body.jaid}).then(job=>{
            job=job[0];
            JobApplied.find({jid:job.jid}).then(cjobs=>{
                var x=0,i,ctr=0;
                for(i=0;i<cjobs.length;i++){
                    if(!(cjobs[i].ratingrec===0)){
                        x=x+cjobs[i].ratingrec;
                        ctr=ctr+1
                    }
                }
                x=x/ctr;
                Job.updateOne({_id:job.jid},{$set:{rating:x}}).then(r=>{
                    Job.find({_id:job.jid}).then(naukri=>{
                        naukri=naukri[0];
                        Job.find({email:naukri.email}).then(alljobs=>{
                            var y=0,j,ctry=0;
                            for(j=0;j<alljobs.length;j++){
                                if(!(alljobs[j].rating===0)){
                                    y=y+alljobs[j].rating;
                                    ctry=ctry+1;
                                }
                            }
                            y=y/ctry;
                            Recruiter.updateOne({email:naukri.email},{$set:{rating:y}}).then(result=>{
                                res.json(result);
                            })
                        })
                    })
                })
            })
        })
    })
})
router.post("/getJids",(req,res)=>{
    JobApplied.aggregate([
        {
            $match : {email:req.body.email}
        },
        {
            $project : {
                "jid" : 1,
            }
        },
        {
            $lookup: {
                from: "jobs",
                localField: "jid",
                foreignField:"_id",
                as:"jobdetail"
            }
        },
        {
            $unwind: {path:"$jobdetail"}
        },
        {
            $project : {
                "jid" : 1,
            }
        }
    ],
    function(err,data){
        res.json(data);
    });
})
module.exports = router;