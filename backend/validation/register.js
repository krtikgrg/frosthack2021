const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors= {};
    data.name = !isEmpty(data.name) ? data.name: "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.password2 = !isEmpty(data.password2) ? data.password2: "";
    data.type = !isEmpty(data.type) ? data.type: "";
    data.description = !isEmpty(data.description) ? data.description: "";
    data.price = !isEmpty(data.price) ? data.price: "";

    if(validator.isEmpty(data.name)){
        errors.name = "Name field can not be empty";
    }
    if(validator.isEmpty(data.email)){
        errors.email = "Email field can not be empty";
    } else if(!validator.isEmail(data.email)){
        errors.email = "Invalid email";
    }
    if(validator.isEmpty(data.password)){
        errors.password = "Password field can not be empty";
    }
    // if(validator.isEmpty(data.type)){
    //     errors.type = "Type required";
    // }
    if(validator.isEmpty(data.password2)){
        errors.password2 = " Confirm Password can not be empty";
    }
    if(!validator.isLength(data.password,{ min:6, max:30 })){
        errors.password = "Password length must be at least 6 characters and maximum 30 characters";
    }
    if(!validator.equals(data.password,data.password2)){
        errors.password2 = "Passwords do not match";
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