const express = require("express");
const mongoose = require("mongoose");
const bodyParser= require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
// const createjob = require("./routes/recruiter/createJob");
// const applicantDashboard = require("./routes/applicant/dashboard/dashboard");
const serviceProviderProfile = require("./routes/serviceProvider/profile/profile");
const getProviderEventManager = require("./routes/eventManager/getProvider");
const addProviderEventManager = require("./routes/eventManager/addProvider");
const events = require("./routes/eventManager/events");
// const applicantProfile = require("./routes/applicant/profile/profile");
// const recruiterProfile = require("./routes/recruiter/profile");
// const recruiterDashboard = require("./routes/recruiter/dashboard/dashboard");
// call per hu
const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users",users);    
// app.use("/recruiter/createJob",createjob);
app.use("/serviceProvider/profile",serviceProviderProfile);
app.use("/eventManager/getProvider",getProviderEventManager);
app.use("/eventManager/addProvider",addProviderEventManager);
app.use("/eventManager/event",events);
// app.use("/applicant/profile",applicantProfile);
// app.use("/recruiter/profile",recruiterProfile);
// app.use("/recruiter/dashboard",recruiterDashboard);
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`server's up :p ${port}`));