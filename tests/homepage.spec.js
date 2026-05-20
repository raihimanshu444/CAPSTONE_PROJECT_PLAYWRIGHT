const { test, expect } = require('../fixtures/pageFixture');

const BASE_URL = process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/';

test.describe('Module 02 - Homepage & Navigation', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('TC_NAV_001 - Homepage header logo should be visible', async ({ homePage }) => {
    await expect(homePage.logo).toBeVisible();
  });

  test('TC_NAV_002 - Search bar and search button should be visible in header', async ({ homePage }) => {
    await expect(homePage.searchBar).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();
  });

  test('TC_NAV_003 - My Account button should be visible in navigation', async ({ homePage }) => {
    await expect(homePage.myAccountBtn).toBeVisible();
  });

  test('TC_NAV_004 - Hero banner carousel should be visible on homepage', async ({ homePage }) => {
    await expect(homePage.heroBanner).toBeVisible();
  });

  test('TC_NAV_005 - My Account dropdown should navigate to Login page', async ({ homePage, page }) => {
    await homePage.goToLogin();
    await expect(page).toHaveURL(/route=account\/login/);
  });

  test('TC_NAV_006 - My Account dropdown should navigate to Register page', async ({ homePage, page }) => {
    await homePage.goToRegister();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('TC_NAV_007 - Special offers nav link should be visible and navigate correctly', async ({ homePage, page }) => {
    await expect(homePage.specialOffersLink).toBeVisible();
    await homePage.specialOffersLink.click();
    await expect(page).toHaveURL(/route=product\/special/);
  });

  test('TC_NAV_008 - Blog nav link should be visible and navigate correctly', async ({ homePage, page }) => {
    await expect(homePage.blogLink).toBeVisible();
    await homePage.blogLink.click();
    await expect(page).toHaveURL(/route=extension\/maza\/blog/);
  });

  test('TC_NAV_009 - Mega Menu nav link should be visible and navigate correctly', async ({ homePage, page }) => {
    await expect(homePage.megaMenuLink).toBeVisible();
    await homePage.megaMenuLink.click();
    await expect(page).toHaveURL(/information_id=4/);
  });

  test('TC_NAV_010 - Shop by Category drawer should open on click', async ({ homePage }) => {
    await homePage.openShopByCategory();
    await expect(homePage.categoryDrawer).toBeVisible();
  });

  test('TC_NAV_011 - Shop by Category should navigate to a category page', async ({ homePage, page }) => {
    await homePage.clickCategory('Cameras');
    await expect(page).toHaveURL(/route=product\/category/);
  });

  test('TC_NAV_012 - Cart button should open the cart drawer', async ({ homePage }) => {
    await homePage.openCart();
    await expect(homePage.cartDrawer).toBeVisible();
  });

  test('TC_NAV_013 - Compare header link should be visible', async ({ homePage }) => {
    await expect(homePage.compareLink).toBeVisible();
  });

  test('TC_NAV_014 - Wishlist header link should be visible', async ({ homePage }) => {
    await expect(homePage.wishlistLink).toBeVisible();
  });

  test('TC_NAV_015 - Clicking the logo should return to homepage', async ({ homePage, page }) => {
    await page.goto('index.php?route=account/login');
    await expect(page).toHaveURL(/route=account\/login/);
    await homePage.logoLink.click();
    await expect(page).not.toHaveURL(/route=account\/login/);
  });
});