class ProductDisplayPage {

    constructor(driver) {
        this.driver = driver;
    }

    addToCartButton = "//button[text()='Add to cart']";
    removeButton = "//button[text()='Remove']";

}

module.exports = ProductDisplayPage;