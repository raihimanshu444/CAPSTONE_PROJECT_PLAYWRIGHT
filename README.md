# Enterprise E-Commerce Playwright Automation Framework

This is a professional, enterprise-grade E-Commerce Automation Framework built using Playwright and Vanilla JavaScript. It is designed to test the LambdaTest E-Commerce Playground application comprehensively with high execution speed, modular architecture, and zero test flakiness.

## 🚀 Key Framework Features

- **Page Object Model (POM):** Clean separation of UI page selectors and action methods from the test scripts.
- **Custom Fixtures Injection:** Extended Playwright test runner with automated page object fixtures to eliminate setup boilerplate code.
- **Dynamic Test Data Generation:** Static utility class (`HelperUtils`) to generate random names, emails, and phone numbers to prevent duplicate registration errors.
- **Parallel Multi-Browser Execution:** Fully parallelized testing on Chromium, Firefox, and WebKit (Safari).
- **Dotenv Environment Support:** Externalized configuration for base URLs and credentials in a secure `.env` file.
- **Rich Interactive Reporting:** Fully integrated with Allure Reporting and standard Playwright HTML reports.

---

## 📂 Project Directory Structure

```text
CAPSTONE_PROJECT_PLAYWRIGHT/
├── .github/                 # CI/CD Workflows
├── fixtures/                # Extended test runner with custom POM fixtures
│   └── pageFixture.js       # Auto-injection page fixtures file
├── pages/                   # Page Object Model classes
│   ├── HomePage.js          # Locators/Actions for Homepage
│   └── LoginPage.js         # Locators/Actions for Login page
├── tests/                   # Automation Test Specification files
├── utils/                   # Shared helper utilities
│   └── HelperUtils.js       # Dynamic test data generator
├── .env                     # Local environment variables configuration
├── .gitignore               # Ignored files in Git version tracking
├── package.json             # NPM dependencies and runner scripts
└── playwright.config.js     # Master Playwright configuration file
```

---

## 🛠️ Installation & Setup

Follow these steps to run this framework locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/CAPSTONE_PROJECT_PLAYWRIGHT.git
   cd CAPSTONE_PROJECT_PLAYWRIGHT
   ```

2. **Install all required dependencies:**
   ```bash
   npm install
   ```

3. **Install the Playwright browsers:**
   ```bash
   npx playwright install
   ```

---

## 💻 Test Execution Commands

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

## 📊 Generating Reports

### Generate Allure Report
```bash
npm run allure:generate
```

### Open Allure Report in Web Browser
```bash
npm run allure:open
```
