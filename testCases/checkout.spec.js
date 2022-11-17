const { Builder, By, Key } = require("selenium-webdriver");
const { expect } = require("chai");
const LoginPage = require("../pageObjects/loginPage.js");
const Navigation = require("../pageObjects/navigation.js");
const ProductsPage = require("../pageObjects/productsPage.js");
const CartPage = require("../pageObjects/cartPageObjects/cartPage.js");
const ProductDisplayPage = require("../pageObjects/productDisplayPage.js");
const LoginData = require("../utilities/loginData.js");
const CheckoutYourInformationPage = require("../pageObjects/cartPageObjects/checkoutYourInformationPage.js");
const CheckoutData = require("../utilities/checkoutData.js");
const GlobalElements = require("../utilities/globalElements.js");
const CheckoutOverviewPage = require("../pageObjects/cartPageObjects/checkoutOverviewPage.js");
const CheckoutCompletePage = require("../pageObjects/cartPageObjects/checkoutCompletePage.js");

var capabilities = {
    browserName: "chrome",
    chromeOptions: {
        args: ["--disable-plugins"]
    }
};

describe("checkout scenario test cases", () => {
    let driver;
    let loginPage;
    let navigation;
    let loginData;
    let cartPage;
    let checkoutYourInformationPage;
    let checkoutData;
    let productsPage;
    let globalElements;
    let checkoutOverviewPage;
    let checkoutCompletePage;

    beforeEach(async () => {
        driver = await new Builder().withCapabilities(capabilities).build();
        loginPage = new LoginPage(driver);
        navigation = new Navigation(driver);
        loginData = new LoginData(driver);
        cartPage = new CartPage(driver);
        checkoutData = new CheckoutData(driver);
        checkoutYourInformationPage = new CheckoutYourInformationPage(driver);
        productsPage = new ProductsPage(driver);
        globalElements = new GlobalElements(driver);
        checkoutOverviewPage = new CheckoutOverviewPage(driver);
        checkoutCompletePage = new CheckoutCompletePage(driver);
        await driver.get(loginData.applicationUnderTestUrl);
        await driver.manage().window().maximize();
    });

    it("should validate checkout with no products in cart", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(navigation.cartButton)).click();
        expect(await driver.findElement(By.id(cartPage.checkoutButton)).getAttribute("buttonState")).to.eq("disabled");
    });

    it("should validate checkout without entering shipping information", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        await driver.findElement(By.id(cartPage.checkoutButton)).click();
        await checkoutYourInformationPage.submitCheckoutInformation("", "", "");
        validateAndCloseErrorMessage();
        await checkoutYourInformationPage.submitCheckoutInformation(checkoutData.firstName, "", "",);
        validateAndCloseErrorMessage();
        await checkoutYourInformationPage.submitCheckoutInformation(checkoutData.firstName, checkoutData.lastName, "");
        validateAndCloseErrorMessage();
        await checkoutYourInformationPage.submitCheckoutInformation(checkoutData.firstName, "", checkoutData.zipPostalCode);
        validateAndCloseErrorMessage();

        async function validateAndCloseErrorMessage() {
            expect(await driver.findElement(By.xpath(globalElements.errorMessage))).to.exist;
            await driver.findElement(By.xpath(globalElements.closeErrorMessageButton)).click();
        }
    });

    it("should validate the placeholders on the three input fields on the second page of checkout", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        await driver.findElement(By.id(cartPage.checkoutButton)).click();
        expect(await driver.findElement(By.id(checkoutYourInformationPage.firstNameInputField)).getAttribute("placeholder")).to.eq("First Name");
        expect(await driver.findElement(By.id(checkoutYourInformationPage.lastNameInputField)).getAttribute("placeholder")).to.eq("Last Name");
        expect(await driver.findElement(By.id(checkoutYourInformationPage.zipPostalCodeInputField)).getAttribute("placeholder")).to.eq("Zip/Postal Code");
    });

    it("should validate checkout with one product", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        await driver.findElement(By.id(cartPage.checkoutButton)).click();
        await checkoutYourInformationPage.submitCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.zipPostalCode);
        await driver.findElement(By.id(checkoutOverviewPage.finishButton)).click();
        expect(await driver.findElement(By.xpath(checkoutCompletePage.orderCompleteHeaderElement))).to.exist;
        await driver.findElement(By.xpath(checkoutCompletePage.orderCompleteHeaderElement)).getText().then(function (text) {
            expect(text).to.eq(checkoutCompletePage.orderCompleteHeaderText);
        });
        expect(await driver.findElement(By.xpath(checkoutCompletePage.orderCompleteTextElement))).to.exist;
        await driver.findElement(By.xpath(checkoutCompletePage.orderCompleteTextElement)).getText().then(function (text) {
            expect(text).to.eq(checkoutCompletePage.orderCompleteText);
        });
    });

    it("should validate checkout with multiple products", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.id(productsPage.secondProductAddToCartButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        await driver.findElement(By.id(cartPage.checkoutButton)).click();
        await checkoutYourInformationPage.submitCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.zipPostalCode);
        await driver.findElement(By.id(checkoutOverviewPage.finishButton)).click();
        expect(await driver.findElement(By.xpath(checkoutCompletePage.orderCompleteHeaderElement))).to.exist;
        await driver.findElement(By.xpath(checkoutCompletePage.orderCompleteHeaderElement)).getText().then(function (text) {
            expect(text).to.eq(checkoutCompletePage.orderCompleteHeaderText);
        });
        expect(await driver.findElement(By.xpath(checkoutCompletePage.orderCompleteTextElement))).to.exist;
        await driver.findElement(By.xpath(checkoutCompletePage.orderCompleteTextElement)).getText().then(function (text) {
            expect(text).to.eq(checkoutCompletePage.orderCompleteText);
        });
    });

    it("should validate the cart is cleared after the user checks out", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        await driver.findElement(By.id(cartPage.checkoutButton)).click();
        await checkoutYourInformationPage.submitCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.zipPostalCode);
        await driver.findElement(By.id(checkoutOverviewPage.finishButton)).click();
        await driver.findElement(By.id(checkoutCompletePage.backHomeButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        expect(await driver.findElement(By.id(cartPage.checkoutButton)).getAttribute("buttonState")).to.eq("disabled");
    });

    afterEach(async () => {
        driver.quit();
    });
});