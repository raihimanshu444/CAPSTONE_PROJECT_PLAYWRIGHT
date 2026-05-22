const { test, expect } = require('../fixtures/pageFixture');
const { HelperUtils } = require('../utils/HelperUtils');

test.describe.configure({ mode: 'serial' });

test.describe('Module 05 – Wishlist Lifecycle', () => {
  const password = 'TestSecurePassword123!';
  const PRODUCT_NANO = 47; // iPod Nano - In Stock, no required options

  let sharedEmail;

  test.beforeAll(async () => {
    sharedEmail = HelperUtils.getRandomEmail();
  });

  // ── Login helper ─────────────────────────────────────────────────────────
  async function loginAs(page, email, pwd) {
    await page.goto('index.php?route=account/login');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('form[action*="login"] input[name="email"]').fill(email);
    await page.locator('form[action*="login"] input[name="password"]').fill(pwd);
    await page.locator('form[action*="login"] input[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');
  }

  // ── API wishlist add ──────────────────────────────────────────────────────
  async function addToWishlistViaAPI(page, productId) {
    await page.evaluate(async (pid) => {
      await fetch(`index.php?route=account/wishlist/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: `product_id=${pid}`,
      });
    }, productId);
    await page.waitForTimeout(800);
  }

  // ─── TC_WIS_001 ──────────────────────────────────────────────────────────
  test('TC_WIS_001 - Unauthorized user is redirected to login page when trying to access wishlist', async ({ wishlistPage, page }) => {
    await wishlistPage.navigate();
    await expect(page).toHaveURL(/route=account\/login/);
  });

  // ─── TC_WIS_002 ──────────────────────────────────────────────────────────
  test('TC_WIS_002 - Logged-in user can access the wishlist page successfully', async ({ registerPage, wishlistPage, page }) => {
    await registerPage.navigate();
    await registerPage.register(
      HelperUtils.getRandomName(), HelperUtils.getRandomName(),
      sharedEmail, HelperUtils.getRandomPhoneNumber(),
      password, password, true, false
    );
    await wishlistPage.navigate();
    await expect(page).toHaveURL(/route=account\/wishlist/);
  });

  // ─── TC_WIS_003 ──────────────────────────────────────────────────────────
  test('TC_WIS_003 - Add a product to wishlist via API shows item in wishlist page', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToWishlistViaAPI(page, PRODUCT_NANO);
    await wishlistPage.navigate();
    const rowCount = await wishlistPage.getWishlistRowCount();
    expect(rowCount).toBeGreaterThanOrEqual(1);
  });

  // ─── TC_WIS_004 ──────────────────────────────────────────────────────────
  test('TC_WIS_004 - Wishlist header icon is visible and navigates to wishlist page', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await page.goto('index.php?route=common/home');
    // Verified from live HTML: wishlist icon lives in #entry_217824
    const headerWishlistIcon = page.locator('#entry_217824 a[href*="route=account/wishlist"]');
    await expect(headerWishlistIcon).toBeVisible({ timeout: 8000 });
    await headerWishlistIcon.click();
    await expect(page).toHaveURL(/route=account\/wishlist/);
  });

  // ─── TC_WIS_005 ──────────────────────────────────────────────────────────
  test('TC_WIS_005 - Added product is visible in the Wishlist review page', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToWishlistViaAPI(page, PRODUCT_NANO);
    await wishlistPage.navigate();
    await expect(wishlistPage.wishlistTable).toBeVisible({ timeout: 8000 });
    const rowCount = await wishlistPage.getWishlistRowCount();
    expect(rowCount).toBeGreaterThanOrEqual(1);
  });

  // ─── TC_WIS_006 ──────────────────────────────────────────────────────────
  test('TC_WIS_006 - Product name is visible on the Wishlist page', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToWishlistViaAPI(page, PRODUCT_NANO);
    await wishlistPage.navigate();
    await expect(wishlistPage.firstRowName).toBeVisible({ timeout: 8000 });
    const nameText = await wishlistPage.firstRowName.innerText();
    expect(nameText.length).toBeGreaterThan(0);
  });

  // ─── TC_WIS_007 ──────────────────────────────────────────────────────────
  test('TC_WIS_007 - Adding duplicate product does not create a duplicate row', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToWishlistViaAPI(page, PRODUCT_NANO);
    await addToWishlistViaAPI(page, PRODUCT_NANO);
    await wishlistPage.navigate();
    const rowCount = await wishlistPage.getWishlistRowCount();
    expect(rowCount).toBe(1);
  });

  // ─── TC_WIS_008 ──────────────────────────────────────────────────────────
  test('TC_WIS_008 - Add multiple different products to wishlist shows multiple rows', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToWishlistViaAPI(page, PRODUCT_NANO);   // product 47
    await addToWishlistViaAPI(page, 40);              // iPhone 6 - also in stock
    await wishlistPage.navigate();
    const rowCount = await wishlistPage.getWishlistRowCount();
    expect(rowCount).toBeGreaterThanOrEqual(2);
  });

  // ─── TC_WIS_009 ──────────────────────────────────────────────────────────
  test('TC_WIS_009 - Remove an item from wishlist reduces row count by 1', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToWishlistViaAPI(page, PRODUCT_NANO);
    await addToWishlistViaAPI(page, 40);
    await wishlistPage.navigate();
    const initialRows = await wishlistPage.getWishlistRowCount();
    await wishlistPage.removeFirstItem();
    const currentRows = await wishlistPage.getWishlistRowCount();
    expect(currentRows).toBe(initialRows - 1);
  });

  // ─── TC_WIS_010 ──────────────────────────────────────────────────────────
  test('TC_WIS_010 - Add to Cart button on Wishlist page does not crash', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await addToWishlistViaAPI(page, PRODUCT_NANO);
    await wishlistPage.navigate();
    await wishlistPage.addFirstItemToCart();
    // Just verify we stay on a valid page (wishlist or cart)
    await expect(page).toHaveURL(/route=account\/wishlist|route=checkout\/cart/);
  });

  // ─── TC_WIS_011 ──────────────────────────────────────────────────────────
  test('TC_WIS_011 - Cart badge shows at least 1 after adding item to cart via API', async ({ cartPage, page }) => {
    await loginAs(page, sharedEmail, password);
    // Add to cart directly via API — most reliable approach
    await page.evaluate(async () => {
      await fetch('index.php?route=checkout/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: 'product_id=47&quantity=1',
      });
    });
    await page.waitForTimeout(800);
    await page.goto('index.php?route=common/home');
    const cartCount = await cartPage.getHeaderCartCount();
    expect(cartCount).toBeGreaterThanOrEqual(1);
  });

  // ─── TC_WIS_012 ──────────────────────────────────────────────────────────
  test('TC_WIS_012 - Wishlist page is accessible from Account Dashboard sidebar', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await page.goto('index.php?route=account/account');
    await page.waitForLoadState('domcontentloaded');
    await wishlistPage.sidebarWishlistLink.waitFor({ state: 'visible', timeout: 8000 });
    await wishlistPage.sidebarWishlistLink.click();
    await expect(page).toHaveURL(/route=account\/wishlist/);
  });

  // ─── TC_WIS_013 ──────────────────────────────────────────────────────────
  test('TC_WIS_013 - Wishlist page loads correctly for a logged-in user', async ({ wishlistPage, page }) => {
    await loginAs(page, sharedEmail, password);
    await wishlistPage.navigate();
    await expect(page).toHaveURL(/route=account\/wishlist/);
    // Verify #content section renders (either table or empty state)
    await expect(page.locator('#content')).toBeVisible({ timeout: 8000 });
  });

});
