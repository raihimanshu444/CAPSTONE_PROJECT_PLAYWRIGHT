class HomePage {
  constructor(page) {
    this.page = page;

    this.logo = page.locator('#entry_217821 img[alt="Poco Electro"]').first();
    this.logoLink = page.locator('#entry_217821 a[href*="route=common/home"]').first();

    this.searchBar = page.locator('#entry_217822 input[name="search"]').first();
    this.searchButton = page.locator('#entry_217822 button.type-text').first();

    this.myAccountBtn = page.locator('#entry_217834 a[href*="route=account/account"]').first();
    this.loginDropdownLink = page.locator('#entry_217834 a[href*="route=account/login"]').first();
    this.registerDropdownLink = page.locator('#entry_217834 a[href*="route=account/register"]').first();

    this.specialOffersLink = page.locator('#entry_217834 a[href*="route=product/special"]').first();
    this.blogLink = page.locator('#entry_217834 a[href*="route=extension/maza/blog/home"]').first();
    this.megaMenuLink = page.locator('#entry_217834 a[href*="information_id=4"]').first();

    this.shopByCategoryBtn = page.locator('#entry_217832 a[href="#mz-component-1626147655"]').first();
    this.categoryDrawer = page.locator('#mz-component-1626147655');

    this.cartButton = page.locator('#entry_217825 a[href="#cart-total-drawer"]').first();
    this.cartDrawer = page.locator('#cart-total-drawer');

    this.compareLink = page.locator('#entry_217823 a[href*="route=product/compare"]').first();
    this.wishlistLink = page.locator('#entry_217824 a[href*="route=account/wishlist"]').first();

    this.heroBanner = page.locator('#mz-carousel-218380').first();

    this.footerSection = page.locator('footer').first();

    this.mobileCartButton = page.locator('#entry_217830 a[href="#cart-total-drawer"]').first();
    this.mobileMenuBtn = page.locator('#entry_217827 a[href="#mz-component-1626147655"]').first();
  }

  async navigate() {
    await this.page.goto('');
  }

  async searchProduct(keyword) {
    await this.searchBar.fill(keyword);
    await this.searchButton.click();
  }

  async goToLogin() {
    await this.myAccountBtn.hover();
    await this.loginDropdownLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.loginDropdownLink.click();
  }

  async goToRegister() {
    await this.myAccountBtn.hover();
    await this.registerDropdownLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.registerDropdownLink.click();
  }

  async openShopByCategory() {
    await this.shopByCategoryBtn.click();
    await this.categoryDrawer.waitFor({ state: 'visible', timeout: 5000 });
  }

  async clickCategory(categoryName) {
    await this.openShopByCategory();
    const link = this.categoryDrawer.locator('a').filter({ hasText: categoryName }).first();
    await link.waitFor({ state: 'visible', timeout: 5000 });
    await link.click();
  }

  async openCart() {
    await this.cartButton.click();
    await this.cartDrawer.waitFor({ state: 'visible', timeout: 5000 });
  }
}

module.exports = { HomePage };