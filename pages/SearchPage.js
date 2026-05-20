class SearchPage {
  constructor(page) {
    this.page = page;

    this.productGrid = page.locator('.content-products');
    this.productCards = page.locator('.content-products .product-layout, .content-products .product-thumb');

    this.noResultsMsg = page.locator('#content p, .content-products p').filter({ hasText: 'no product' }).first();

    this.refineSearchInput = page.locator('#product-search input[name="search"]');
    this.refineCategorySelect = page.locator('#product-search select[name="category_id"]');
    this.refineSubcategoryCheckbox = page.locator('#product-search input[name="sub_category"]');
    this.refineDescriptionCheckbox = page.locator('#product-search input[name="description"]');
    this.refineSearchButton = page.locator('#button-search');

    this.sortDropdown = page.locator('.content-sort-by select').first();
    this.limitDropdown = page.locator('.content-limit select').first();

    this.gridViewBtn = page.locator('#grid-view').first();
    this.listViewBtn = page.locator('#list-view').first();

    this.productNames = page.locator('.content-products .product-layout h4 a, .content-products .product-thumb h4 a');
    this.productPrices = page.locator('.content-products .price-new, .content-products .price');
  }

  async navigate() {
    await this.page.goto('index.php?route=product/search');
  }

  async searchViaURL(keyword) {
    await this.page.goto(`index.php?route=product/search&search=${encodeURIComponent(keyword)}`);
  }

  async getProductCount() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
    return await this.productCards.count();
  }

  async refineSearch(keyword, categoryId, checkSubcategory, checkDescription) {
    if (keyword !== undefined) {
      await this.refineSearchInput.fill(keyword);
    }
    if (categoryId) {
      await this.refineCategorySelect.selectOption(categoryId);
    }
    if (checkSubcategory) {
      const checked = await this.refineSubcategoryCheckbox.isChecked();
      if (!checked) await this.refineSubcategoryCheckbox.check();
    }
    if (checkDescription) {
      const checked = await this.refineDescriptionCheckbox.isChecked();
      if (!checked) await this.refineDescriptionCheckbox.check();
    }
    await this.refineSearchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectSortOption(label) {
    await this.sortDropdown.selectOption({ label });
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(500);
  }

  async selectLimitOption(label) {
    await this.limitDropdown.selectOption({ label });
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(500);
  }

  async getAllProductNames() {
    const names = await this.productNames.allTextContents();
    return names.map(n => n.trim());
  }

  async getAllProductPrices() {
    const texts = await this.productPrices.allTextContents();
    return texts.map(t => {
      const match = t.replace(/\s+/g, ' ').match(/\$([\d,]+\.?\d*)/);
      return match ? parseFloat(match[1].replace(',', '')) : 0;
    });
  }
}

module.exports = { SearchPage };
