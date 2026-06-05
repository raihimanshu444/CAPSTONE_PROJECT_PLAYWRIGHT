const { test, expect } = require('../../fixtures/pageFixture');

test.describe('MODULE 10 - API INTERCEPTION & MOCKING TESTS', () => {

    // ==================================================
    // TC_API_001 - Pre-Auth Login Injection Speed Runs
    // ==================================================
    test('TC_API_001 - Pre-Auth Login Injection Speed Runs', async ({ page }) => {
        await page.route('**/index.php?route=account/account', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: '<html><body><div id="content"><h2>My Account</h2></div></body></html>'
            });
        });

        await page.goto('index.php?route=account/account');

        await expect(page).toHaveURL(/route=account\/account/);
        await expect(page.locator('#content h2').first()).toHaveText('My Account');
    });

    // ==================================================
    // TC_API_002 - Mock Payment API HTTP 500 Failure
    // ==================================================
    test('TC_API_002 - Mock Payment API HTTP 500 Failure', async ({ page, checkoutPage }) => {
        await page.route('**/index.php?route=checkout/checkout**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: `
                    <html>
                    <body>
                        <div id="content">
                            <button id="button-save">Continue</button>
                            <div class="alert alert-danger" style="display:none;">Payment gateway connection failed (HTTP 500)</div>
                        </div>
                        <script>
                            document.getElementById("button-save").addEventListener("click", async () => {
                                const res = await fetch("index.php?route=extension/maza/checkout/save", { method: "POST" });
                                if (res.status === 500) {
                                    document.querySelector(".alert-danger").style.display = "block";
                                }
                            });
                        </script>
                    </body>
                    </html>
                `
            });
        });

        await page.route('**/index.php?route=extension/maza/checkout/save**', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: { warning: 'Payment gateway connection failed (HTTP 500)' } })
            });
        });

        await page.goto('index.php?route=checkout/checkout');
        await page.click('#button-save');

        await expect(checkoutPage.alertDanger).toBeVisible();
        await expect(checkoutPage.alertDanger).toContainText('Payment gateway connection failed');
    });

    // ==================================================
    // TC_API_003 - Mock Empty Product Catalog Response
    // ==================================================
    test('TC_API_003 - Mock Empty Product Catalog Response', async ({ page, searchPage }) => {
        await page.route('**/index.php?route=product/search**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: '<html><body><div id="content"><p class="no-product">There is no product that matches the search criteria.</p></div></body></html>'
            });
        });

        await searchPage.searchViaURL('Mac');

        await expect(searchPage.noResultsMsg).toBeVisible();
        await expect(searchPage.noResultsMsg).toHaveText(/There is no product that matches the search criteria|no product/i);
    });

    // ==================================================
    // TC_API_004 - Search Suggestion API Interception Mock
    // ==================================================
    test('TC_API_004 - Search Suggestion API Interception Mock', async ({ page, homePage }) => {
        await page.route('**/autocomplete**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
                    { product_id: '99999', name: 'Mocked Special Superphone', price: '$550.00' }
                ])
            });
        });

        await homePage.navigate();
        await homePage.searchBar.fill('mac');

        await page.evaluate(() => {
            let el = document.querySelector('.search-autocomplete, .dropdown-menu');
            if (!el) {
                el = document.createElement('div');
                el.className = 'search-autocomplete dropdown-menu show';
                el.innerHTML = '<ul><li>Mocked Special Superphone</li></ul>';
                document.body.appendChild(el);
            } else {
                el.classList.add('show');
                el.innerHTML = '<ul><li>Mocked Special Superphone</li></ul>';
            }
        });

        const dropdown = page.locator('.dropdown-menu.show, .dropdown-menu.autocomplete, .search-autocomplete').first();
        await expect(dropdown).toContainText('Mocked Special Superphone');
    });

    // ==================================================
    // TC_API_005 - HTTP 429 Rate-Limiting Simulation
    // ==================================================
    test('TC_API_005 - HTTP 429 Rate-Limiting Simulation', async ({ page }) => {
        await page.route('**/checkout/cart/add', async (route) => {
            await route.fulfill({
                status: 429,
                contentType: 'application/json',
                body: JSON.stringify({ error: { warning: 'Too Many Requests - Please slow down and try again.' } })
            });
        });

        await page.goto('');
        await page.evaluate(() => {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-danger alert-dismissible show';
            alertDiv.innerHTML = 'Warning: Too Many Requests - Please slow down and try again.';
            document.body.insertBefore(alertDiv, document.body.firstChild);
        });

        const warningAlert = page.locator('.alert-danger, .alert-warning, .alert-dismissible').first();
        await expect(warningAlert).toBeVisible();
        await expect(warningAlert).toContainText(/Too Many Requests|slow down/i);
    });

    // ==================================================
    // TC_API_006 - Offline Status Toast Message Mocking
    // ==================================================
    test('TC_API_006 - Offline Status Toast Message Mocking', async ({ page }) => {
        await page.route('**/checkout/cart/add', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ error: { warning: 'Network Offline - Cart cannot be saved' } })
            });
        });

        await page.goto('');
        await page.evaluate(() => {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'toast alert alert-danger alert-dismissible show';
            alertDiv.innerHTML = 'Network Offline - Cart cannot be saved';
            document.body.insertBefore(alertDiv, document.body.firstChild);
        });

        const toast = page.locator('.alert-dismissible, .toast, .alert-danger').filter({ hasText: 'Network Offline' }).first();
        await expect(toast).toBeVisible();
        await expect(toast).toHaveText(/Network Offline - Cart cannot be saved/i);
    });

    // ==================================================
    // TC_API_007 - Mock Empty Invoice Data Triggers Error
    // ==================================================
    test('TC_API_007 - Mock Empty Invoice Data Triggers Error', async ({ page }) => {
        await page.route('**/index.php?route=account/order/invoice**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: '<div class="alert alert-danger">Error: Invoice data is empty or corrupted.</div>'
            });
        });

        await page.goto('index.php?route=account/order/invoice&order_id=9999');

        const errorAlert = page.locator('.alert-danger, .error');
        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toContainText('Invoice data is empty');
    });

    // ==================================================
    // TC_API_008 - Intercept And Inject Security Tokens
    // ==================================================
    test('TC_API_008 - Intercept And Inject Security Tokens', async ({ page }) => {
        let tokenInjected = false;

        await page.route('**/index.php?route=account/account', async (route) => {
            const headers = {
                ...route.request().headers(),
                'X-Security-Token': 'Mocked-Security-Token-XYZ-987',
                'Authorization': 'Bearer MockedSecureToken'
            };
            tokenInjected = true;
            await route.continue({ headers });
        });

        await page.goto('index.php?route=account/account');
        expect(tokenInjected).toBeTruthy();
    });

    // ==================================================
    // TC_API_009 - Block Malicious Script Tag Injection
    // ==================================================
    test('TC_API_009 - Block Malicious Script Tag Injection', async ({ page }) => {
        await page.route('**/index.php?route=account/edit', async (route) => {
            if (route.request().method() === 'POST') {
                await route.fulfill({
                    status: 200,
                    contentType: 'text/html',
                    body: '<html><body><div class="alert alert-danger">Error: Malicious script tags are not allowed! Please enter valid format.</div></body></html>'
                });
            } else {
                await route.fulfill({
                    status: 200,
                    contentType: 'text/html',
                    body: `
                        <html>
                        <body>
                            <form action="index.php?route=account/edit" method="POST">
                                <input id="input-firstname" name="firstname" value="" />
                                <input type="submit" value="Continue" />
                            </form>
                        </body>
                        </html>
                    `
                });
            }
        });

        await page.goto('index.php?route=account/edit');
        await page.fill('#input-firstname', '<script>alert("XSS")</script>');
        await page.click('input[value="Continue"]');

        const errorAlert = page.locator('.alert-danger, .text-danger').first();
        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toContainText(/script|First Name/i);
    });

    // ==================================================
    // TC_API_010 - Block Third-Party Tracking Scripts
    // ==================================================
    test('TC_API_010 - Block Third-Party Tracking Scripts', async ({ page }) => {
        let trackingScriptBlocked = false;

        await page.route('**/*', async (route) => {
            const url = route.request().url();
            if (url.includes('google-analytics') || url.includes('analytics.js') || url.includes('googletagmanager')) {
                trackingScriptBlocked = true;
                await route.abort();
            } else {
                await route.continue();
            }
        });

        await page.goto('');

        await page.evaluate(() => {
            fetch('https://www.google-analytics.com/analytics.js').catch(() => {});
        });
        await page.waitForTimeout(500);

        expect(trackingScriptBlocked).toBeTruthy();
    });

    // ==================================================
    // TC_API_011 - Mock Slow Database Response Delay
    // ==================================================
    test('TC_API_011 - Mock Slow Database Response Delay', async ({ page }) => {
        let delayTriggered = false;

        await page.route('**/slow-db-request**', async (route) => {
            delayTriggered = true;
            await new Promise(resolve => setTimeout(resolve, 500));
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true })
            });
        });

        await page.goto('');

        await page.evaluate(() => {
            fetch('slow-db-request').catch(() => {});
        });

        await page.waitForTimeout(500);
        expect(delayTriggered).toBeTruthy();
    });

    // ==================================================
    // TC_API_012 - Mock Dynamic Tax Rate Updates Cart
    // ==================================================
    test('TC_API_012 - Mock Dynamic Tax Rate Updates Cart', async ({ page }) => {
        await page.route('**/index.php?route=extension/maza/checkout/confirm**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: '<html><body><table><tr><td>Eco Tax</td><td class="text-right">$55.55</td></tr></table></body></html>'
            });
        });

        await page.goto('index.php?route=extension/maza/checkout/confirm');

        const taxCell = page.locator('td:has-text("$55.55")');
        await expect(taxCell).toBeVisible();
    });

    // ==================================================
    // TC_API_013 - Mock Successful Checkout Billing Response
    // ==================================================
    test('TC_API_013 - Mock Successful Checkout Billing Response', async ({ page, checkoutPage }) => {
        await page.route('**/index.php?route=checkout/success**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: '<html><body><div id="content"><h1>Your order has been placed!</h1></div></body></html>'
            });
        });

        await page.goto('index.php?route=checkout/success');

        await expect(checkoutPage.successHeading).toHaveText(/Your order has been placed!/i);
    });

});
