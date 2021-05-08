const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors= {};
    data.name = !isEmpty(data.name) ? data.name: "";
    data.type = !isEmpty(data.type) ? data.type: "";
    data.description = !isEmpty(data.description) ? data.description: "";
    data.price = !isEmpty(data.price) ? data.price: "";

    if(validator.isEmpty(data.name)){
        errors.name = "Name field can not be empty";
    }

    if( data.type !== "u"){
        if(validator.isEmpty(data.description)){
            errors.description = "Description is required";
        }
        if(validator.isEmpty(data.price)){
            errors.price = "Price is required";
        }
        else if(Number(data.price) < 0){
            errors.price = "Price should be positive";
        }
        else if(Number(data.price) > 999999){
            errors.price = "Aukat meh reh";
        }

    }


    return{
        errors,isValid: isEmpty(errors)
    };
};