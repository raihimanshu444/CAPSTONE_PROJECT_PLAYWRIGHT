class HomePage {
  
  constructor(page) {
    this.page = page;
    this.searchBar = page.getByPlaceholder('Search For Products');
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async navigate() {
    await this.page.goto('');
  }

  async searchProduct(productName) {
    await this.searchBar.fill(productName);
    await this.searchButton.click();
  }
}

module.exports = { HomePage };
