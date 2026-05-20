const { test, expect } = require('../fixtures/pageFixture');

test.describe('Module 03 - Product Catalog & Search', () => {

  test('TC_SCH_001 - Searching an exact product name should return results', async ({ searchPage }) => {
    await searchPage.searchViaURL('HTC Touch HD');
    const count = await searchPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('TC_SCH_002 - Searching a partial keyword should return multiple results', async ({ searchPage }) => {
    await searchPage.searchViaURL('Mac');
    const count = await searchPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('TC_SCH_003 - Searching a non-existent keyword should return zero results', async ({ searchPage }) => {
    await searchPage.searchViaURL('xyznonexistent999');
    const count = await searchPage.getProductCount();
    expect(count).toBe(0);
  });

  test('TC_SCH_004 - Navigating to search URL directly should load the search page', async ({ searchPage, page }) => {
    await searchPage.navigate();
    await expect(page).toHaveURL(/route=product\/search/);
  });

  test('TC_SCH_005 - Searching for iPod should display matching products on results page', async ({ searchPage }) => {
    await searchPage.searchViaURL('iPod');
    const count = await searchPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('TC_SCH_006 - Search results page URL should contain route=product/search', async ({ searchPage, page }) => {
    await searchPage.searchViaURL('Canon');
    await expect(page).toHaveURL(/route=product\/search/);
  });

  test('TC_SCH_007 - Searching special characters should return no results', async ({ searchPage }) => {
    await searchPage.searchViaURL('@#$%');
    const count = await searchPage.getProductCount();
    expect(count).toBe(0);
  });

  test('TC_SCH_008 - Search should be case insensitive and return same count', async ({ searchPage }) => {
    await searchPage.searchViaURL('iphone');
    const countLower = await searchPage.getProductCount();

    await searchPage.searchViaURL('IPHONE');
    const countUpper = await searchPage.getProductCount();

    expect(countLower).toBe(countUpper);
  });

  test('TC_SCH_009 - Sort dropdown should be visible when results exist', async ({ searchPage }) => {
    await searchPage.searchViaURL('Mac');
    await expect(searchPage.sortDropdown).toBeVisible();
  });

  test('TC_SCH_010 - Refine search button should be visible on the search page', async ({ searchPage }) => {
    await searchPage.navigate();
    await expect(searchPage.refineSearchButton).toBeVisible();
  });

  test('TC_SCH_011 - Grid view button should be visible on results page', async ({ searchPage }) => {
    await searchPage.searchViaURL('Mac');
    await expect(searchPage.gridViewBtn).toBeVisible();
  });

  test('TC_SCH_012 - List view button should be visible on results page', async ({ searchPage }) => {
    await searchPage.searchViaURL('Mac');
    await expect(searchPage.listViewBtn).toBeVisible();
  });

  test('TC_SCH_013 - Clicking list view button should switch layout to list', async ({ searchPage }) => {
    await searchPage.searchViaURL('Mac');
    await searchPage.listViewBtn.click();
    await expect(searchPage.listViewBtn).toHaveClass(/active/);
  });

  test('TC_SCH_014 - Clicking grid view button should switch layout to grid', async ({ searchPage }) => {
    await searchPage.searchViaURL('Mac');
    await searchPage.listViewBtn.click();
    await searchPage.gridViewBtn.click();
    await expect(searchPage.gridViewBtn).toHaveClass(/active/);
  });

  test('TC_SCH_015 - Product names should be visible in search results', async ({ searchPage }) => {
    await searchPage.searchViaURL('Mac');
    const names = await searchPage.getAllProductNames();
    expect(names.length).toBeGreaterThanOrEqual(1);
    expect(names[0]).not.toBe('');
  });
});
