class WishlistPage {
  constructor(page) {
    this.page = page;

    // Wishlist page selectors
    this.wishlistTable = page.locator('#content table');
    this.wishlistRows  = page.locator('#content tbody tr');
    
    // Selectors inside the row
    this.firstRowName  = page.locator('#content tbody tr').first().locator('td.text-left a').first();
    this.firstRowModel = page.locator('#content tbody tr').first().locator('td.text-left').nth(1);
    this.firstRowPrice = page.locator('#content tbody tr').first().locator('td.text-right').first();
    
    // Action buttons inside the first wishlist row
    this.firstAddToCartBtn = page.locator('#content tbody tr').first().locator('a[data-original-title="Add to Cart"], button[title="Add to Cart"], a[href*="checkout/cart/add"], button[data-original-title="Add to Cart"]').first();
    this.firstRemoveBtn    = page.locator('#content tbody tr').first().locator('a[href*="remove"], a[title="Remove"], a[data-original-title="Remove"]').first();
    
    this.successAlert = page.locator('.alert-dismissible');
    this.emptyMessage = page.locator('#content p, #content div').filter({ hasText: /empty/i }).first();
    this.continueBtn   = page.locator('#content .buttons a[href*="route=common/home"]').first();

    // Account sidebar link
    this.sidebarWishlistLink = page.locator('aside#column-right a, .list-group a').filter({ hasText: 'Wish List' }).first();
  }

  async navigate() {
    await this.page.goto('index.php?route=account/wishlist');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getWishlistRowCount() {
    try {
      return await this.wishlistRows.count();
    } catch {
      return 0;
    }
  }

  async removeFirstItem() {
    await this.firstRemoveBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async addFirstItemToCart() {
    await this.firstAddToCartBtn.click();
    await this.page.waitForTimeout(2000);
  }
}

module.exports = { WishlistPage };
