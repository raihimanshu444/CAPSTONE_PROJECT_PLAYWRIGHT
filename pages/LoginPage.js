class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('form[action*="login"] input[name="email"]');
    this.passwordInput = page.locator('form[action*="login"] input[name="password"]');
    this.loginButton = page.locator('form[action*="login"] input[type="submit"]');
  }

  async navigate() {
    await this.page.goto('index.php?route=account/login');
  }

  async login(email, password) {
    if (email !== undefined) await this.emailInput.fill(email);
    if (password !== undefined) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
