const { By, sendKeys } = require("selenium-webdriver");

class LoginPage {

    constructor(driver) {
        this.driver = driver;
    }

    usernameInputField = "user-name";
    passwordInputField = "password";
    loginButton = "login-button";

    async loginWithData(usernameValue, passwordValue) {
        await this.driver.findElement(By.id(this.usernameInputField)).sendKeys(usernameValue);
        await this.driver.findElement(By.id(this.passwordInputField)).sendKeys(passwordValue);
        await this.driver.findElement(By.id(this.loginButton)).click();
    }

}

module.exports = LoginPage;