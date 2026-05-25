class DashboardPage {

    constructor(page) {

        this.page = page;

        // ==================================================
        // ACCOUNT SECTION
        // ==================================================

        this.editAccountLink = page.locator('#content a[href*="route=account/edit"]').first();
        this.passwordChangeLink = page.locator('#content a[href*="route=account/password"]').first();
        this.addressBookLink = page.locator('#content a[href*="route=account/address"]').first();
        this.wishlistLink = page.locator('#content a[href*="route=account/wishlist"]').first();

        // ==================================================
        // ORDER SECTION
        // ==================================================

        this.orderHistoryLink = page.locator('#content a[href*="route=account/order"]').first();
        this.downloadsLink = page.locator('#content a[href*="route=account/download"]').first();
        this.rewardPointsLink = page.locator('#content a[href*="route=account/reward"]').first();
        this.returnRequestsLink = page.locator('#content a[href*="route=account/return"]').first();
        this.transactionsLink = page.locator('#content a[href*="route=account/transaction"]').first();
        this.recurringPaymentsLink = page.locator('#content a[href*="route=account/recurring"]').first();

        // ==================================================
        // NEWSLETTER
        // ==================================================

        this.newsletterLink = page.locator('#content a[href*="route=account/newsletter"]').first();

        // ==================================================
        // LOGOUT
        // ==================================================

        this.logoutLink = page.locator('aside#column-right a[href*="route=account/logout"], a.list-group-item[href*="route=account/logout"]').first();

        // ==================================================
        // PAGE HEADERS
        // ==================================================

        this.myAccountHeader = page.locator('#content h2').filter({ hasText: 'My Account' }).first();

    }

    // ==================================================
    // ACTION METHODS
    // ==================================================

    async clickEditAccount() {
        await this.editAccountLink.click();
    }

    async clickPasswordChange() {
        await this.passwordChangeLink.click();
    }

    async clickAddressBook() {
        await this.addressBookLink.click();
    }

    async clickWishlist() {
        await this.wishlistLink.click();
    }

    async clickOrderHistory() {
        await this.orderHistoryLink.click();
    }

    async clickDownloads() {
        await this.downloadsLink.click();
    }

    async clickRewardPoints() {
        await this.rewardPointsLink.click();
    }

    async clickReturnRequests() {
        await this.returnRequestsLink.click();
    }

    async clickTransactions() {
        await this.transactionsLink.click();
    }

    async clickRecurringPayments() {
        await this.recurringPaymentsLink.click();
    }

    async clickNewsletter() {
        await this.newsletterLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

}

module.exports = { DashboardPage };