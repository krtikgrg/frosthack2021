const validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSkillsInput(data){
    let errors= {};
    data.skills = !isEmpty(data.skills)?data.skills:"";
    if(validate.isEmpty(data.skills)){
        errors.skills("Skill name is required");
    }
    return {
        errors,isValid: isEmpty(errors)
    }
}