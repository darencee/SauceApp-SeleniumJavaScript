const { By, sendKeys } = require("selenium-webdriver");

class CheckoutYourInformationPage {

    constructor(driver) {
        this.driver = driver;
    }

    firstNameInputField = "first-name";
    lastNameInputField = "last-name";
    zipPostalCodeInputField = "postal-code";

    continueButton = "continue";
    cancelButton = "cancel";

    async submitCheckoutInformation(firstNameValue, lastNameValue, zipPostalCodeValue) {
        await this.driver.findElement(By.id(this.firstNameInputField)).clear();
        await this.driver.findElement(By.id(this.firstNameInputField)).sendKeys(firstNameValue);
        await this.driver.findElement(By.id(this.lastNameInputField)).clear();
        await this.driver.findElement(By.id(this.lastNameInputField)).sendKeys(lastNameValue);
        await this.driver.findElement(By.id(this.zipPostalCodeInputField)).clear();
        await this.driver.findElement(By.id(this.zipPostalCodeInputField)).sendKeys(zipPostalCodeValue);
        await this.driver.findElement(By.id(this.continueButton)).click();
    }

}

module.exports = CheckoutYourInformationPage;