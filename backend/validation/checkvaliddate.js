const validator = require("validator");
module.exports = function validateDateInput(data) {
    date = data.date;
    month = data.month;
    year = data.year;
    if (!typeof (date) === "number" && validator.isEmpty(date)) {
        return false;
    } else {
        date = parseInt(date);
        if (date <= 0 || date > 31)
            return false;
    }
    if (!typeof (month) === "number" && validator.isEmpty(month)) {
        return false;
    } else {
        month = parseInt(month);
        if (month <= 0 || month > 12)
            return false;
    }
    if (!typeof (year) === "number" && validator.isEmpty(year)) {
        return false;
    } else {
        year = parseInt(year);
        if (year % 1000 == 0)
            return false;
    }
    if (month == 2) {
        if (year % 4 == 0 && date > 29)
            return false;
        else if (year % 4 != 0 && date > 28)
            return false;
    }
    if (!(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)) {
        if (date > 30)
            return false;
    }
    var d = new Date();
    if (year > d.getFullYear())
        return true;
    else if (year == d.getFullYear()) {
        if (month > (d.getMonth() + 1))
            return true;
        else if (month == (d.getMonth() + 1)) {
            if (date >= d.getDate())
                return true;
        }
    }
    return false;
}