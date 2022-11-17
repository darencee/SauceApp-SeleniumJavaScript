class LoginData {

    constructor(driver) {
        this.driver = driver;
    }

    applicationUnderTestUrl = "https://www.saucedemo.com";
    standardUser = "standard_user";
    problemUser = "problem_user";
    performanceGlitchUser = "performance_glitch_user";
    lockedOutUser = "locked_out_user";
    password = "secret_sauce";

    invalidUsername = "invalidUsername";
    invalidPassword = "invalidPassword";

}

module.exports = LoginData;