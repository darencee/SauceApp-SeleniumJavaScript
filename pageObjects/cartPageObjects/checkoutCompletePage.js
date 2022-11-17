class CheckoutCompletePage {
    
    constructor(driver) {
        this.driver = driver;
    }

    orderCompleteHeaderElement = "//h2[@class='complete-header']";
    orderCompleteTextElement = "//div[@class='complete-text']";

    orderCompleteHeaderText = "THANK YOU FOR YOUR ORDER";
    orderCompleteText = "Your order has been dispatched, and will arrive just as fast as the pony can get there!";



    backHomeButton = "back-to-products";

}

module.exports = CheckoutCompletePage;