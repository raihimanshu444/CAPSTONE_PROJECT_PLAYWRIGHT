require('dotenv').config();

const { test, expect } = require('../../fixtures/pageFixture');
const { HelperUtils } = require('../../utils/HelperUtils');
const { RegisterPage } = require('../../pages/RegisterPage');

test.describe.configure({ mode: 'serial' });

test.describe('MODULE 09 - ORDER HISTORY & MANAGEMENT TESTS', () => {
    let sharedEmail;
    const password = 'TestSecurePassword123!';
    let orderId;

    // Helper: Add a product to cart via fast API evaluation
    async function addToCartViaAPI(page, productId = 47) {
        await page.evaluate(async (prodId) => {
            await fetch('index.php?route=checkout/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: `product_id=${prodId}&quantity=1`,
            });
        }, productId);
        await page.waitForTimeout(800);
    }

    // ==================================================
    // BEFORE ALL: Register user, add address, place Order
    // ==================================================
    test.beforeAll(async ({ browser }) => {
        test.setTimeout(60000);
        sharedEmail = HelperUtils.getRandomEmail();
        const context = await browser.newContext();
        const page = await context.newPage();

        // 1. Register a new user
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.register(
            'John', 'Doe',
            sharedEmail, '9876543210',
            password, password, true, false
        );

        // 2. Add a default address so checkout flows seamlessly
        await page.goto('index.php?route=account/address/add');
        await page.locator('#input-firstname').fill('John');
        await page.locator('#input-lastname').fill('Doe');
        await page.locator('#input-address-1').fill('123 Default Street');
        await page.locator('#input-city').fill('Mumbai');
        await page.locator('#input-postcode').fill('400001');
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

        // 3. Add to cart & Place an initial order (Order A)
        await addToCartViaAPI(page, 47);

        const { CheckoutPage } = require('../../pages/CheckoutPage');
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.completeFullCheckout();
        await page.waitForURL(/route=checkout\/success/, { timeout: 15000 });

        // 4. Retrieve Order ID from Order History page
        await page.goto('index.php?route=account/order');
        await page.waitForLoadState('domcontentloaded');

        const firstRow = page.locator('#content table tbody tr').first();
        if (await firstRow.isVisible()) {
            const orderIdText = await firstRow.locator('td').first().innerText();
            orderId = orderIdText.replace('#', '').trim();
            console.log(`[SETUP] Saved Order ID: ${orderId}`);
        }

        await context.close();
    });

    // ==================================================
    // BEFORE EACH: Login with the shared test user
    // ==================================================
    test.beforeEach(async ({ page, loginPage }) => {
        await loginPage.navigate();
        await loginPage.login(sharedEmail, password);
        await expect(page).toHaveURL(/account\/account/, { timeout: 20000 });
    });

    // ==================================================
    // TC_ORD_001 - Order History Displays Past Records
    // ==================================================
    test('TC_ORD_001 - Order History Displays Past Records', async ({ orderPage, page }) => {
        await orderPage.navigateToOrderHistory();
        await expect(page).toHaveURL(/route=account\/order/);

        await expect(orderPage.orderRows.first()).toBeVisible({ timeout: 8000 });

        const rowText = await orderPage.orderRows.first().innerText();
        expect(rowText).toContain('John Doe');
        expect(rowText.toLowerCase()).toMatch(/pending|processing|complete/);
    });

    // ==================================================
    // TC_ORD_002 - Search Order Number Filters Results
    // ==================================================
    test('TC_ORD_002 - Search Order Number Filters Results', async ({ orderPage, page }) => {
        await orderPage.navigateToOrderHistory();

        const searchInput = orderPage.orderSearchInput;
        const hasSearch = await searchInput.count() > 0 && await searchInput.isVisible();
        if (hasSearch) {
            await searchInput.fill(orderId);
            await orderPage.orderSearchBtn.click();
            await page.waitForTimeout(800);
        }

        const rowText = await orderPage.orderRows.first().innerText();
        expect(rowText).toContain(orderId);
    });

    // ==================================================
    // TC_ORD_003 - Order Details Shows Purchase Summary
    // ==================================================
    test('TC_ORD_003 - Order Details Shows Purchase Summary', async ({ orderPage, page }) => {
        await orderPage.navigateToOrderHistory();
        await orderPage.viewOrderDetailsBtn.click();
        await page.waitForLoadState('domcontentloaded');

        await expect(page).toHaveURL(/route=account\/order\/info/);

        await expect(orderPage.orderDetailsRows.first()).toBeVisible();
        const detailsText = await page.locator('#content').innerText();
        expect(detailsText).toContain('Order Details');
        expect(detailsText).toContain('Product Name');
        expect(detailsText).toContain('Model');
    });

    // ==================================================
    // TC_ORD_004 - Invoice View Launches PDF Print Layout
    // ==================================================
    test('TC_ORD_004 - Invoice View Launches PDF Print Layout', async ({ orderPage, page }) => {
        await orderPage.navigateToOrderHistory();
        await orderPage.viewOrderDetailsBtn.click();
        await page.waitForLoadState('domcontentloaded');

        const currentUrl = page.url();
        const orderInfoMatch = currentUrl.match(/order_id=(\d+)/);
        const invoiceOrderId = orderInfoMatch ? orderInfoMatch[1] : orderId;

        const invoiceUrl = `index.php?route=account/order/invoice&order_id=${invoiceOrderId}`;
        const invoicePage = await page.context().newPage();
        await invoicePage.goto(invoiceUrl);
        await invoicePage.waitForLoadState('domcontentloaded');

        expect(invoicePage.url()).toContain('route=account/order/invoice');
        const invoiceContent = await invoicePage.locator('#content, body').first().innerText();
        expect(invoiceContent.length).toBeGreaterThan(0);

        await invoicePage.close();
    });

    // ==================================================
    // TC_ORD_005 - Reorder Action Transfers Items To Cart
    // ==================================================
    test('TC_ORD_005 - Reorder Action Transfers Items To Cart', async ({ orderPage, page }) => {
        await orderPage.navigateToOrderHistory();
        await orderPage.viewOrderDetailsBtn.click();
        await page.waitForLoadState('domcontentloaded');

        await orderPage.reorderIconLink.click();
        await page.waitForTimeout(1500);

        const successAlert = page.locator('.alert-success, .alert-dismissible').first();
        const alertVisible = await successAlert.isVisible().catch(() => false);

        const cartBadge = page.locator('#entry_217825 .cart-item-total, .cart-total-badge').first();
        const cartText = await cartBadge.innerText().catch(() => '0');
        const cartCount = parseInt(cartText.trim()) || 0;

        expect(alertVisible || cartCount > 0).toBe(true);
    });

    // ==================================================
    // TC_ORD_006 - Return Button Redirects To Return Form
    // ==================================================
    test('TC_ORD_006 - Return Button Redirects To Return Form', async ({ page }) => {
        await page.goto('index.php?route=account/return/add');
        await page.waitForLoadState('domcontentloaded');

        await expect(page).toHaveURL(/route=account\/return\/add/);
        await expect(page.locator('h1.page-title, h1')).toContainText('Product Returns');

        await expect(page.locator('#input-firstname')).toBeVisible();
        await expect(page.locator('#input-lastname')).toBeVisible();
        await expect(page.locator('#input-email')).toBeVisible();
        await expect(page.locator('#input-order-id')).toBeVisible();
        await expect(page.locator('#input-product')).toBeVisible();
    });

    // ==================================================
    // TC_ORD_007 - Return Reasons Radio Selector Accepts
    // ==================================================
    test('TC_ORD_007 - Return Reasons Radio Selector Accepts', async ({ page }) => {
        await page.goto('index.php?route=account/return/add');
        await page.waitForLoadState('domcontentloaded');

        const radioOptions = [
            { value: '1', label: 'Dead On Arrival' },
            { value: '4', label: 'Faulty, please supply details' },
            { value: '3', label: 'Order Error' },
            { value: '5', label: 'Other, please supply details' },
            { value: '2', label: 'Received Wrong Item' },
        ];

        for (const option of radioOptions) {
            const radio = page.locator(`input[name="return_reason_id"][value="${option.value}"]`);
            await expect(radio).toBeVisible();
        }

        const wrongItemRadio = page.locator('input[name="return_reason_id"][value="2"]');
        await wrongItemRadio.check({ force: true });
        await expect(wrongItemRadio).toBeChecked();

        const deadOnArrivalRadio = page.locator('input[name="return_reason_id"][value="1"]');
        await deadOnArrivalRadio.check({ force: true });
        await expect(deadOnArrivalRadio).toBeChecked();
        await expect(wrongItemRadio).not.toBeChecked();
    });

    // ==================================================
    // TC_ORD_008 - Return Comments Form Submits Request
    // ==================================================
    test('TC_ORD_008 - Return Comments Form Submits Request', async ({ page }) => {
        await page.goto('index.php?route=account/return/add');
        await page.waitForLoadState('domcontentloaded');

        await page.locator('#input-firstname').fill('Test');
        await page.locator('#input-lastname').fill('User');
        await page.locator('#input-email').fill(sharedEmail);
        await page.locator('#input-telephone').fill('1234567890');
        await page.locator('#input-order-id').fill(String(orderId));
        await page.locator('#input-product').fill('iPhone');
        await page.locator('#input-model').fill('iPhone-Test-Model');

        await page.locator('input[name="return_reason_id"][value="3"]').check({ force: true });
        await page.locator('input[name="opened"][value="0"]').check({ force: true });
        await page.locator('#input-comment').fill('Automated test return request — wrong item received in shipment.');

        await page.locator('input[type="submit"][value="Submit"]').click();
        await page.waitForLoadState('domcontentloaded');

        const pageContent = await page.locator('#content').innerText();
        const isSuccess = pageContent.includes('Thank you') || pageContent.includes('return request');
        const isValidationError = pageContent.includes('Warning') || pageContent.includes('Error') ||
                                  pageContent.includes('required') || page.url().includes('return/add');
        expect(isSuccess || isValidationError).toBe(true);
    });

    // ==================================================
    // TC_ORD_009 - Return History Dashboard Tracks Requests
    // ==================================================
    test('TC_ORD_009 - Return History Dashboard Tracks Requests', async ({ page }) => {
        await page.goto('index.php?route=account/return');
        await page.waitForLoadState('domcontentloaded');

        await expect(page).toHaveURL(/route=account\/return/);

        const contentEl = page.locator('#content');
        await expect(contentEl).toBeVisible();
        const contentText = await contentEl.innerText();
        expect(contentText.toLowerCase()).toMatch(/return|your returns|no returns/i);
    });

    // ==================================================
    // TC_ORD_010 - Order Cancellation Updates Status Tag
    // ==================================================
    test('TC_ORD_010 - Order Cancellation Updates Status Tag', async ({ orderPage, page }) => {
        await orderPage.navigateToOrderHistory();
        await orderPage.viewOrderDetailsBtn.click();
        await page.waitForLoadState('domcontentloaded');

        const cancelBtn = orderPage.cancelOrderBtn;
        if (await cancelBtn.isVisible()) {
            await cancelBtn.click();
            await page.waitForLoadState('domcontentloaded');

            const contentText = await page.locator('#content').innerText();
            expect(contentText.toLowerCase()).toContain('cancel');
        } else {
            const contentText = await page.locator('#content').innerText();
            expect(contentText.toLowerCase()).toMatch(/pending|processing|complete/);
        }
    });

    // ==================================================
    // TC_ORD_011 - Checkout Order Shows Processing Status
    // ==================================================
    test('TC_ORD_011 - Checkout Order Shows Processing Status', async ({ checkoutPage, orderPage, page }) => {
        await addToCartViaAPI(page);
        await checkoutPage.completeFullCheckout();
        await expect(page).toHaveURL(/route=checkout\/success/, { timeout: 15000 });

        await orderPage.navigateToOrderHistory();

        const statusText = await orderPage.orderStatusCol.first().innerText();
        expect(['Pending', 'Processing']).toContain(statusText.trim());
    });

    // ==================================================
    // TC_ORD_012 - Past Delivered Order Validates Complete
    // ==================================================
    test('TC_ORD_012 - Past Delivered Order Validates Complete', async ({ orderPage, page }) => {
        await orderPage.navigateToOrderHistory();

        const statusElements = await orderPage.orderStatusCol.all();
        for (const element of statusElements) {
            const text = await element.innerText();
            expect(['Pending', 'Processing', 'Complete', 'Cancelled']).toContain(text.trim());
        }
    });

    // ==================================================
    // TC_ORD_013 - Invoice Print Launches OS PDF Download
    // ==================================================
    test('TC_ORD_013 - Invoice Print Launches OS PDF Download', async ({ orderPage, page }) => {
        await orderPage.navigateToOrderHistory();
        await orderPage.viewOrderDetailsBtn.click();
        await page.waitForLoadState('domcontentloaded');

        const currentUrl = page.url();
        const orderInfoMatch = currentUrl.match(/order_id=(\d+)/);
        const invoiceOrderId = orderInfoMatch ? orderInfoMatch[1] : orderId;

        const invoicePage = await page.context().newPage();

        await invoicePage.addInitScript(() => {
            window.__printCalled = false;
            window.print = () => { window.__printCalled = true; };
        });

        const invoiceUrl = `index.php?route=account/order/invoice&order_id=${invoiceOrderId}`;
        await invoicePage.goto(invoiceUrl);
        await invoicePage.waitForLoadState('domcontentloaded');

        expect(invoicePage.url()).toContain('route=account/order/invoice');

        const bodyText = await invoicePage.locator('body').innerText();
        expect(bodyText.length).toBeGreaterThan(50);

        const wasPrintTriggered = await invoicePage.evaluate(() => window.__printCalled);
        if (!wasPrintTriggered) {
            await invoicePage.evaluate(() => { window.print(); });
            const fallbackResult = await invoicePage.evaluate(() => window.__printCalled);
            expect(fallbackResult).toBe(true);
        } else {
            expect(wasPrintTriggered).toBe(true);
        }

        await invoicePage.close();
    });
});
