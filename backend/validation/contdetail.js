const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCnum(data) {
    let errors = {};
    data.cnum = !isEmpty(data.cnum) ? data.cnum : "";
    if (!validator.isEmpty(data.cnum)) {
        if (data.cnum.length != 10)
            errors.length = "Invalid Number";
    }
    return {
        errors, isValid: isEmpty(errors)
    };
} 