const express = require("express");
const router = express.Router();


const User = require("../../models/User");
const currentEvent = require("../../models/currentEvent");
const Events = require("../../models/Events");


router.post("/addEvent", async (req, res) => {


    await currentEvent.findOne({ email: req.body.email }).then(async result => {
        res.json(result)

        const Event = new Events({ email: req.body.email,
            vid: result.vid,
            vname: result.vname,
            vphone: result.vphone,
            vprice: result.vprice,
            tid: result.tid,
            tname: result.tname,
            tphone: result.tphone,
            tprice: result.tprice,
            pid: result.pid,
            pname: result.pname,
            pphone: result.pphone,
            pprice: result.pprice,
            cid: result.cid,
            cname: result.cname,
            cphone: result.cphone,
            cprice: result.cprice,
            did: result.did,
            dname: result.dname,
            dphone: result.dphone,
            dprice: result.dprice });
            await Event.save().then(user => res.json(user)).catch(err => console.log(err));

    });

})

router.post("/all",(req,res)=>{
    // console.log(req.body);
    Events.find({email: req.body.email}).then(event => {
        res.json(event);
        // console.log(res);
    });
});


router.post("/changeEventStatus", async (req, res) => {
    await Events.updateOne({ _id: req.body.id }, {
        $set: {
            ongoing: 0
        }
    }).then(async result => {
        res.json("Successfully changed status")     

    }); 

})

module.exports = router;