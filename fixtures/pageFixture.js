const base = require('@playwright/test');

const { LoginPage }    = require('../pages/LoginPage');
const { HomePage }     = require('../pages/HomePage');
const { RegisterPage } = require('../pages/RegisterPage');
const { SearchPage }   = require('../pages/SearchPage');
const { CartPage }     = require('../pages/CartPage');
const { WishlistPage } = require('../pages/WishlistPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { ContactPage }  = require('../pages/ContactPage');

const test = base.test.extend({

    // ==================================================
    // LOGIN PAGE
    // ==================================================

    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);

    },

    // ==================================================
    // HOME PAGE
    // ==================================================

    homePage: async ({ page }, use) => {

        const homePage = new HomePage(page);

        await use(homePage);

    },

    // ==================================================
    // REGISTER PAGE
    // ==================================================

    registerPage: async ({ page }, use) => {

        const registerPage = new RegisterPage(page);

        await use(registerPage);

    },

    // ==================================================
    // SEARCH PAGE
    // ==================================================

    searchPage: async ({ page }, use) => {

        const searchPage = new SearchPage(page);

        await use(searchPage);

    },

    // ==================================================
    // CART PAGE
    // ==================================================

    cartPage: async ({ page }, use) => {

        const cartPage = new CartPage(page);

        await use(cartPage);

    },

    // ==================================================
    // WISHLIST PAGE
    // ==================================================

    wishlistPage: async ({ page }, use) => {

        const wishlistPage = new WishlistPage(page);

        await use(wishlistPage);

    },

    // ==================================================
    // CHECKOUT PAGE
    // ==================================================

    checkoutPage: async ({ page }, use) => {

        const checkoutPage = new CheckoutPage(page);

        await use(checkoutPage);

    },

    // ==================================================
    // DASHBOARD PAGE
    // ==================================================

    dashboardPage: async ({ page }, use) => {

        const dashboardPage = new DashboardPage(page);

        await use(dashboardPage);

    },

    // ==================================================
    // CONTACT PAGE
    // ==================================================

    contactPage: async ({ page }, use) => {

        const contactPage = new ContactPage(page);

        await use(contactPage);

    }

});

module.exports = {
    test,
    expect: base.expect
};