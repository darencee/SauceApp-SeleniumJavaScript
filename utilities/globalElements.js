// class for elements that are present on multiple pages in the app, example error messages etc.

class GlobalElements {

    constructor(driver) {
        this.driver = driver;
    }

    errorMessage = "//h3[@data-test='error']"; // by xpath
    closeErrorMessageButton = "//button[@class='error-button']"; // by xpath

}

module.exports = GlobalElements;