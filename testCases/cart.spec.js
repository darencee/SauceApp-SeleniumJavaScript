const { Builder, By, Key } = require("selenium-webdriver");
const { expect } = require("chai");
const LoginPage = require("../pageObjects/loginPage.js");
const Navigation = require("../pageObjects/navigation.js");
const ProductsPage = require("../pageObjects/productsPage.js");
const CartPage = require("../pageObjects/cartPageObjects/cartPage.js");
const ProductDisplayPage = require("../pageObjects/productDisplayPage.js");
const LoginData = require("../utilities/loginData.js");

var capabilities = {
    browserName: "chrome",
    chromeOptions: {
        args: ["--disable-plugins"]
    }
};

describe("cart scenario test cases", () => {
    let driver;
    let loginPage;
    let navigation;
    let productsPage;
    let cartPage;
    let productDisplayPage;
    let loginData;

    beforeEach(async () => {
        driver = await new Builder().withCapabilities(capabilities).build();
        loginPage = new LoginPage(driver);
        navigation = new Navigation(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        productDisplayPage = new ProductDisplayPage(driver);
        loginData = new LoginData(driver);
        await driver.get(loginData.applicationUnderTestUrl);
        await driver.manage().window().maximize();
    });

    it("should add a product to cart from the products page", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        expect(await driver.findElements(By.xpath(cartPage.productInCart))).to.have.length(1); // validation that cart is not empty
    });

    it("should add a product to cart from the product display page", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.xpath(productsPage.firstProductTitleElement)).click();
        await driver.findElement(By.xpath(productDisplayPage.addToCartButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        expect(await driver.findElements(By.xpath(cartPage.productInCart))).to.have.length(1); // validation that cart is not empty
    });

    it("should validate the continue shopping button", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        await driver.findElement(By.id(cartPage.continueShoppingButton)).click();
        expect(await driver.findElement(By.xpath(productsPage.productSortButton))).to.exist;
    });

    it("should validate removing an item from the cart from the cart page", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        await driver.findElement(By.id(cartPage.removeFirstButton)).click();
        expect(await driver.findElements(By.xpath(cartPage.productInCart))).to.have.length(0); // validation that cart is empty
        await driver.findElement(By.id(cartPage.continueShoppingButton)).click();
        expect(await driver.findElement(By.id(productsPage.firstProductAddToCartButton))).to.exist; // bonus validation that the button returns to it's original state
    });

    it("should validate removing an item from the cart from the products page", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.id(productsPage.firstProductRemoveButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        expect(await driver.findElements(By.xpath(cartPage.productInCart))).to.have.length(0);
    });

    it("should validate removing an item from the cart from the product display page", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        await driver.findElement(By.xpath(productsPage.firstProductTitleElement)).click();
        await driver.findElement(By.xpath(productDisplayPage.removeButton)).click();
        await driver.findElement(By.id(navigation.cartButton)).click();
        expect(await driver.findElements(By.xpath(cartPage.productInCart))).to.have.length(0);
    });

    it("should validate the number on the cart updates when adding and removing products", async () => {
        await loginPage.loginWithData(loginData.standardUser, loginData.password);
        await driver.findElement(By.id(productsPage.firstProductAddToCartButton)).click();
        let cartNumber = await driver.findElement(By.xpath(navigation.cartNumber)).getText();
        expect(cartNumber).to.eq('1');
        await driver.findElement(By.id(productsPage.firstProductRemoveButton)).click();
        expect(await driver.findElements(By.xpath(navigation.cartNumber))).to.have.length(0); // validation for empty cart number
    });


    afterEach(async () => {
        driver.quit();
    });
});