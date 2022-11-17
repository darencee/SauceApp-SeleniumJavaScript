class CartPage {

    constructor(driver) {
        this.driver = driver;
    }

    productInCart = "//div[@class='cart_list']//div[@class='cart_item']"; // by xpath, multiple web elements will be returned if multiple products are in the cart
    continueShoppingButton = "continue-shopping";
    removeFirstButton = "remove-sauce-labs-backpack";
    checkoutButton = "checkout";
}

module.exports = CartPage;