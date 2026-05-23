class CheckoutPage {
  constructor(page) {
    this.page = page;

    // ── Billing Address Form ──────────────────────────────────────────────
    // All confirmed from live page debug dump
    this.firstNameInput  = page.locator('#input-payment-firstname');
    this.lastNameInput   = page.locator('#input-payment-lastname');
    this.address1Input   = page.locator('#input-payment-address-1');
    this.cityInput       = page.locator('#input-payment-city');
    this.postcodeInput   = page.locator('#input-payment-postcode');
    this.countrySelect   = page.locator('#input-payment-country');
    this.zoneSelect      = page.locator('#input-payment-zone');

    // ── Shipping Same as Billing ──────────────────────────────────────────
    this.shippingSameChk = page.locator('#input-shipping-address-same');

    // ── Shipping Method ───────────────────────────────────────────────────
    // Confirmed: input[name="shipping_method"] value="flat.flat"
    this.flatRateRadio   = page.locator('input[name="shipping_method"]').first();

    // ── Payment Method ────────────────────────────────────────────────────
    // Confirmed: id="input-payment-method-cod" name="payment_method" value="cod"
    this.codRadio        = page.locator('#input-payment-method-cod');

    // ── Order Comments Textarea ───────────────────────────────────────────
    this.commentTextarea = page.locator('#input-comment');

    // ── T&C Checkbox ──────────────────────────────────────────────────────
    // Confirmed: id="input-agree" name="agree"
    this.tacCheckbox     = page.locator('#input-agree');

    // ── The ONLY Submit Button (single-page checkout) ─────────────────────
    // Confirmed: BUTTON#button-save type="submit" text="Continue"
    this.submitBtn       = page.locator('#button-save');

    // ── Alert / Warning ───────────────────────────────────────────────────
    this.alertDanger     = page.locator('.alert-danger, .alert-warning').first();

    // ── Maza Confirm Page (extra step after form submit) ──────────────────
    // Route: extension/maza/checkout/confirm
    // Products table on the confirm page
    this.confirmPageRows = page.locator('#content table tbody tr');
    // The final "Confirm Order" button — scoped to #content so we never
    // accidentally match the search form submit button in the header
    this.confirmOrderBtn = page.locator(
      '#button-confirm, #content input[type="submit"], #content button[type="submit"]'
    ).first();

    // ── Success Page ──────────────────────────────────────────────────────
    this.successHeading  = page.locator('#content h1, #content h2').first();

    // ── Header Cart Badge & Cart Link ─────────────────────────────────────
    this.headerCartBadge = page.locator('#entry_217825 .cart-item-total').first();
    this.headerCartLink  = page.locator('#entry_217825 a').first();
    this.cartDrawerEditBtn = page.locator('#cart-total-drawer a[href*="route=checkout/cart"]').first();
  }

  // ── Navigation ─────────────────────────────────────────────────────────
  async navigate() {
    await this.page.goto('index.php?route=checkout/checkout');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Ensure billing form fields are visible (even for returning users) ──
  async ensureBillingFormVisible() {
    await this.page.waitForLoadState('domcontentloaded');
    const newAddressRadio = this.page.locator('input[name="payment_address"][value="new"]');
    if (await newAddressRadio.count() > 0) {
      await newAddressRadio.check({ force: true });
      await this.page.waitForTimeout(500);
    }
  }

  // ── Fill billing address form ──────────────────────────────────────────
  // Handles two cases:
  //   1. New user  → form fields are directly visible, fill them
  //   2. Returning user → "Existing / New Address" radios appear; use existing
  async fillBillingAddress({ firstName, lastName, address1, city, postcode } = {}) {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(500);

    // Check if the "Existing Address" radio is present (returning user with saved address)
    const existingRadio = this.page.locator('input[name="payment_address"][value="existing"]');
    const existingCount = await existingRadio.count();

    if (existingCount > 0) {
      // Returning user: select existing saved address — no form fill required
      await existingRadio.check({ force: true });
      await this.page.waitForTimeout(500);
      return; // Saved address will be used for checkout
    }

    // New user: form fields are visible — fill them normally
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.firstNameInput.fill(firstName || 'Test');
    await this.lastNameInput.fill(lastName   || 'User');
    await this.address1Input.fill(address1   || '123 Test Street');
    await this.cityInput.fill(city           || 'Mumbai');
    await this.postcodeInput.fill(postcode   || '400001');

    // Select India → wait for zone AJAX to load
    await this.countrySelect.selectOption({ label: 'India' });
    await this.page.waitForTimeout(1200);

    // Guarantee zone options loaded before selecting
    await this.page.waitForFunction(() => {
      const sel = document.querySelector('#input-payment-zone');
      return sel && sel.options.length > 1;
    }, { timeout: 8000 }).catch(() => {});

    const zoneCount = await this.zoneSelect.locator('option').count();
    if (zoneCount > 1) {
      await this.zoneSelect.selectOption({ index: 1 });
    }
  }

  // ── Select flat rate shipping ──────────────────────────────────────────
  async selectShipping() {
    const vis = await this.flatRateRadio.isVisible().catch(() => false);
    if (vis) await this.flatRateRadio.check({ force: true });
  }

  // ── Select COD payment ─────────────────────────────────────────────────
  async selectPayment() {
    const vis = await this.codRadio.isVisible().catch(() => false);
    if (vis) await this.codRadio.check({ force: true });
  }

  // ── Agree to T&C ──────────────────────────────────────────────────────
  async agreeTac() {
    const vis = await this.tacCheckbox.isVisible().catch(() => false);
    if (vis) {
      await this.tacCheckbox.scrollIntoViewIfNeeded();
      await this.tacCheckbox.check({ force: true });
    }
  }

  // ── Click the submit / save button (goes to Maza confirm page) ─────────
  async submitOrder() {
    await this.submitBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.submitBtn.scrollIntoViewIfNeeded();
    await this.submitBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  // ── Handle the Maza extra confirm page ───────────────────────────────────
  // After submitting the form, Maza redirects to extension/maza/checkout/confirm
  // which shows an order summary and requires clicking "Confirm Order" to finish.
  async handleConfirmPage() {
    const url = this.page.url();
    if (!url.includes('checkout/confirm')) return; // Not on confirm page, skip
    // Click whichever confirm/submit button is visible
    await this.confirmOrderBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.confirmOrderBtn.scrollIntoViewIfNeeded();

    // Attempt clicking with a retry to ensure the checkout/success page loads
    for (let i = 0; i < 3; i++) {
      try {
        await this.confirmOrderBtn.click();
        await this.page.waitForURL(/route=checkout\/success/, { timeout: 5000 });
        return; // Success!
      } catch (e) {
        // If we timeout or fail, try again
        await this.page.waitForTimeout(1000);
      }
    }
  }

  // ── Complete full checkout: fill → select → agree → submit → confirm ────
  async completeFullCheckout(userDetails = {}) {
    await this.navigate();
    await this.fillBillingAddress(userDetails);
    await this.selectShipping();
    await this.selectPayment();
    await this.agreeTac();
    await this.submitOrder();
    await this.handleConfirmPage(); // Maza adds an extra confirm step
  }

  // ── Get header cart badge count ────────────────────────────────────────
  async getHeaderCartCount() {
    try {
      const text = await this.headerCartBadge.innerText();
      const n    = parseInt(text.trim(), 10);
      return isNaN(n) ? 0 : n;
    } catch {
      return 0;
    }
  }
}

module.exports = { CheckoutPage };
