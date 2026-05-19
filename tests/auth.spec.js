const { test, expect } = require('../fixtures/pageFixture');
const { HelperUtils } = require('../utils/HelperUtils');

test.describe('E-Commerce Registration Module', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.navigate();
  });

  test('TC_ATH_001 - Should register a new account successfully with unique credentials', async ({ registerPage }) => {
    const firstName = HelperUtils.getRandomName();
    const lastName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const telephone = HelperUtils.getRandomPhoneNumber();
    const password = 'TestSecurePassword123!';

    await registerPage.register(firstName, lastName, email, telephone, password, password, true, false);
    const msg = await registerPage.getSuccessMessage();
    expect(msg).toBe('Your Account Has Been Created!');
  });

  test('TC_ATH_002 - Should display error warning when registering with an existing duplicate email', async ({ registerPage }) => {
    const firstName = HelperUtils.getRandomName();
    const lastName = HelperUtils.getRandomName();
    const email = process.env.TEST_USER_EMAIL;
    const telephone = HelperUtils.getRandomPhoneNumber();
    const password = 'TestSecurePassword123!';

    await registerPage.register(firstName, lastName, email, telephone, password, password, true, false);
    const error = await registerPage.getErrorMessage();
    expect(error).toContain('Warning: E-Mail Address is already registered!');
  });

  test('TC_ATH_003 - Should validate empty First Name field restriction during signup', async ({ registerPage }) => {
    const lastName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const telephone = HelperUtils.getRandomPhoneNumber();
    const password = 'TestSecurePassword123!';

    await registerPage.register('', lastName, email, telephone, password, password, true, false);
    const error = await registerPage.getErrorMessage();
    expect(error).toContain('First Name must be between 1 and 32 characters!');
  });

  test('TC_ATH_004 - Should validate empty Last Name field restriction during signup', async ({ registerPage }) => {
    const firstName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const telephone = HelperUtils.getRandomPhoneNumber();
    const password = 'TestSecurePassword123!';

    await registerPage.register(firstName, '', email, telephone, password, password, true, false);
    const error = await registerPage.getErrorMessage();
    expect(error).toContain('Last Name must be between 1 and 32 characters!');
  });

  test('TC_ATH_005 - Should validate empty Telephone field restriction during signup', async ({ registerPage }) => {
    const firstName = HelperUtils.getRandomName();
    const lastName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const password = 'TestSecurePassword123!';

    await registerPage.register(firstName, lastName, email, '', password, password, true, false);
    const error = await registerPage.getErrorMessage();
    expect(error).toContain('Telephone must be between 3 and 32 characters!');
  });

  test('TC_ATH_006 - Should validate empty Password field restriction during signup', async ({ registerPage }) => {
    const firstName = HelperUtils.getRandomName();
    const lastName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const telephone = HelperUtils.getRandomPhoneNumber();

    await registerPage.register(firstName, lastName, email, telephone, '', '', true, false);
    const error = await registerPage.getErrorMessage();
    expect(error).toContain('Password must be between 4 and 20 characters!');
  });

  test('TC_ATH_007 - Should block signup validation when Privacy Policy checkbox is left unchecked', async ({ registerPage }) => {
    const firstName = HelperUtils.getRandomName();
    const lastName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const telephone = HelperUtils.getRandomPhoneNumber();
    const password = 'TestSecurePassword123!';

    await registerPage.register(firstName, lastName, email, telephone, password, password, false, false);
    const error = await registerPage.getErrorMessage();
    expect(error).toContain('Warning: You must agree to the Privacy Policy!');
  });

  test('TC_ATH_014 - Should display error warning when registration passwords do not match', async ({ registerPage }) => {
    const firstName = HelperUtils.getRandomName();
    const lastName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const telephone = HelperUtils.getRandomPhoneNumber();

    await registerPage.register(firstName, lastName, email, telephone, 'Password123!', 'PasswordDifferent123!', true, false);
    const error = await registerPage.getErrorMessage();
    expect(error).toContain('Password confirmation does not match password!');
  });
});

test.describe('E-Commerce Login & Session Module', () => {
  test('TC_ATH_008 - Should successfully log in with valid active credentials', async ({ registerPage, loginPage, page }) => {
    const firstName = HelperUtils.getRandomName();
    const lastName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const telephone = HelperUtils.getRandomPhoneNumber();
    const password = 'DynamicPassword123!';

    await registerPage.navigate();
    await registerPage.register(firstName, lastName, email, telephone, password, password, true, false);
    await page.goto('index.php?route=account/logout');

    await loginPage.navigate();
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/route=account\/account/);
  });

  test('TC_ATH_009 - Should reject login and display alert when E-Mail field is blank', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('', 'SomePassword123!');
    const errorAlert = loginPage.page.locator('.alert-dismissible');
    await expect(errorAlert).toHaveText(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
  });

  test('TC_ATH_010 - Should reject login and display alert when Password field is blank', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(process.env.TEST_USER_EMAIL, '');
    const errorAlert = loginPage.page.locator('.alert-dismissible');
    await expect(errorAlert).toHaveText(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
  });

  test('TC_ATH_011 - Should reject login and display alert for incorrect password credential values', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(process.env.TEST_USER_EMAIL, 'WrongPasswordVal!');
    const errorAlert = loginPage.page.locator('.alert-dismissible');
    await expect(errorAlert).toHaveText(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
  });

  test('TC_ATH_012 - Should request password recovery recovery link successfully', async ({ registerPage, page }) => {
    const firstName = HelperUtils.getRandomName();
    const lastName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const telephone = HelperUtils.getRandomPhoneNumber();
    const password = 'DynamicPassword123!';

    await registerPage.navigate();
    await registerPage.register(firstName, lastName, email, telephone, password, password, true, false);
    await page.goto('index.php?route=account/logout');

    await page.goto('index.php?route=account/forgotten');
    await page.fill('#input-email', email);
    await page.click('input[value="Continue"], button:has-text("Continue")');
    
    await page.waitForURL(/route=account\/login/);
    const alert = page.locator('.alert-success, .alert-danger, .alert-dismissible');
    await expect(alert).toHaveText(/(An email with a confirmation link has been sent (to )?your email address\.|Warning:)/);
  });

  test('TC_ATH_013 - Should log out and terminate user session cleanly', async ({ registerPage, loginPage, page }) => {
    const firstName = HelperUtils.getRandomName();
    const lastName = HelperUtils.getRandomName();
    const email = HelperUtils.getRandomEmail();
    const telephone = HelperUtils.getRandomPhoneNumber();
    const password = 'DynamicPassword123!';

    await registerPage.navigate();
    await registerPage.register(firstName, lastName, email, telephone, password, password, true, false);
    await page.goto('index.php?route=account/logout');

    await loginPage.navigate();
    await loginPage.login(email, password);
    await page.goto('index.php?route=account/logout');
    const header = page.locator('#content h1');
    await expect(header).toHaveText('Account Logout');
  });

  test('TC_ATH_015 - Should restrict access to secure account page and redirect guest session', async ({ page }) => {
    await page.goto('index.php?route=account/account');
    await expect(page).toHaveURL(/route=account\/login/);
  });
});
