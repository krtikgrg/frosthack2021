const express = require("express");
const router = express.Router();

const Recruiter = require("../../models/Recruiter");
const User = require("../../models/User");
const Job = require("../../models/Job");
const validateCnum = require("../../validation/contdetail");
const validateEditNameApplicantInput = require("../../validation/editname")

router.post("/", (req, res) => {
    Recruiter.findOne({ email: req.body.email }).then(recruiter => {
        res.json(recruiter);
    });
});
router.post("/editName", (req, res) => {
    const { errors, isValid } = validateEditNameApplicantInput(req.body);
    if (!isValid)
        return res.status(400).json(errors);
    User.updateOne({ email: req.body.email }, { $set: { name: req.body.name } }).then(user => {
        Job.updateMany({ email: req.body.email }, { $set: { name: req.body.name } }).then(() => {
            Recruiter.updateOne({ email: req.body.email }, { $set: { name: req.body.name } }).then(() => {
                res.json(user);
            });
        });
    });
});
router.post("/ContactDetail", (req, res) => {
    const { errors, isValid } = validateCnum(req.body);
    if (!isValid)
        return res.status(400).json(errors);
    Recruiter.updateOne({ email: req.body.email }, { $set: { cnum: req.body.cnum } }).then(user => {
        res.json(user);
    })
})
router.post("/Bio", (req, res) => {
    Recruiter.updateOne({ email: req.body.email }, { $set: { bio: req.body.bio } }).then(user => {
        res.json(user);
    });
});

module.exports = router;