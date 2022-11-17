SauceApp is a simple web application that lets the User shop for items like clothing and accessorizes (e-commerce), developed by SauceLabs\
Application URL: https://saucedemo.com

Tech stack I used is Selenium WebDriver with JavaScript, including Mocha test runner and Chai assertions\
Also integrated with Mochawesome HTML reports

The "testCases" directory is where the test cases are stored. Each spec has a "beforeEach" hook where the WebDriver and the Page Objects are initialized and after that the driver navigates to the Application Under Test (AUT). The "afterEach" hook simply closes the WebDriver after the test case completes

The "utilities" directory contains files which store data that is used in test cases and some helper methods

In the "package.json" file, every dependecy has a star (*) for it's version. This installs the latest version of the dependency when "npm install" is executed\
In the "scripts" object hash, there is the "test" line which lets the user simply type in "npm test" in the CLI so every test case can be executed. A "--reporter" flag is used so after the test cases complete running, a Mochawesome HTML Report can be generated. The newly generated report overwrites the current one\

Example Mochawesome HTML Report results:\

![image](https://user-images.githubusercontent.com/63027446/202567199-f0f245cf-344a-4bab-8d61-6687116b0cee.png)
