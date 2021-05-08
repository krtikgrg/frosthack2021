const validator = require("validator");
const isEmpty = require("is-empty");
const validateDateInput = require("./checkvaliddate");
const checkvaliddate = require("./checkvaliddate");

module.exports = function validateCreateJobInput(data){
    let errors= {};
    data.title = !isEmpty(data.title)?data.title: "";
    data.email = !isEmpty(data.email)?data.email: "";
    data.name = !isEmpty(data.name)?data.name: "";
    data.maxapplications = !isEmpty(data.maxapplications)?data.maxapplications: "";
    data.maxpositions = !isEmpty(data.maxpositions)? data.maxpositions: "";
    data.deadlined = !isEmpty(data.deadlined)?data.deadlined: "";
    data.deadlinem = !isEmpty(data.deadlinem)?data.deadlinem: "";
    data.deadliney = !isEmpty(data.deadliney)?data.deadliney: "";
    data.type = !isEmpty(data.type)?data.type:"";
    data.duration = !isEmpty(data.duration)?data.duration:"";
    data.salary = !isEmpty(data.salary)?data.salary:"";

    if(validator.isEmpty(data.title)){
        errors.title = "Title required";
    }
    if(validator.isEmpty(data.email)){
        errors.email = "Email required";
    }
    else if(!validator.isEmail(data.email)){
        errors.email = "Email invalid";
    }
    if(validator.isEmpty(data.name)){
        errors.name = "name required";
    }
    if(validator.isEmpty(data.maxapplications)){
        errors.maxapplications = "Maximum Applications required";
    }else{
        data.maxapplications = parseInt(data.maxapplications);
        if(data.maxapplications <= 0)
            errors.maxapplications = "Invalid Number of Applications";
    }
    if(validator.isEmpty(data.maxpositions)){
        errors.maxpositions = "Maximum positions required";
    }else {
        data.maxpositions= parseInt(data.maxpositions);
        if(data.maxpositions <= 0 || data.maxapplications<data.maxpositions)
            errors.maxpositions = "Invalid Number of positions";
    }
    let dat = {};
    dat.date = data.deadlined;
    dat.month = data.deadlinem;
    dat.year = data.deadliney;
    if(!checkvaliddate(dat))
        errors.deadline = "Invalid date input";
    else{
        data.deadlined = parseInt(data.deadlined);
        data.deadlinem = parseInt(data.deadlinem);
        data.deadliney = parseInt(data.deadliney);
    }
    if(validator.isEmpty(data.type)){
        errors.type = "Type of job required";
    }
    if(validator.isEmpty(data.duration)){
        errors.duration = "Duration of the job is required";
    }else{
        data.duration = parseInt(data.duration);
        if(data.duration<=0 || data.duration>6)
            errors.duration = " Invalid Duration[0( not included ) to 6( included )]";
    }
    if(validator.isEmpty(data.salary)){
        errors.salary = "Salary required";
    }else{
        data.salary = parseInt(data.salary);
        if(data.salary<0)
            errors.salary = "Invalid Salary amount";
    }
    return{
        errors,isValid : isEmpty(errors)
    };
}