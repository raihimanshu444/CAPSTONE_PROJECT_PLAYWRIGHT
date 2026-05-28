class ContactPage {

    constructor(page) {
        this.page = page;

        // ==================================================
        // FORM INPUTS (verified from codegen output)
        // ==================================================

        this.nameInput    = page.getByRole('textbox', { name: 'Your Name*' });
        this.emailInput   = page.getByRole('textbox', { name: 'E-Mail Address*' });
        this.enquiryInput = page.getByRole('textbox', { name: 'Enquiry*' });

        // ==================================================
        // FORM ACTIONS
        // ==================================================

        this.submitBtn    = page.getByRole('button', { name: 'Submit' });
        this.continueLink = page.getByRole('link', { name: 'Continue' });

        // ==================================================
        // ALERTS & MESSAGES
        // ==================================================

        this.alertDanger  = page.locator('.alert-danger, .text-danger').first();
        this.alertSuccess = page.locator('.alert-success').first();

        // ==================================================
        // PAGE CONTENT & STORE INFO
        // ==================================================

        // The main content heading on the Contact Us page
        this.pageHeading  = page.locator('#content h1, #content h2').first();

        // Store map / contact details section
        this.storeDetails = page.locator('#content .col-sm-3, #content address, #content .panel').first();

        // Telephone display — confirmed from codegen as text "Telephone 123456789"
        this.telephoneSection = page.locator('#content').getByText('Telephone', { exact: false });

        // The actual clickable tel: anchor (for dialer test)
        this.telLink = page.locator('a[href^="tel:"]').first();
    }

    // ==================================================
    // ACTION METHODS
    // ==================================================

    async navigate() {
        await this.page.goto('index.php?route=information/contact');
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Fill the contact form.
     * Pass null to skip filling a particular field (leaves it as-is).
     * Pass '' (empty string) to explicitly clear a field.
     */
    async fillForm({ name = '', email = '', enquiry = '' } = {}) {
        if (name !== null)    await this.nameInput.fill(name);
        if (email !== null)   await this.emailInput.fill(email);
        if (enquiry !== null) await this.enquiryInput.fill(enquiry);
    }

    async submit() {
        await this.submitBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Helper: fill + submit in one call
    async fillAndSubmit({ name = '', email = '', enquiry = '' } = {}) {
        await this.fillForm({ name, email, enquiry });
        await this.submit();
    }
}

module.exports = { ContactPage };
