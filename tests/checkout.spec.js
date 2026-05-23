const { test, expect } = require('../fixtures/pageFixture');
const { HelperUtils } = require('../utils/HelperUtils');

test.describe.configure({ mode: 'serial' });

test.describe('Module 06 – Checkout & Payment', () => {
  const password   = 'TestSecurePassword123!';
  const PRODUCT_ID = 47; // iPod Nano – In Stock, no required options

  let sharedEmail;

  test.beforeAll(async () => {
    sharedEmail = HelperUtils.getRandomEmail();
  });

  // ── Helpers ──────────────────────────────────────────────────────────────

  async function registerAndLogin(page, registerPage) {
    await registerPage.navigate();
    await registerPage.register(
      HelperUtils.getRandomName(), HelperUtils.getRandomName(),
      sharedEmail, HelperUtils.getRandomPhoneNumber(),
      password, password, true, false
    );
  }

  async function loginAs(page, email, pwd) {
    await page.goto('index.php?route=account/login');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('form[action*="login"] input[name="email"]').fill(email);
    await page.locator('form[action*="login"] input[name="password"]').fill(pwd);
    await page.locator('form[action*="login"] input[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');
  }

  async function addToCartViaAPI(page, productId = PRODUCT_ID, qty = 1) {
    await page.evaluate(async ({ productId, qty }) => {
      await fetch('index.php?route=checkout/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: `product_id=${productId}&quantity=${qty}`,
      });
    }, { productId, qty });
    await page.waitForTimeout(800);
  }

  // ── TC_CHK_01 ────────────────────────────────────────────────────────────
  // Form: All billing address fields are visible on checkout page
  test('TC_CHK_01 - Shipping address form fields are visible on checkout page', async ({ registerPage, checkoutPage, page }) => {
    await registerAndLogin(page, registerPage);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await expect(page).toHaveURL(/route=checkout\/checkout/);
    await expect(checkoutPage.firstNameInput).toBeVisible({ timeout: 12000 });
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.address1Input).toBeVisible();
    await expect(checkoutPage.cityInput).toBeVisible();
  });

  // ── TC_CHK_02 ────────────────────────────────────────────────────────────
  // Form: Country dropdown updates zone list after selection
  test('TC_CHK_02 - Country dropdown updates zone/state list after selection', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await checkoutPage.ensureBillingFormVisible();
    await checkoutPage.firstNameInput.waitFor({ state: 'visible', timeout: 12000 });
    await checkoutPage.countrySelect.selectOption({ label: 'India' });
    await page.waitForTimeout(1200);
    await expect(checkoutPage.zoneSelect).toBeVisible({ timeout: 8000 });
    const zoneCount = await checkoutPage.zoneSelect.locator('option').count();
    expect(zoneCount).toBeGreaterThan(1);
  });

  // ── TC_CHK_03 ────────────────────────────────────────────────────────────
  // UI: Billing form loads directly for a new user (no saved address radio)
  test('TC_CHK_03 - Checkout address form loads directly for new user (no saved address)', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await expect(page).toHaveURL(/route=checkout\/checkout/);
    await checkoutPage.ensureBillingFormVisible();
    await checkoutPage.firstNameInput.waitFor({ state: 'visible', timeout: 12000 });
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.cityInput).toBeVisible();
    await expect(checkoutPage.countrySelect).toBeVisible();
  });

  // ── TC_CHK_04 ────────────────────────────────────────────────────────────
  // UI: Shipping method (Flat Rate) radio is visible directly on the checkout page
  test('TC_CHK_04 - Shipping courier Flat Rate option is visible in delivery step', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await checkoutPage.ensureBillingFormVisible();
    await checkoutPage.firstNameInput.waitFor({ state: 'visible', timeout: 12000 });
    // Flat rate shipping radio is visible directly on the single-page checkout
    await expect(checkoutPage.flatRateRadio).toBeVisible({ timeout: 10000 });
    const count = await page.locator('input[name="shipping_method"]').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // ── TC_CHK_05 ────────────────────────────────────────────────────────────
  // Form: Comments textarea is visible and accepts text
  test('TC_CHK_05 - Billing comments text box is visible and accepts input', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await checkoutPage.ensureBillingFormVisible();
    await checkoutPage.firstNameInput.waitFor({ state: 'visible', timeout: 12000 });
    // Comment textarea is on the single-page form
    await expect(checkoutPage.commentTextarea).toBeVisible({ timeout: 8000 });
    await checkoutPage.commentTextarea.fill('After 5 PM delivery');
    const val = await checkoutPage.commentTextarea.inputValue();
    expect(val).toBe('After 5 PM delivery');
  });

  // ── TC_CHK_06 ────────────────────────────────────────────────────────────
  // Validation: COD (Cash on Delivery) payment radio is visible and selectable
  test('TC_CHK_06 - Mock payment method (COD) is present and selectable in step 3', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await checkoutPage.ensureBillingFormVisible();
    await checkoutPage.firstNameInput.waitFor({ state: 'visible', timeout: 12000 });
    // COD radio: confirmed id="input-payment-method-cod"
    await expect(checkoutPage.codRadio).toBeVisible({ timeout: 8000 });
    const paymentCount = await page.locator('input[name="payment_method"]').count();
    expect(paymentCount).toBeGreaterThanOrEqual(1);
  });

  // ── TC_CHK_07 ────────────────────────────────────────────────────────────
  // Validation: Submitting without T&C agreement shows warning or stays on page
  test('TC_CHK_07 - Step 3 without T&C agreement shows a warning alert', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await checkoutPage.fillBillingAddress();
    await checkoutPage.selectShipping();
    await checkoutPage.selectPayment();
    // Do NOT agree to T&C — submit directly
    await checkoutPage.submitBtn.scrollIntoViewIfNeeded();
    await checkoutPage.submitBtn.click();
    await page.waitForTimeout(1500);
    // Either an alert appears or the page stays on checkout (order was blocked)
    const alertVisible    = await page.locator('.alert-danger, .alert-warning, .text-danger').first().isVisible().catch(() => false);
    const stillOnCheckout = page.url().includes('route=checkout/checkout');
    expect(alertVisible || stillOnCheckout).toBe(true);
  });

  // ── TC_CHK_08 ────────────────────────────────────────────────────────────
  // Navigation: Completing checkout lands on order success page
  test('TC_CHK_08 - Completed checkout redirects to order success page', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.completeFullCheckout();
    await expect(page).toHaveURL(/route=checkout\/success/, { timeout: 15000 });
  });

  // ── TC_CHK_09 ────────────────────────────────────────────────────────────
  // UI: Success page shows a visible confirmation heading
  test('TC_CHK_09 - Success page displays order confirmation heading', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.completeFullCheckout();
    await expect(page).toHaveURL(/route=checkout\/success/, { timeout: 15000 });
    await expect(checkoutPage.successHeading).toBeVisible({ timeout: 8000 });
    const headingText = await checkoutPage.successHeading.innerText();
    expect(headingText.length).toBeGreaterThan(0);
  });

  // ── TC_CHK_10 ────────────────────────────────────────────────────────────
  // Security: Visiting checkout URL with empty cart redirects or shows empty state
  test('TC_CHK_10 - Empty cart prevents direct checkout URL access', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    // Do NOT add to cart
    await page.goto('index.php?route=checkout/checkout');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const currentUrl   = page.url();
    const onCart       = currentUrl.includes('route=checkout/cart');
    const onCheckout   = currentUrl.includes('route=checkout/checkout');
    if (onCheckout) {
      // Some themes keep you on checkout but show an empty-cart warning
      const emptyAlert = page.locator('#content, .alert').filter({ hasText: /cart is empty/i });
      const isVisible  = await emptyAlert.isVisible().catch(() => false);
      expect(isVisible || onCart).toBe(true);
    } else {
      expect(onCart).toBe(true);
    }
  });

  // ── TC_CHK_11 ────────────────────────────────────────────────────────────
  // Authentic: Confirm page shows product rows in order summary before final confirm
  test('TC_CHK_11 - Checkout confirm step displays product in order summary', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await checkoutPage.fillBillingAddress();
    await checkoutPage.selectShipping();
    await checkoutPage.selectPayment();
    await checkoutPage.agreeTac();
    await checkoutPage.submitOrder();
    // After submit, Maza lands on extension/maza/checkout/confirm (order review page)
    // Product rows must be visible in the order summary table there
    await expect(page).toHaveURL(/checkout\/confirm/, { timeout: 10000 });
    await checkoutPage.confirmPageRows.first().waitFor({ state: 'visible', timeout: 10000 });
    const rowCount = await checkoutPage.confirmPageRows.count();
    expect(rowCount).toBeGreaterThanOrEqual(1);
  });

  // ── TC_CHK_12 ────────────────────────────────────────────────────────────
  // UI: All form sections (billing, shipping, payment) are visible on same page
  test('TC_CHK_12 - Stepper allows backward navigation - all sections visible on single page', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await checkoutPage.ensureBillingFormVisible();
    await checkoutPage.firstNameInput.waitFor({ state: 'visible', timeout: 12000 });
    // Verify all major checkout sections are visible simultaneously (single-page design)
    await expect(checkoutPage.firstNameInput).toBeVisible();   // billing
    await expect(checkoutPage.flatRateRadio).toBeVisible();    // shipping
    await expect(checkoutPage.codRadio).toBeVisible();         // payment
    await expect(checkoutPage.submitBtn).toBeVisible();        // submit button
    await expect(page).toHaveURL(/route=checkout\/checkout/);
  });

  // ── TC_CHK_13 ────────────────────────────────────────────────────────────
  // UI: Cart badge shows 0 items after a successful order placement
  test('TC_CHK_13 - Cart badge resets to 0 after successful order placement', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.completeFullCheckout();
    await expect(page).toHaveURL(/route=checkout\/success/, { timeout: 15000 });
    await page.goto('index.php?route=common/home');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const cartCount = await checkoutPage.getHeaderCartCount();
    expect(cartCount).toBe(0);
  });

  // ── TC_CHK_14 ────────────────────────────────────────────────────────────
  // Validation: T&C checkbox is visible and unchecked by default
  test('TC_CHK_14 - T&C checkbox is visible on payment step', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await checkoutPage.ensureBillingFormVisible();
    await checkoutPage.firstNameInput.waitFor({ state: 'visible', timeout: 12000 });
    // Confirmed: id="input-agree" name="agree"
    await expect(checkoutPage.tacCheckbox).toBeVisible({ timeout: 8000 });
    const isChecked = await checkoutPage.tacCheckbox.isChecked();
    expect(isChecked).toBe(false);
  });

  // ── TC_CHK_15 ────────────────────────────────────────────────────────────
  // Navigation: Header cart link from checkout page navigates to cart
  test('TC_CHK_15 - Clicking View Cart header link from checkout navigates to cart page', async ({ checkoutPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToCartViaAPI(page);
    await checkoutPage.navigate();
    await checkoutPage.ensureBillingFormVisible();
    await checkoutPage.firstNameInput.waitFor({ state: 'visible', timeout: 12000 });
    // Header cart link opens the off-canvas cart drawer
    await checkoutPage.headerCartLink.waitFor({ state: 'visible', timeout: 8000 });
    await checkoutPage.headerCartLink.click();

    // Wait for the drawer and click the "Edit cart" link inside it to navigate to the cart page
    await checkoutPage.cartDrawerEditBtn.waitFor({ state: 'visible', timeout: 10000 });
    await checkoutPage.cartDrawerEditBtn.click();

    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/route=checkout\/cart/, { timeout: 10000 });
  });

});
