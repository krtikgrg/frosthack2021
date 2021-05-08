const validator = require("validator");
const isEmpty = require("is-empty");
const checkvaliddatelt = require("./checkvaliddatelt");
module.exports = function validateEducationInstanceInput(data) {
    let errors = {};
    data.namei = !isEmpty(data.namei) ? data.namei : "";
    data.startd = !isEmpty(data.startd) ? data.startd : "";
    data.startm = !isEmpty(data.startm) ? data.startm : "";
    data.starty = !isEmpty(data.starty) ? data.starty : "";
    data.endd = !isEmpty(data.endd) ? data.endd : "";
    data.endm = !isEmpty(data.endm) ? data.endm : "";
    data.endy = !isEmpty(data.endy) ? data.endy : "";
    if (validator.isEmpty(data.namei)) {
        errors.namei = "Name of Institute Cannot be Empty";
    }
    let dat = {};
    dat.date = data.startd;
    dat.month = data.startm;
    dat.year = data.starty;
    if (!checkvaliddatelt(dat))
        errors.start = "Invalid Date input";
    data.endd = data.endd.toString();
    data.endm = data.endm.toString();
    data.endy = data.endy.toString();
    if (!(validator.isEmpty(data.endd) && validator.isEmpty(data.endm) && validator.isEmpty(data.endy))) {
        dat.date = data.endd;
        dat.month = data.endm;
        dat.year = data.endy;
        if (!checkvaliddatelt(dat))
            errors.end = "Invalid end Date";
    }
    if (errors.start===undefined && !(validator.isEmpty(data.endd) && validator.isEmpty(data.endm) && validator.isEmpty(data.endy)) && errors.end===undefined) {
        date = parseInt(data.startd);
        month = parseInt(data.startm);
        year = parseInt(data.starty);
        edate = parseInt(data.endd);
        emonth = parseInt(data.endm);
        eyear = parseInt(data.endy);
        if (year > eyear)
            errors.date= "dates conflict";
        else if (year == eyear) {
            if (month > emonth)
                errors.date= "dates conflict";
            else if (month == emonth) {
                if (date > edate)
                    errors.date= "dates conflict";
            }
        }
    }
    return {
        errors, isValid: isEmpty(errors)
    };
}