class ProductsPage {

    constructor(driver) {
        this.driver = driver;
    }

    productSortButton = "//select[@class='product_sort_container']";

    firstProductTitleElement = "(//div[@class='inventory_item_name'])[1]";
    firstProductAddToCartButton = "add-to-cart-sauce-labs-backpack";
    secondProductAddToCartButton = "add-to-cart-sauce-labs-bike-light";

    firstProductRemoveButton = "remove-sauce-labs-backpack";


}

module.exports = ProductsPage;