# Enterprise E-Commerce Playwright Automation Framework

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

---

## Project Directory Structure

```text
CAPSTONE_PROJECT_PLAYWRIGHT/
├── fixtures/                # Extended test runner with custom POM fixtures
│   └── pageFixture.js       # Auto-injection page fixtures file
├── pages/                   # Page Object Model classes
│   ├── CartPage.js          # Locators/Actions for Shopping Cart page
│   ├── HomePage.js          # Locators/Actions for Homepage & Navigation
│   ├── LoginPage.js         # Locators/Actions for Login page
│   ├── RegisterPage.js      # Locators/Actions for Register page
│   └── SearchPage.js        # Locators/Actions for Search & Catalog page
├── tests/                   # Automation Test Specification files
│   ├── auth.spec.js         # Module 01 - Authentication (15 tests)
│   ├── cart.spec.js         # Module 04 - Shopping Cart Lifecycle (15 tests)
│   ├── homepage.spec.js     # Module 02 - Homepage & Navigation (15 tests)
│   └── search.spec.js       # Module 03 - Product Catalog & Search (15 tests)
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
