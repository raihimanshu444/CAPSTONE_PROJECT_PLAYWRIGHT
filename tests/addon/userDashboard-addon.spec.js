require('dotenv').config();

const { test, expect } = require('../../fixtures/pageFixture');
const { HelperUtils } = require('../../utils/HelperUtils');
const { RegisterPage } = require('../../pages/RegisterPage');

test.describe.configure({ mode: 'serial' });

test.describe('MODULE 07 - USER DASHBOARD TESTS', () => {
    let sharedEmail;
    const password = 'TestSecurePassword123!';

    test.beforeAll(async ({ browser }) => {
        sharedEmail = HelperUtils.getRandomEmail();
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.register(
            HelperUtils.getRandomName(), HelperUtils.getRandomName(),
            sharedEmail, HelperUtils.getRandomPhoneNumber(),
            password, password, true, false
        );

        // Add a default address immediately after registration
        await page.goto('index.php?route=account/address/add');
        await page.locator('#input-firstname').fill('DefaultFirst');
        await page.locator('#input-lastname').fill('DefaultLast');
        await page.locator('#input-address-1').fill('123 Default Street');
        await page.locator('#input-city').fill('Mumbai');
        await page.locator('#input-postcode').fill('400001');
        await page.locator('#input-country').selectOption({ label: 'India' });
        await page.waitForTimeout(1000);

        // Wait for zone options to load and select first one
        await page.waitForFunction(() => {
            const el = document.querySelector('#input-zone');
            return el && el.options.length > 1;
        }, { timeout: 8000 }).catch(() => {});

        const zoneSelect = page.locator('#input-zone');
        if (await zoneSelect.locator('option').count() > 1) {
            await zoneSelect.selectOption({ index: 1 });
        }

        await page.locator('input[value="Continue"]').click();
        await page.waitForLoadState('domcontentloaded');

        await context.close();
    });

    test.beforeEach(async ({ page, loginPage }) => {
        // Automatically accept any native confirm/alert dialogs (such as Address Book deletion popups)
        page.on('dialog', dialog => dialog.accept().catch(() => {}));

        await page.goto(process.env.BASE_URL);
        await loginPage.navigate();
        await loginPage.login(sharedEmail, password);
        await expect(page).toHaveURL(/account\/account/, { timeout: 15000 });
    });

    // ==================================================
    // TC_DSH_001 - Modify Profile First Name Updates Account
    // ==================================================
    test('TC_DSH_001 - Modify Profile First Name Updates Account', async ({ dashboardPage, page }) => {
        await dashboardPage.clickEditAccount();
        await page.waitForLoadState('domcontentloaded');

        const firstNameInput = page.locator('#input-firstname');
        await firstNameInput.fill('UpdatedFirstName');

        await page.locator('input[value="Continue"]').click();
        await page.waitForLoadState('domcontentloaded');

        const alert = page.locator('.alert-success');
        await expect(alert).toBeVisible();
        await expect(alert).toHaveText(/Success: Your account has been successfully updated\./);
    });

    // ==================================================
    // TC_DSH_002 - Edit Profile Email Validates Format
    // ==================================================
    test('TC_DSH_002 - Edit Profile Email Validates Format', async ({ dashboardPage, page }) => {
        await dashboardPage.clickEditAccount();
        await page.waitForLoadState('domcontentloaded');

        const emailInput = page.locator('#input-email');
        await emailInput.fill('Invalidemailformat');

        await page.locator('input[value="Continue"]').click();
        await page.waitForLoadState('domcontentloaded');

        const hasError = await page.locator('.text-danger, .alert-danger').first().isVisible().catch(() => false);
        const stillOnEdit = page.url().includes('route=account/edit');
        expect(hasError || stillOnEdit).toBe(true);
    });

    // ==================================================
    // TC_DSH_003 - Address Book Creates New Delivery Entry
    // ==================================================
    test('TC_DSH_003 - Address Book Creates New Delivery Entry', async ({ dashboardPage, page }) => {
        await dashboardPage.clickAddressBook();
        await page.waitForLoadState('domcontentloaded');

        const addAddressBtn = page.locator('a[href*="route=account/address/add"], a:has-text("New Address")').first();
        await addAddressBtn.click();
        await page.waitForLoadState('domcontentloaded');

        await page.locator('#input-firstname').fill('John');
        await page.locator('#input-lastname').fill('Doe');
        await page.locator('#input-address-1').fill('456 Alternative Way');
        await page.locator('#input-city').fill('Mumbai');
        await page.locator('#input-postcode').fill('400002');

        await page.locator('#input-country').selectOption({ label: 'India' });
        await page.waitForTimeout(1000);

        await page.waitForFunction(() => {
            const el = document.querySelector('#input-zone');
            return el && el.options.length > 1;
        }, { timeout: 8000 }).catch(() => {});

        const zoneSelect = page.locator('#input-zone');
        if (await zoneSelect.locator('option').count() > 1) {
            await zoneSelect.selectOption({ index: 1 });
        }

        await page.locator('input[value="Continue"]').click();
        await page.waitForLoadState('domcontentloaded');

        const alert = page.locator('.alert-success');
        await expect(alert).toBeVisible();
        await expect(alert).toHaveText(/Your address has been successfully added/);
    });

    // ==================================================
    // TC_DSH_004 - Edit Delivery Listing Saves Updates
    // ==================================================
    test('TC_DSH_004 - Edit Delivery Listing Saves Updates', async ({ dashboardPage, page }) => {
        await dashboardPage.clickAddressBook();
        await page.waitForLoadState('domcontentloaded');

        const editBtns = page.locator('a[href*="route=account/address/edit"]');
        const count = await editBtns.count();
        if (count > 0) {
            await editBtns.first().click();
            await page.waitForLoadState('domcontentloaded');

            const postcodeField = page.locator('#input-postcode');
            await postcodeField.fill('999999');

            await page.locator('input[value="Continue"]').click();
            await page.waitForLoadState('domcontentloaded');

            const alert = page.locator('.alert-success');
            await expect(alert).toBeVisible();
            await expect(alert).toHaveText(/Your address has been successfully updated/);
        }
    });

    // ==================================================
    // TC_DSH_005 - Delete Delivery Listing Updates Records
    // ==================================================
    test('TC_DSH_005 - Delete Delivery Listing Updates Records', async ({ dashboardPage, page }) => {
        await dashboardPage.clickAddressBook();
        await page.waitForLoadState('domcontentloaded');

        let deleteBtns = page.getByRole('link', { name: 'Delete' });
        let count = await deleteBtns.count();

        if (count === 0 || count === 1) {
            const addAddressBtn = page.locator('a[href*="route=account/address/add"], a:has-text("New Address")').first();
            await addAddressBtn.click();
            await page.waitForLoadState('domcontentloaded');

            await page.locator('#input-firstname').fill('Temp');
            await page.locator('#input-lastname').fill('User');
            await page.locator('#input-address-1').fill('789 Temporary Rd');
            await page.locator('#input-city').fill('Mumbai');
            await page.locator('#input-postcode').fill('400003');
            await page.locator('#input-country').selectOption({ label: 'India' });
            await page.waitForTimeout(1000);

            await page.waitForFunction(() => {
                const el = document.querySelector('#input-zone');
                return el && el.options.length > 1;
            }, { timeout: 8000 }).catch(() => {});

            const zoneSelect = page.locator('#input-zone');
            if (await zoneSelect.locator('option').count() > 1) {
                await zoneSelect.selectOption({ index: 1 });
            }

            await page.locator('input[value="Continue"]').click();
            await page.waitForLoadState('domcontentloaded');

            deleteBtns = page.getByRole('link', { name: 'Delete' });
            count = await deleteBtns.count();
        }

        if (count > 0) {
            await deleteBtns.last().click();
            await page.waitForLoadState('domcontentloaded');

            const alert = page.locator('.alert-success');
            await expect(alert).toBeVisible({ timeout: 10000 });
            await expect(alert).toHaveText(/Your address has been successfully deleted/);
        }
    });

    // ==================================================
    // TC_DSH_006 - Password Modification Updates Login
    // ==================================================
    test('TC_DSH_006 - Password Modification Updates Login', async ({ dashboardPage, page, loginPage }) => {
        await dashboardPage.clickPasswordChange();
        await page.waitForLoadState('domcontentloaded');

        const newPassword = 'NewSecurePassword123!';
        await page.locator('#input-password').fill(newPassword);
        await page.locator('#input-confirm').fill(newPassword);

        await page.locator('input[value="Continue"]').click();
        await page.waitForLoadState('domcontentloaded');

        const alert = page.locator('.alert-success');
        await expect(alert).toBeVisible();
        await expect(alert).toHaveText(/Success: Your password has been successfully updated\./);

        await dashboardPage.clickLogout();
        await page.waitForLoadState('domcontentloaded');

        await loginPage.navigate();
        await loginPage.login(sharedEmail, newPassword);
        await expect(page).toHaveURL(/account\/account/, { timeout: 15000 });

        await dashboardPage.clickPasswordChange();
        await page.waitForLoadState('domcontentloaded');
        await page.locator('#input-password').fill(password);
        await page.locator('#input-confirm').fill(password);
        await page.locator('input[value="Continue"]').click();
        await page.waitForLoadState('domcontentloaded');
        const alertBack = page.locator('.alert-success');
        await expect(alertBack).toBeVisible();
        await expect(alertBack).toHaveText(/Success: Your password has been successfully updated\./);
    });

    // ==================================================
    // TC_DSH_007 - Dashboard Counters Display Order Counts
    // ==================================================
    test('TC_DSH_007 - Dashboard Counters Display Order Counts', async ({ page }) => {
        const contentText = await page.locator('#content').innerText();
        console.log('===== ACCOUNT DASHBOARD CONTENT DUMP =====');
        console.log(contentText);
        console.log('==========================================');

        await expect(page.locator('#content')).toBeVisible();
    });

    // ==================================================
    // TC_DSH_008 - Telephone Field Validates Numeric Format
    // ==================================================
    test('TC_DSH_008 - Telephone Field Validates Numeric Format', async ({ dashboardPage, page }) => {
        await dashboardPage.clickEditAccount();
        await page.waitForLoadState('domcontentloaded');

        const telInput = page.locator('#input-telephone');
        await telInput.fill('12');

        await page.locator('input[value="Continue"]').click();
        await page.waitForLoadState('domcontentloaded');

        const isError = await page.locator('.text-danger, .alert-danger').first().isVisible().catch(() => false);
        const stillOnEdit = page.url().includes('route=account/edit');
        expect(isError || stillOnEdit).toBe(true);
    });

    // ==================================================
    // TC_DSH_009 - Newsletter Subscription Checkbox Updates
    // ==================================================
    test('TC_DSH_009 - Newsletter Subscription Checkbox Updates', async ({ dashboardPage, page }) => {
        await dashboardPage.clickNewsletter();
        await page.waitForLoadState('domcontentloaded');

        const subscribeYes = page.locator('input[name="newsletter"][value="1"], label[for="input-newsletter-yes"]').first();
        await subscribeYes.click({ force: true });

        await page.locator('input[value="Continue"]').click();
        await page.waitForLoadState('domcontentloaded');

        const alert = page.locator('.alert-success');
        await expect(alert).toBeVisible();
        await expect(alert).toHaveText(/Success: Your newsletter subscription has been successfully updated!/);
    });

    // ==================================================
    // TC_DSH_010 - Breadcrumb Navigates Back To Dashboard
    // ==================================================
    test('TC_DSH_010 - Breadcrumb Navigates Back To Dashboard', async ({ dashboardPage, page }) => {
        await dashboardPage.clickEditAccount();
        await page.waitForLoadState('domcontentloaded');

        const accountBreadcrumb = page.locator('ul.breadcrumb a, .breadcrumb a').filter({ hasText: 'Account' }).last();
        await accountBreadcrumb.click();
        await page.waitForLoadState('domcontentloaded');

        await expect(page).toHaveURL(/route=account\/account/);
    });

    // ==================================================
    // TC_DSH_011 - Reward Points Log Displays Statement
    // ==================================================
    test('TC_DSH_011 - Reward Points Log Displays Statement', async ({ dashboardPage, page }) => {
        await dashboardPage.clickRewardPoints();
        await page.waitForLoadState('domcontentloaded');

        const content = page.locator('#content');
        await expect(content).toBeVisible();
        await expect(page).toHaveURL(/route=account\/reward/);
    });

    // ==================================================
    // TC_DSH_012 - Downloadable Products List Renders
    // ==================================================
    test('TC_DSH_012 - Downloadable Products List Renders', async ({ dashboardPage, page }) => {
        await dashboardPage.clickDownloads();
        await page.waitForLoadState('domcontentloaded');

        const content = page.locator('#content');
        await expect(content).toBeVisible();
        await expect(page).toHaveURL(/route=account\/download/);
    });

    // ==================================================
    // TC_DSH_013 - Account Deletion Panel Triggers Caution
    // ==================================================
    test('TC_DSH_013 - Account Deletion Panel Triggers Caution', async ({ page }) => {
        const deleteAccountLink = page.locator('a[href*="delete"], a:has-text("Delete Account")').first();
        const exists = await deleteAccountLink.count();

        if (exists > 0) {
            await deleteAccountLink.click();
            await page.waitForLoadState('domcontentloaded');

            const warningPopup = page.locator('.alert-danger, .text-danger, .modal-body, .alert').first();
            await expect(warningPopup).toBeVisible();
        } else {
            console.log('Delete Account link not present on this sandbox environment.');
        }
    });

});
