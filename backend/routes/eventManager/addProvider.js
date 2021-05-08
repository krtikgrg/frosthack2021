const express = require("express");
const router = express.Router();


const User = require("../../models/User");
const currentEvent = require("../../models/currentEvent");

router.post("/v", async (req, res) => {

    await User.findOne({ _id: req.body.id }).then(async user => {
        await res.json(user);

        await currentEvent.updateOne({ email: req.body.email }, {
            $set: {
                vid: user._id,
                vselected: 1,
                vname: user.name,
                vphone: user.phone,
                vprice: user.price
            }
        }).then(async result => {
            

        });


    });
})

router.post("/c", async (req, res) => {

    await User.findOne({ _id: req.body.id }).then(async user => {
        await res.json(user);

        await currentEvent.updateOne({ email: req.body.email }, {
            $set: {
                cid: user._id,
                cselected: 1,
                cname: user.name,
                cphone: user.phone,
                cprice: user.price
            }
        }).then(async result => {
            

        });


    });
})

router.post("/t", async (req, res) => {

    await User.findOne({ _id: req.body.id }).then(async user => {
        await res.json(user);

        await currentEvent.updateOne({ email: req.body.email }, {
            $set: {
                tid: user._id,
                tselected: 1,
                tname: user.name,
                tphone: user.phone,
                tprice: user.price
            }
        }).then(async result => {
            

        });


    });
})

router.post("/p", async (req, res) => {

    await User.findOne({ _id: req.body.id }).then(async user => {
        await res.json(user);

        await currentEvent.updateOne({ email: req.body.email }, {
            $set: {
                pid: user._id,
                pselected: 1,
                pname: user.name,
                pphone: user.phone,
                pprice: user.price
            }
        }).then(async result => {
            

        });


    });
})

router.post("/d", async (req, res) => {

    await User.findOne({ _id: req.body.id }).then(async user => {
        await res.json(user);

        await currentEvent.updateOne({ email: req.body.email }, {
            $set: {
                did: user._id,
                dselected: 1,
                dname: user.name,
                dphone: user.phone,
                dprice: user.price
            }
        }).then(async result => {
            

        });


    });
})

router.post("/reset", async (req, res) => {


    await currentEvent.updateOne({ email: req.body.email }, {
        $set: {
            vselected: 0,
            cselected: 0,
            tselected: 0,
            dselected: 0,
            pselected: 0,
        }
    }).then(async result => {
        res.json("Successfully updated")

    });

})
router.post("/all", async (req, res) => {


    await currentEvent.findOne({ email: req.body.email }).then(async result => {
        res.json(result)

    });

})

module.exports = router;