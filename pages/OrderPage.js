class OrderPage {
  constructor(page) {
    this.page = page;

    // ==================================================
    // ORDER HISTORY PAGE (route=account/order)
    // ==================================================
    // Filter / Search inputs in Order History (Maza / custom templates support)
    this.orderSearchInput = page.locator('#content input[name="search_order"], #content input[placeholder*="Order"], #content input[name="search"]').first();
    this.orderSearchBtn   = page.locator('#content button[type="button"], #content button:has-text("Search"), #content input[value="Filter"], #content button, #content a.btn').first();
    
    // Order records list elements
    this.orderRows          = page.locator('#content table tbody tr, #content div.order-list');
    this.viewOrderDetailsBtn = page.locator('a[href*="route=account/order/info"]').first();
    this.reorderBtn         = page.locator('a[href*="reorder"], a[href*="route=account/order/reorder"]').first();
    this.orderStatusCol     = page.locator('#content table tbody tr td:nth-child(4), #content table tbody tr td:has-text("Pending"), #content table tbody tr td:has-text("Processing")');

    // ==================================================
    // ORDER DETAILS PAGE (route=account/order/info)
    // ==================================================
    this.orderDetailsRows = page.locator('#content table.table-bordered tbody tr, #content table tbody tr');
    this.returnProductBtn = page.locator('a[href*="route=account/return/add"], a.btn-danger, a.text-danger').first();
    
    // Reorder button inside order info
    this.reorderIconLink  = page.locator('a[href*="reorder"]').first();
    
    // Print/View Invoice link (Printer-friendly layout)
    this.printInvoiceBtn  = page.locator('a[href*="route=account/order/invoice"], a.btn-primary[target="_blank"], a:has-text("Invoice"), a:has-text("Print")').first();
    
    // Custom Order Cancellation button (if active / supported on the theme)
    this.cancelOrderBtn   = page.locator('a:has-text("Cancel"), button:has-text("Cancel"), a[href*="cancel"]').first();

    // ==================================================
    // PRODUCT RETURN FORM PAGE (route=account/return/add)
    // ==================================================
    this.returnFirstNameInput   = page.locator('#input-firstname');
    this.returnLastNameInput    = page.locator('#input-lastname');
    this.returnEmailInput       = page.locator('#input-email');
    this.returnTelephoneInput   = page.locator('#input-telephone');
    this.returnOrderIdInput     = page.locator('#input-order-id');
    this.returnDateOrderedInput = page.locator('#input-date-ordered');
    
    this.returnProductNameInput  = page.locator('#input-product');
    this.returnProductModelInput  = page.locator('#input-model');
    this.returnQuantityInput      = page.locator('#input-quantity');
    
    // Return Reason radio buttons
    this.reasonDeadOnArrivalRadio     = page.locator('input[name="return_reason_id"][value="1"]');
    this.reasonWrongItemReceivedRadio = page.locator('input[name="return_reason_id"][value="3"]');
    this.reasonFaultyOtherRadio       = page.locator('input[name="return_reason_id"][value="4"]');
    
    // Product Opened radio buttons
    this.productOpenedYesRadio = page.locator('input[name="opened"][value="1"]');
    this.productOpenedNoRadio  = page.locator('input[name="opened"][value="0"]');
    
    this.returnCommentTextarea = page.locator('#input-comment');
    this.returnAgreeChk        = page.locator('label[for="input-agree"], input[name="agree"]');
    this.returnSubmitBtn       = page.locator('input[value="Submit"], button[type="submit"], input.btn-primary');
    
    // Return Success elements
    this.returnSuccessHeading  = page.locator('#content h1, #content h2').first();
    this.returnSuccessText     = page.locator('#content p').first();

    // ==================================================
    // RETURN HISTORY LIST PAGE (route=account/return)
    // ==================================================
    this.returnHistoryRows = page.locator('#content table tbody tr, #content div.return-list');
  }

  // ==================================================
  // ACTIONS / HELPER METHODS
  // ==================================================
  async navigateToOrderHistory() {
    await this.page.goto('index.php?route=account/order');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToReturnHistory() {
    await this.page.goto('index.php?route=account/return');
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { OrderPage };
