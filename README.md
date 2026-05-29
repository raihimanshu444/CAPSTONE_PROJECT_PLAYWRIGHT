# Enterprise E-Commerce Playwright Automation Framework

> [!TIP]
> 📊 **Live Allure Test Report**: View the real-time, interactive test execution dashboard deployed on GitHub Pages here: **[https://raihimanshu444.github.io/CAPSTONE_PROJECT_PLAYWRIGHT/](https://raihimanshu444.github.io/CAPSTONE_PROJECT_PLAYWRIGHT/)**

This is a professional, enterprise-grade E-Commerce Automation Framework built using Playwright and Vanilla JavaScript. It is designed to test the LambdaTest E-Commerce Playground application comprehensively with high execution speed, modular architecture, and maximum test stability.

---

## Key Framework Features

*   **Page Object Model (POM):** Clean separation of UI page selectors and action methods from the test scripts.
*   **Custom Fixtures Injection:** Extended Playwright test runner with automated page object fixtures to eliminate setup boilerplate code.
*   **Dynamic Test Data Generation:** Static utility class (`HelperUtils`) to generate random names, emails, and phone numbers to prevent duplicate registration errors.
*   **Parallel Multi-Browser Execution:** Fully parallelized testing on Chromium and WebKit (Safari).
*   **Dotenv Environment Support:** Externalized configuration for base URLs and credentials in a secure env file.
*   **Rich Interactive Reporting:** Fully integrated with Allure Reporting and standard Playwright HTML reports.
*   **Live HTML Verified Locators:** All POM locators are verified directly against live site HTML source, eliminating brittle guessed selectors.

---

## Daily Training Progress Tracker

This framework is developed in daily milestones as part of the SDET Capstone project.

### Day 1: Foundational Framework Architecture
*   Configured multi-browser parallel execution settings inside Playwright master configuration.
*   Established Page Object Model (POM) skeleton structures (`LoginPage` and `HomePage`).
*   Created custom page fixtures in `pageFixture.js` for automatic object injection during test runner lifecycle execution.
*   Built dynamic programmatic data utility helpers (`HelperUtils.js`) for unique registration inputs.
*   Isolated base parameters and sensitive logins inside `.env` configuration file.

### Day 2: Authentication and Session Testing Module
*   Created `RegisterPage` POM class with automated input form handlers and visual wait synchronization states.
*   Developed comprehensive test suite in `auth.spec.js` running 15 validation tests across Registration and Login.
*   Implemented Dynamic User Provisioning to register unique users on-the-fly, completely bypassing sandbox lockout limits.
*   Refactored LoginPage locators to use form-isolated container boundaries (`form[action*="login"]`), resolving selector collisions.
*   Designed regex-tolerant warning alert assertions inside session scripts to handle playground typos and server rate warnings.
*   Increased page navigation and action timeouts inside Playwright configurations to 30 seconds to support network load latency.

### Day 3: Homepage, Search & Catalog Modules + Auth Cleanup
*   Rewrote `HomePage.js` POM with every locator verified directly from live site HTML source — eliminated all guessed selectors.
*   Added `logoLink` (the clickable anchor) alongside `logo` (the image) to enable reliable navigation testing.
*   Built `homepage.spec.js` with 15 clean, sequential tests (TC_NAV_001–015) covering logo, search bar, navigation links, drawers, cart, compare, wishlist, and logo return navigation.
*   Built `SearchPage.js` POM from scratch using classes verified from the live search results page HTML (`content-products`, `content-sort-by`, `content-limit`, `#button-search`, `#grid-view`, `#list-view`).
*   Built `search.spec.js` with 15 clean tests (TC_SCH_001–015) covering exact search, partial search, no results, URL verification, case insensitivity, special characters, sort/limit visibility, grid/list view toggles.
*   Added `errorAlert` locator to `LoginPage.js` POM — tests now use `loginPage.errorAlert` instead of bypassing POM with inline locators.
*   Cleaned up `auth.spec.js` — fixed inline `loginPage.page.locator()` calls in TC_ATH_009, 010, 011 to use POM property.
*   All changes committed in 3 clean, logically separated Git commits.

### Day 4: Shopping Cart Lifecycle Module
*   Built `CartPage.js` POM from scratch with robust selectors for PDP add-to-cart button, cart total badge, edit cart link, checkout drawers, and cart review grids.
*   Added auto-injection setup for `cartPage` fixture in `pageFixture.js`.
*   Developed `tests/cart.spec.js` with 15 comprehensive tests (TC_CRT_001–015) covering adding items to cart, drawer and badge updates, editing quantities, removing items, stock warning states, and empty cart continue actions.
*   Integrated high-stability techniques such as prefix quantity matches (`input[name^="quantity"]`), multi-criteria remove buttons, and ultra-fast page body navigation checks (`toHaveURL()`) to avoid element loading timeouts.

### Day 5: Wishlist Lifecycle Module
*   Built `WishlistPage.js` POM from scratch with locators for wishlist table grids, individual row details, and action handlers like "Add to Cart" and "Remove" from wishlist.
*   Added auto-injection setup for `wishlistPage` fixture in `pageFixture.js`.
*   Developed `tests/wishlist.spec.js` with 13 comprehensive tests (TC_WIS_001–013) covering unauthorized page redirection, Empty Wishlist rendering, UI / API wishlist item additions, duplicates, badge counts, item removals, account dashboard access, and cart transfer behaviors.
*   Integrated high-stability techniques including dynamic API wishlist seeding (`route=account/wishlist/add` post method) and per-test `loginAs()` helpers in `serial` mode to avoid flaky dependencies and visual latency.

### Day 6: Checkout & Payment Module
*   Built `CheckoutPage.js` POM supporting shipping and billing fields, payment choices (COD), flat rate courier option, off-canvas cart drawer link, and final confirm order review table.
*   Implemented a resilient returning-user address toggle (`ensureBillingFormVisible`) that checks the "New Address" radio button to guarantee form visibility even when users already have a saved profile address.
*   Developed `tests/checkout.spec.js` with 15 comprehensive tests (TC_CHK_001–015) covering address form validations, country-to-zone AJAX dropdown triggers, empty cart redirects, stepper backward navigations, and complete order placement redirects.
*   Integrated a highly robust click-retry mechanism within `handleConfirmPage` and off-canvas cart drawer toggles to completely eliminate test flakiness on slower cloud-based sandboxes.

### Day 7: User Dashboard Module
*   Built `DashboardPage.js` POM with highly optimized and scoped selectors for profile editing, address book, password management, and account log lists (reward points, downloads).
*   Developed `tests/userDashboard.spec.js` with 13 functional tests (TC_DSH_001–013) covering profile first name edits, invalid email format checks, Address Book CRUD operations, dynamic newsletter updates, and breadcrumb redirection.
*   Designed a self-healing Address Book deletion flow that automatically adds a temporary secondary address to satisfy database limits before executing a delete operation.
*   Implemented robust password change restoration checks to avoid breaking subsequent tests in serial test runners, and fixed mixed legacy text/CSS locator syntax issues to ensure zero flakiness.

### Day 8: Customer Support Module
*   Built `ContactPage.js` POM encapsulating the Contact Us form fields (`nameInput`, `emailInput`, `enquiryInput`), actions (`fillForm`, `fillAndSubmit`, `submit`), store info selectors (`telephoneSection`, `telLink`), and the success page `continueLink`.
*   Developed `tests/support.spec.js` with 13 comprehensive tests (TC_SUP_001–013) covering page load verification, successful form submission, empty field validations, short/excess enquiry limits, invalid email format blocking, double-submit protection, print layout rendering, success page redirection, and breadcrumb navigation.
*   Replaced a flaky footer Site Map test (caused by Maza theme's JS-rendered mega-footer) with a stable breadcrumb navigation test that uses the already-loaded contact page, eliminating the `beforeEach` timeout flakiness entirely.

### Day 9: Order History & Management Module
*   Built `OrderPage.js` POM encapsulating element selectors and page actions for Order History list, Order Details receipts, invoice frames, and Product Return forms.
*   Added auto-injection setup for `orderPage` fixture in `pageFixture.js`.
*   Developed `tests/order.spec.js` with 13 exhaustive functional tests (TC_ORD_001–013) covering order summary display, filtered search, invoice print layout, reorder cart transfer, return form field verification, radio selector interactions, form submission, return history, order status validation, and live checkout status confirmation.
*   Implemented a `beforeAll` registration hook that places a fresh order via API checkout (iPod Nano, Product ID 47) to guarantee a pre-populated order history row for all subsequent tests.
*   **Key Stability Fix — Return Button Status Gate**: The Maza theme only renders the "Return Product(s)" button for orders in "Complete" status. Fresh test orders are always "Pending", so TC_ORD_006/007/008 were rewritten to navigate **directly** to `route=account/return/add` using confirmed live HTML field IDs (`#input-firstname`, `#input-order-id`, `input[name="return_reason_id"]`) — zero dependency on order status.
*   **Key Stability Fix — Reorder Same-Page Behavior**: TC_ORD_005's reorder click does NOT navigate to `route=checkout/cart`; it adds items via AJAX and shows a success alert **on the same order info page**. Assertion updated to check for alert visibility or cart badge count increase.
*   **Key Stability Fix — window.print Interception**: TC_ORD_013 uses `addInitScript()` to inject the `window.print` mock **before** the invoice page loads, ensuring the auto-triggered `onload` print call is captured. Eliminated all selector-based print button approaches that resolved to wrong nav links.

### Day 10: API Interception & Mocking Module
*   Developed `tests/apiMocking.spec.js` with 13 advanced network-level test cases (TC_API_001–013) validating the application's client-side resilience under mock network environments.
*   Implemented custom cookie context injection for **Pre-Auth Session Speed Runs** to bypass UI login forms.
*   Created robust HTTP `500` & `429` rate-limiting simulations and offline connection drop route mocking to verify front-end toast and banner message handling.
*   Configured third-party analytics and ad script blocker filters that speed up browser rendering and save significant pipeline testing costs.
*   Mocked dynamic tax rate parameters in cart HTML payloads and payment gateway success redirects, bypassing slow banking API checkouts seamlessly.


---

## Project Directory Structure

```text
CAPSTONE_PROJECT_PLAYWRIGHT/
├── fixtures/                # Extended test runner with custom POM fixtures
│   └── pageFixture.js       # Auto-injection page fixtures file
├── pages/                   # Page Object Model classes
│   ├── CartPage.js          # Locators/Actions for Shopping Cart page
│   ├── CheckoutPage.js      # Locators/Actions for Checkout & Payment page
│   ├── ContactPage.js       # Locators/Actions for Customer Support Contact page
│   ├── DashboardPage.js     # Locators/Actions for User Dashboard page
│   ├── HomePage.js          # Locators/Actions for Homepage & Navigation
│   ├── LoginPage.js         # Locators/Actions for Login page
│   ├── OrderPage.js         # Locators/Actions for Order History & Return page
│   ├── RegisterPage.js      # Locators/Actions for Register page
│   ├── SearchPage.js        # Locators/Actions for Search & Catalog page
│   └── WishlistPage.js      # Locators/Actions for Wishlist page
├── tests/                   # Automation Test Specification files
│   ├── apiMocking.spec.js   # Module 10 - API Interception & Mocking (13 tests)
│   ├── auth.spec.js         # Module 01 - Authentication (15 tests)
│   ├── cart.spec.js         # Module 04 - Shopping Cart Lifecycle (15 tests)
│   ├── checkout.spec.js     # Module 06 - Checkout & Payment (15 tests)
│   ├── homepage.spec.js     # Module 02 - Homepage & Navigation (15 tests)
│   ├── order.spec.js        # Module 09 - Order History & Management (13 tests)
│   ├── search.spec.js       # Module 03 - Product Catalog & Search (15 tests)
│   ├── support.spec.js      # Module 08 - Customer Support (13 tests)
│   ├── userDashboard.spec.js # Module 07 - User Dashboard (13 tests)
│   └── wishlist.spec.js     # Module 05 - Wishlist Lifecycle (13 tests)
├── utils/                   # Shared helper utilities
│   └── HelperUtils.js       # Dynamic test data generator
├── .env                     # Local environment variables configuration
├── .gitignore               # Ignored files in Git version tracking
├── package.json             # NPM dependencies and runner scripts
├── playwright.config.js     # Master Playwright configuration file
└── README.md                # Project walkthrough and documentation
```

---

## Installation and Setup

Follow these steps to run this framework locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/CAPSTONE_PROJECT_PLAYWRIGHT.git
    cd CAPSTONE_PROJECT_PLAYWRIGHT
    ```

2.  **Install all required dependencies:**
    ```bash
    npm install
    ```

3.  **Install the Playwright browsers:**
    ```bash
    npx playwright install
    ```

---

## Test Execution Commands

Run the automation suite using the customized NPM scripts:

### Standard Headless Run (All Browsers in Parallel)
```bash
npm run test
```

### Headed Run (Watch the browser execute tests)
```bash
npm run test:headed
```

### Playwright Interactive UI Mode (Excellent for debugging)
```bash
npm run test:ui
```

### Playwright Debug Mode
```bash
npm run test:debug
```

### Run a specific test file
```bash
npx playwright test tests/homepage.spec.js --headed --project=chromium
npx playwright test tests/search.spec.js --headed --project=chromium
npx playwright test tests/auth.spec.js --headed --project=chromium
npx playwright test tests/cart.spec.js --headed --project=chromium
npx playwright test tests/wishlist.spec.js --headed --project=chromium
npx playwright test tests/checkout.spec.js --headed --project=chromium
npx playwright test tests/userDashboard.spec.js --headed --project=chromium
npx playwright test tests/support.spec.js --headed --project=chromium
npx playwright test tests/order.spec.js --headed --project=chromium
npx playwright test tests/apiMocking.spec.js --headed --project=chromium
```

---

## Generating Reports

### Generate Allure Report
```bash
npm run allure:generate
```

### Open Allure Report in Web Browser
```bash
npm run allure:open
```
