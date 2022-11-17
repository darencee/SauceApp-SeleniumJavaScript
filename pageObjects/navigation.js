// this class is used for elements that are present on every page of the application
const { By, until } = require("selenium-webdriver");

class Navigation {

    constructor(driver) {
        this.driver = driver;
    }

    topLeftBurgerMenu = "react-burger-menu-btn";
    burgerMenuLogoutButton = "//nav[@class='bm-item-list']//a[text()='Logout']";
    cartButton = "shopping_cart_container";
    cartNumber = "//span[@class='shopping_cart_badge']";

    async logout() {
        await this.driver.wait(until.elementLocated(By.id(this.topLeftBurgerMenu)), 3000);
        await this.driver.findElement(By.id(this.topLeftBurgerMenu)).click();
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(By.xpath(this.burgerMenuLogoutButton)))); // sync issue if this line is not used because of fancy animation
        await this.driver.findElement(By.xpath(this.burgerMenuLogoutButton)).click();
    }

}

module.exports = Navigation;