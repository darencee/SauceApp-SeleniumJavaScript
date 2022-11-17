const { Builder, By, Key } = require("selenium-webdriver");
const { expect } = require("chai");
const LoginPage = require("../pageObjects/loginPage.js");
const Navigation = require("../pageObjects/navigation.js");
const ProductsPage = require("../pageObjects/productsPage.js");
const LoginData = require("../utilities/loginData.js");
const GlobalElements = require("../utilities/globalElements.js");

var capabilities = {
    browserName: "chrome",
    chromeOptions: {
        args: ["--disable-plugins"]
    }
};

describe("login scenario test cases", () => {
    let driver;
    let loginPage;
    let navigation;
    let productsPage;
    let loginData;
    let globalElements;

    beforeEach(async () => {
        driver = await new Builder().withCapabilities(capabilities).build();
        loginPage = new LoginPage(driver);
        navigation = new Navigation(driver);
        productsPage = new ProductsPage(driver);
        loginData = new LoginData(driver);
        globalElements = new GlobalElements(driver);
        await driver.get(loginData.applicationUnderTestUrl);
        await driver.manage().window().maximize();
    });

    it("should login using valid credentials", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        expect(await driver.findElement(By.xpath(productsPage.productSortButton))).to.exist;
        await navigation.logout();
        await loginPage.loginWithData(loginData.problemUser, loginData.password);
        expect(await driver.findElement(By.xpath(productsPage.productSortButton))).to.exist;
        await navigation.logout();
        await loginPage.loginWithData(loginData.performanceGlitchUser, loginData.password);
        expect(await driver.findElement(By.xpath(productsPage.productSortButton))).to.exist;
    });

    it("should login using invalid credentials", async () => {
        await loginPage.loginWithData(loginData.invalidUsername, loginData.invalidPassword);
        expect(await driver.findElement(By.xpath(globalElements.errorMessage))).to.exist;
        // note for myself: try to find a workaround around the nested elements to validate the text
    });

    it("should login with a valid username and an invalid password", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.invalidPassword);
        expect(await driver.findElement(By.xpath(globalElements.errorMessage))).to.exist;
    });

    it("should login without providing any credentials", async () => {
        await loginPage.loginWithData("", "");
        expect(await driver.findElement(By.xpath(globalElements.errorMessage))).to.exist;
        await driver.get(loginData.applicationUnderTestUrl); // clear() is too slow and logs me in so I have to navigate to the app again
        await loginPage.loginWithData(loginData.standardUser, "");
        expect(await driver.findElement(By.xpath(globalElements.errorMessage))).to.exist;
        await driver.get(loginData.applicationUnderTestUrl);
        await loginPage.loginWithData("", loginData.password);
        expect(await driver.findElement(By.xpath(globalElements.errorMessage))).to.exist;
    });

    it("should login with keyboard keys", async () => {
        await driver.actions().keyDown(Key.TAB).sendKeys(loginData.standardUser).perform();
        await driver.actions().keyDown(Key.TAB).sendKeys(loginData.password).perform();
        await driver.actions().keyDown(Key.TAB).perform();
        await driver.actions().keyDown(Key.ENTER).perform();
        expect(await driver.findElement(By.xpath(productsPage.productSortButton))).to.exist;
    });

    it("should validate correct placeholders on the input fields", async () => {
        const placeholderTextUsernameField = await driver.findElement(By.id(loginPage.usernameInputField)).getAttribute("placeholder");
        const placeholderTextPasswordField = await driver.findElement(By.id(loginPage.passwordInputField)).getAttribute("placeholder");
        expect(placeholderTextUsernameField).to.eq("Username");
        expect(placeholderTextPasswordField).to.eq("Password");
    });

    it("should login with a locked out account", async () => {
        await loginPage.loginWithData(loginData.lockedOutUser, loginData.password);
        expect(await driver.findElement(By.xpath(globalElements.errorMessage))).to.exist;
    });

    it("should validate the number of unsuccessful login attempts", async () => {
        await driver.findElement(By.id(loginPage.usernameInputField)).sendKeys(loginData.standardUser);
        for (let i = 0; i < 10; i++) {
            await driver.findElement(By.id(loginPage.passwordInputField)).sendKeys("q");
            await driver.findElement(By.id(loginPage.loginButton)).click();
        }
        // no message that the account has been locked out for the huge number of unsuccessful login attempts
        // can be considered as an anomaly
    });

    afterEach(async () => {
        driver.quit();
    });
});