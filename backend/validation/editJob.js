const validator = require("validator");
const isEmpty = require("is-empty");
const validateDateInput = require("./checkvaliddate");
const checkvaliddate = require("./checkvaliddate");

module.exports = function validateEditJobInput(data){
    let errors= {};
    data.maxapplications = !isEmpty(data.maxapplications)?data.maxapplications.toString(): "";
    data.maxpositions = !isEmpty(data.maxpositions)? data.maxpositions.toString(): "";
    data.deadlined = !isEmpty(data.deadlined)?data.deadlined: "";
    data.deadlinem = !isEmpty(data.deadlinem)?data.deadlinem: "";
    data.deadliney = !isEmpty(data.deadliney)?data.deadliney: "";

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
    return{
        errors,isValid : isEmpty(errors)
    };
}