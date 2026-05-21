class CartPage {
  constructor(page) {
    this.page = page;

    // ── Product Detail Page ────────────────────────────────────────────────
    // The desktop Add-to-Cart button is inside .d-none.d-sm-flex row (entry_216834+)
    // We target the button inside the NON-sticky-bar section of #product-product
    // The sticky bar button is inside fixed-bottom, so exclude it
    this.productPageAddToCart = page.locator('#product-product').locator('.button-cart').last();
    this.productQtyInput      = page.locator('#product-product input[name="quantity"]').first();
    this.productPrice         = page.locator('#product-product h3.price-new').first();
    this.productAvailability  = page.locator('#product-product .badge-success').first();

    // ── Header Cart Badge ─────────────────────────────────────────────────
    this.headerCartBadge       = page.locator('#entry_217825 .cart-item-total').first();
    this.headerCartBtn         = page.locator('#entry_217825 .cart').first();
    this.cartDrawer            = page.locator('#cart-total-drawer');
    this.cartDrawerItems       = page.locator('#cart-total-drawer table tbody tr');
    this.cartDrawerEditBtn     = page.locator('#cart-total-drawer a[href*="route=checkout/cart"]').first();
    this.cartDrawerCheckoutBtn = page.locator('#cart-total-drawer a[href*="route=checkout/checkout"]').first();

    // ── Cart Review Page ──────────────────────────────────────────────────
    // The Maza theme renders the cart with items inside #content
    this.cartTable    = page.locator('#content table').first();
    this.cartRows     = page.locator('#content tbody tr');
    this.firstCartRow = page.locator('#content tbody tr').first();

    this.firstQtyInput  = page.locator('#content tbody tr').first().locator('input[name^="quantity"]');
    this.firstRemoveBtn = page.locator('#content tbody tr').first().locator('a[href*="remove"], button.btn-danger, button[title*="Remove"]').first();

    // Checkout button on cart page  
    this.checkoutBtn = page.locator('#content a[href*="route=checkout/checkout"]').first();

    // ── Empty Cart ────────────────────────────────────────────────────────
    this.emptyCartMessage = page.locator('#content p').filter({ hasText: 'Your shopping cart is empty!' }).first();
    this.continueBtn      = page.locator('#content .buttons a[href*="route=common/home"]').first();
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  async navigateToCart() {
    await this.page.goto('index.php?route=checkout/cart');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToProduct(productId = 47) {
    await this.page.goto(`index.php?route=product/product&product_id=${productId}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Add To Cart via API (reliable, no UI click required) ─────────────────
  // Uses fetch() inside the browser to call the OpenCart cart/add endpoint
  async addToCartViaAPI(productId = 47, quantity = 1) {
    await this.page.evaluate(async ({ productId, quantity }) => {
      const params = new URLSearchParams({
        product_id: String(productId),
        quantity:   String(quantity),
      });
      await fetch('index.php?route=checkout/cart/add', {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body:    params.toString(),
      });
    }, { productId, quantity });
    // Allow AJAX to complete
    await this.page.waitForTimeout(1000);
  }

  // ── Add To Cart via UI Button ─────────────────────────────────────────────
  async addToCartFromProductPage() {
    // Wait for the button to be attached to DOM
    await this.productPageAddToCart.waitFor({ state: 'attached', timeout: 10000 });
    await this.productPageAddToCart.scrollIntoViewIfNeeded();
    await this.productPageAddToCart.click({ force: true });
    // Wait for AJAX badge update
    await this.page.waitForTimeout(3000);
  }

  async addToCartWithQty(qty) {
    await this.productQtyInput.fill(String(qty));
    await this.addToCartFromProductPage();
  }

  // ── Header Cart ───────────────────────────────────────────────────────────
  async getHeaderCartCount() {
    try {
      const text = await this.headerCartBadge.innerText();
      const n = parseInt(text.trim(), 10);
      return isNaN(n) ? 0 : n;
    } catch {
      return 0;
    }
  }

  async openCartDrawer() {
    await this.headerCartBtn.click();
    await this.cartDrawer.waitFor({ state: 'visible', timeout: 8000 });
  }

  // ── Cart Page ─────────────────────────────────────────────────────────────
  async getCartRowCount() {
    try { return await this.cartRows.count(); } catch { return 0; }
  }

  async removeFirstItem() {
    await this.firstRemoveBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async isCartEmpty() {
    return await this.emptyCartMessage.isVisible();
  }

  async emptyTheCart() {
    await this.navigateToCart();
    let empty = await this.isCartEmpty();
    let guard = 0;
    while (!empty && guard < 15) {
      const rows = await this.getCartRowCount();
      if (rows === 0) break;
      await this.firstRemoveBtn.click();
      await this.page.waitForTimeout(1500);
      empty = await this.isCartEmpty();
      guard++;
    }
  }
}

module.exports = { CartPage };