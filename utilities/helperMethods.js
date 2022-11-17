class HelperMethods {
    
    generateRandomString() {
        let result = "";
        const characters = "abcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < 9; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    generateRandomInteger() {
        let result = "";
        const number = "123456789";
        for (let i = 0; i < 5; i++) {
            result += number.charAt(Math.floor(Math.random() * number.length));
        }
        return result;
    }

}

module.exports = HelperMethods;