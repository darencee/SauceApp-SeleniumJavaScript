const HelperMethods = require("../utilities/helperMethods.js");
let helperMethods = new HelperMethods();

class CheckoutData {

    firstName = helperMethods.generateRandomString();
    lastName = helperMethods.generateRandomString();
    zipPostalCode = helperMethods.generateRandomInteger();

}

module.exports = CheckoutData;