class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('E-Mail');
    this.telephoneInput = page.getByPlaceholder('Telephone');
    this.passwordInput = page.getByPlaceholder('Password', { exact: true });
    this.confirmPasswordInput = page.getByPlaceholder('Password Confirm');
    this.newsletterYesRadio = page.locator('label[for="input-newsletter-yes"]');
    this.privacyAgreeCheckbox = page.locator('label[for="input-agree"]');
    this.continueButton = page.locator('input[value="Continue"]');
    this.successHeader = page.locator('#content h1');
    this.errorAlert = page.locator('.alert-dismissible');
  }

  async navigate() {
    await this.page.goto('index.php?route=account/register');
  }

  async register(firstName, lastName, email, telephone, password, confirmPassword, agreeToPolicy = true, subscribeNewsletter = false) {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (email) await this.emailInput.fill(email);
    if (telephone) await this.telephoneInput.fill(telephone);
    if (password) await this.passwordInput.fill(password);
    if (confirmPassword) await this.confirmPasswordInput.fill(confirmPassword);
    
    if (subscribeNewsletter) {
      await this.newsletterYesRadio.click();
    }
    
    if (agreeToPolicy) {
      await this.privacyAgreeCheckbox.click();
    }

    await this.continueButton.click();
  }

  async getSuccessMessage() {
    return await this.successHeader.textContent();
  }

  async getErrorMessage() {
    return await this.errorAlert.textContent();
  }
}

module.exports = { RegisterPage };
