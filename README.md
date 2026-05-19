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
*   Developed comprehensive test suite in `auth.spec.js` running 30 validation tests.
*   Implemented Dynamic User Provisioning to register unique users on-the-fly, completely bypassing sandbox lockout limits.
*   Refactored LoginPage locators to use form-isolated container boundaries (`form[action*="login"]`), resolving selector collisions.
*   Designed regex-tolerant warning alert assertions inside session scripts to handle playground typos and server rate warnings.
*   Increased page navigation and action timeouts inside Playwright configurations to 30 seconds to support network load latency.

### Day 3: [Placeholder for Next Module]
*   To be updated on Day 3 execution.

---

## Project Directory Structure

```text
CAPSTONE_PROJECT_PLAYWRIGHT/
├── fixtures/                # Extended test runner with custom POM fixtures
│   └── pageFixture.js       # Auto-injection page fixtures file
├── pages/                   # Page Object Model classes
│   ├── HomePage.js          # Locators/Actions for Homepage
│   ├── LoginPage.js         # Locators/Actions for Login page
│   └── RegisterPage.js      # Locators/Actions for Register page
├── tests/                   # Automation Test Specification files
│   └── auth.spec.js         # Authentication and session test specifications
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
