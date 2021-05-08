const validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateEditNameApplicantInput(data){
    let errors = {};

    data.name = !isEmpty(data.name)? data.name: "";
    if(validator.isEmpty(data.name)){
        errors.name = "Name cannot be empty";
    }
    return {
        errors,isValid : isEmpty(errors)
    };
}