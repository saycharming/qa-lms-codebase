export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.cards = page.getByTestId('product-card');
    this.searchInput = page.getByTestId('search-input');
  }
  async open() {
    await this.page.goto('/');
    await this.page.getByTestId('products-page').waitFor();
  }
  async search(term) {
    await this.searchInput.fill(term);
  }
  async openProduct(name) {
    await this.cards
      .filter({ hasText: name })
      .getByTestId('product-link')
      .click();
  }
}
