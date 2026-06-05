# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: addon/userDashboard-addon.spec.js >> MODULE 07 - USER DASHBOARD TESTS >> TC_DSH_004 - Edit Delivery Listing Saves Updates
- Location: tests/addon/userDashboard-addon.spec.js:139:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.alert-success')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.alert-success')

```

```yaml
- text: "Notice: Undefined index: country_id in /var/www/html/storage/modification/catalog/controller/account/address.php on line 464Notice: Undefined index: country_id in /var/www/html/storage/modification/catalog/controller/account/address.php on line 470"
- heading "Top categories close" [level=5]:
  - text: Top categories
  - link "close":
    - /url: "#mz-component-1626147655"
    - text: 
- navigation:
  - list:
    - listitem:
      - link "Components":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
        - img
        - text: Components
    - listitem:
      - link "Cameras":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
        - img
        - text: Cameras
    - listitem:
      - link "Phone, Tablets & Ipod":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
        - img
        - text: Phone, Tablets & Ipod
    - listitem:
      - link "Software":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
        - img
        - text: Software
    - listitem:
      - link "MP3 Players":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
        - img
        - text: MP3 Players
    - listitem:
      - link "Laptops & Notebooks":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
        - img
        - text: Laptops & Notebooks
    - listitem:
      - link "Desktops and Monitors":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=28
        - img
        - text: Desktops and Monitors
    - listitem:
      - link "Printers & Scanners":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=30
        - img
        - text: Printers & Scanners
    - listitem:
      - link "Mice and Trackballs":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=29
        - img
        - text: Mice and Trackballs
    - listitem:
      - link "Fashion and Accessories":
        - /url: ""
        - img
        - text: Fashion and Accessories
    - listitem:
      - link "Beauty and Saloon":
        - /url: ""
        - img
        - text: Beauty and Saloon
    - listitem:
      - link "Autoparts and Accessories":
        - /url: ""
        - img
        - text: Autoparts and Accessories
    - listitem:
      - link "Washing machine":
        - /url: ""
        - img
        - text: Washing machine
    - listitem:
      - link "Gaming consoles":
        - /url: ""
        - img
        - text: Gaming consoles
    - listitem:
      - link "Air conditioner":
        - /url: ""
        - img
        - text: Air conditioner
    - listitem:
      - link "Web Cameras":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=32
        - img
        - text: Web Cameras
- heading "Quick Links close" [level=5]:
  - text: Quick Links
  - link "close":
    - /url: "#mz-component-162614767"
    - text: 
- navigation:
  - list:
    - listitem:
      - link " Special Hot":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
    - listitem:
      - link " Wishlist":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
    - listitem:
      - link " Compare":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
    - listitem:
      - link " My account":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
    - listitem:
      - link " Blog":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
    - listitem:
      - link " Tracking":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
    - listitem:
      - link " Contact us":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
- separator
- paragraph: Place here any module, widget, design or HTML. for example menu, categories
- heading "Cart close" [level=5]:
  - text: Cart
  - link "close":
    - /url: "#cart-total-drawer"
    - text: 
- paragraph: Your shopping cart is empty!
- table:
  - rowgroup:
    - 'row "Sub-Total: $0.00"':
      - cell "Sub-Total:"
      - cell "$0.00":
        - strong: $0.00
    - 'row "Total: $0.00"':
      - cell "Total:"
      - cell "$0.00":
        - strong: $0.00
- button " Edit cart"
- button " Checkout"
- banner:
  - button ""
  - figure:
    - link "Poco Electro":
      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
      - img "Poco Electro"
  - button "All Categories"
  - textbox "Search For Products"
  - button "Search"
  - link "Compare":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
    - img
  - link "Wishlist":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
    - img
  - button "0":
    - img
    - text: "0"
  - button "Shop by Category":
    - img
    - text: Shop by Category
  - navigation:
    - list:
      - listitem:
        - link "Home":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
      - listitem:
        - link "Special Hot":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
      - listitem:
        - link "Blog":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
      - listitem:
        - button "Mega Menu"
      - listitem:
        - button "AddOns Featured"
      - listitem:
        - button " My account"
  - paragraph:
    - strong: This is a dummy website for Web Automation Testing
- navigation "breadcrumb":
  - list:
    - listitem:
      - link "":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
    - listitem:
      - text: /
      - link "Account":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
    - listitem:
      - text: /
      - link "Address Book":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/address
    - listitem: / Edit Address
- heading "Edit Address" [level=1]
- group:
  - text: First Name*
  - textbox "First Name*":
    - /placeholder: First Name
    - text: DefaultFirst
  - text: Last Name*
  - textbox "Last Name*":
    - /placeholder: Last Name
    - text: DefaultLast
  - text: Company
  - textbox "Company"
  - text: Address 1*
  - textbox "Address 1*":
    - /placeholder: Address 1
    - text: 123 Default Street
  - text: Address 2
  - textbox "Address 2"
  - text: City*
  - textbox "City*":
    - /placeholder: City
    - text: Mumbai
  - text: Post Code*
  - textbox "Post Code*":
    - /placeholder: Post Code
    - text: "999999"
  - text: Country*
  - combobox "Country*":
    - option "--- Please Select ---"
    - option "Aaland Islands"
    - option "Afghanistan"
    - option "Albania"
    - option "Algeria"
    - option "American Samoa"
    - option "Andorra"
    - option "Angola"
    - option "Anguilla"
    - option "Antarctica"
    - option "Antigua and Barbuda"
    - option "Argentina"
    - option "Armenia"
    - option "Aruba"
    - option "Ascension Island (British)"
    - option "Australia"
    - option "Austria"
    - option "Azerbaijan"
    - option "Bahamas"
    - option "Bahrain"
    - option "Bangladesh"
    - option "Barbados"
    - option "Belarus"
    - option "Belgium"
    - option "Belize"
    - option "Benin"
    - option "Bermuda"
    - option "Bhutan"
    - option "Bolivia"
    - option "Bonaire, Sint Eustatius and Saba"
    - option "Bosnia and Herzegovina"
    - option "Botswana"
    - option "Bouvet Island"
    - option "Brazil"
    - option "British Indian Ocean Territory"
    - option "Brunei Darussalam"
    - option "Bulgaria"
    - option "Burkina Faso"
    - option "Burundi"
    - option "Cambodia"
    - option "Cameroon"
    - option "Canada"
    - option "Canary Islands"
    - option "Cape Verde"
    - option "Cayman Islands"
    - option "Central African Republic"
    - option "Chad"
    - option "Chile"
    - option "China"
    - option "Christmas Island"
    - option "Cocos (Keeling) Islands"
    - option "Colombia"
    - option "Comoros"
    - option "Congo"
    - option "Cook Islands"
    - option "Costa Rica"
    - option "Cote D'Ivoire"
    - option "Croatia"
    - option "Cuba"
    - option "Curacao"
    - option "Cyprus"
    - option "Czech Republic"
    - option "Democratic Republic of Congo"
    - option "Denmark"
    - option "Djibouti"
    - option "Dominica"
    - option "Dominican Republic"
    - option "East Timor"
    - option "Ecuador"
    - option "Egypt"
    - option "El Salvador"
    - option "Equatorial Guinea"
    - option "Eritrea"
    - option "Estonia"
    - option "Ethiopia"
    - option "Falkland Islands (Malvinas)"
    - option "Faroe Islands"
    - option "Fiji"
    - option "Finland"
    - option "France, Metropolitan"
    - option "French Guiana"
    - option "French Polynesia"
    - option "French Southern Territories"
    - option "FYROM"
    - option "Gabon"
    - option "Gambia"
    - option "Georgia"
    - option "Germany"
    - option "Ghana"
    - option "Gibraltar"
    - option "Greece"
    - option "Greenland"
    - option "Grenada"
    - option "Guadeloupe"
    - option "Guam"
    - option "Guatemala"
    - option "Guernsey"
    - option "Guinea"
    - option "Guinea-Bissau"
    - option "Guyana"
    - option "Haiti"
    - option "Heard and Mc Donald Islands"
    - option "Honduras"
    - option "Hong Kong"
    - option "Hungary"
    - option "Iceland"
    - option "India"
    - option "Indonesia"
    - option "Iran (Islamic Republic of)"
    - option "Iraq"
    - option "Ireland"
    - option "Isle of Man"
    - option "Israel"
    - option "Italy"
    - option "Jamaica"
    - option "Japan"
    - option "Jersey"
    - option "Jordan"
    - option "Kazakhstan"
    - option "Kenya"
    - option "Kiribati"
    - option "Kosovo, Republic of"
    - option "Kuwait"
    - option "Kyrgyzstan"
    - option "Lao People's Democratic Republic"
    - option "Latvia"
    - option "Lebanon"
    - option "Lesotho"
    - option "Liberia"
    - option "Libyan Arab Jamahiriya"
    - option "Liechtenstein"
    - option "Lithuania"
    - option "Luxembourg"
    - option "Macau"
    - option "Madagascar"
    - option "Malawi"
    - option "Malaysia"
    - option "Maldives"
    - option "Mali"
    - option "Malta"
    - option "Marshall Islands"
    - option "Martinique"
    - option "Mauritania"
    - option "Mauritius"
    - option "Mayotte"
    - option "Mexico"
    - option "Micronesia, Federated States of"
    - option "Moldova, Republic of"
    - option "Monaco"
    - option "Mongolia"
    - option "Montenegro"
    - option "Montserrat"
    - option "Morocco"
    - option "Mozambique"
    - option "Myanmar"
    - option "Namibia"
    - option "Nauru"
    - option "Nepal"
    - option "Netherlands"
    - option "Netherlands Antilles"
    - option "New Caledonia"
    - option "New Zealand"
    - option "Nicaragua"
    - option "Niger"
    - option "Nigeria"
    - option "Niue"
    - option "Norfolk Island"
    - option "North Korea"
    - option "Northern Mariana Islands"
    - option "Norway"
    - option "Oman"
    - option "Pakistan"
    - option "Palau"
    - option "Palestinian Territory, Occupied"
    - option "Panama"
    - option "Papua New Guinea"
    - option "Paraguay"
    - option "Peru"
    - option "Philippines"
    - option "Pitcairn"
    - option "Poland"
    - option "Portugal"
    - option "Puerto Rico"
    - option "Qatar"
    - option "Reunion"
    - option "Romania"
    - option "Russian Federation"
    - option "Rwanda"
    - option "Saint Kitts and Nevis"
    - option "Saint Lucia"
    - option "Saint Vincent and the Grenadines"
    - option "Samoa"
    - option "San Marino"
    - option "Sao Tome and Principe"
    - option "Saudi Arabia"
    - option "Senegal"
    - option "Serbia"
    - option "Seychelles"
    - option "Sierra Leone"
    - option "Singapore"
    - option "Slovak Republic"
    - option "Slovenia"
    - option "Solomon Islands"
    - option "Somalia"
    - option "South Africa"
    - option "South Georgia & South Sandwich Islands"
    - option "South Korea"
    - option "South Sudan"
    - option "Spain"
    - option "Sri Lanka"
    - option "St. Barthelemy"
    - option "St. Helena"
    - option "St. Martin (French part)"
    - option "St. Pierre and Miquelon"
    - option "Sudan"
    - option "Suriname"
    - option "Svalbard and Jan Mayen Islands"
    - option "Swaziland"
    - option "Sweden"
    - option "Switzerland"
    - option "Syrian Arab Republic"
    - option "Taiwan"
    - option "Tajikistan"
    - option "Tanzania, United Republic of"
    - option "Thailand"
    - option "Togo"
    - option "Tokelau"
    - option "Tonga"
    - option "Trinidad and Tobago"
    - option "Tristan da Cunha"
    - option "Tunisia"
    - option "Turkey"
    - option "Turkmenistan"
    - option "Turks and Caicos Islands"
    - option "Tuvalu"
    - option "Uganda"
    - option "Ukraine"
    - option "United Arab Emirates"
    - option "United Kingdom" [selected]
    - option "United States"
    - option "United States Minor Outlying Islands"
    - option "Uruguay"
    - option "Uzbekistan"
    - option "Vanuatu"
    - option "Vatican City State (Holy See)"
    - option "Venezuela"
    - option "Viet Nam"
    - option "Virgin Islands (British)"
    - option "Virgin Islands (U.S.)"
    - option "Wallis and Futuna Islands"
    - option "Western Sahara"
    - option "Yemen"
    - option "Zambia"
    - option "Zimbabwe"
  - text: Please select a country! Region / State*
  - combobox "Region / State*":
    - option "--- Please Select ---" [selected]
    - option "Aberdeen"
    - option "Aberdeenshire"
    - option "Anglesey"
    - option "Angus"
    - option "Argyll and Bute"
    - option "Bedfordshire"
    - option "Berkshire"
    - option "Blaenau Gwent"
    - option "Bridgend"
    - option "Bristol"
    - option "Buckinghamshire"
    - option "Caerphilly"
    - option "Cambridgeshire"
    - option "Cardiff"
    - option "Carmarthenshire"
    - option "Ceredigion"
    - option "Cheshire"
    - option "Clackmannanshire"
    - option "Conwy"
    - option "Cornwall"
    - option "County Antrim"
    - option "County Armagh"
    - option "County Down"
    - option "County Fermanagh"
    - option "County Londonderry"
    - option "County Tyrone"
    - option "Cumbria"
    - option "Denbighshire"
    - option "Derbyshire"
    - option "Devon"
    - option "Dorset"
    - option "Dumfries and Galloway"
    - option "Dundee"
    - option "Durham"
    - option "East Ayrshire"
    - option "East Dunbartonshire"
    - option "East Lothian"
    - option "East Renfrewshire"
    - option "East Riding of Yorkshire"
    - option "East Sussex"
    - option "Edinburgh"
    - option "Essex"
    - option "Falkirk"
    - option "Fife"
    - option "Flintshire"
    - option "Glasgow"
    - option "Gloucestershire"
    - option "Greater London"
    - option "Greater Manchester"
    - option "Gwynedd"
    - option "Hampshire"
    - option "Herefordshire"
    - option "Hertfordshire"
    - option "Highlands"
    - option "Inverclyde"
    - option "Isle of Wight"
    - option "Kent"
    - option "Lancashire"
    - option "Leicestershire"
    - option "Lincolnshire"
    - option "Merseyside"
    - option "Merthyr Tydfil"
    - option "Midlothian"
    - option "Monmouthshire"
    - option "Moray"
    - option "Neath Port Talbot"
    - option "Newport"
    - option "Norfolk"
    - option "North Ayrshire"
    - option "North Lanarkshire"
    - option "North Yorkshire"
    - option "Northamptonshire"
    - option "Northumberland"
    - option "Nottinghamshire"
    - option "Orkney Islands"
    - option "Oxfordshire"
    - option "Pembrokeshire"
    - option "Perth and Kinross"
    - option "Powys"
    - option "Renfrewshire"
    - option "Rhondda Cynon Taff"
    - option "Rutland"
    - option "Scottish Borders"
    - option "Shetland Islands"
    - option "Shropshire"
    - option "Somerset"
    - option "South Ayrshire"
    - option "South Lanarkshire"
    - option "South Yorkshire"
    - option "Staffordshire"
    - option "Stirling"
    - option "Suffolk"
    - option "Surrey"
    - option "Swansea"
    - option "Torfaen"
    - option "Tyne and Wear"
    - option "Vale of Glamorgan"
    - option "Warwickshire"
    - option "West Dunbartonshire"
    - option "West Lothian"
    - option "West Midlands"
    - option "West Sussex"
    - option "West Yorkshire"
    - option "Western Isles"
    - option "Wiltshire"
    - option "Worcestershire"
    - option "Wrexham"
  - text: Please select a region / state! Default Address
  - radio "Yes"
  - text: "Yes"
  - radio "No" [checked]
  - text: "No"
- link " Back":
  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/address
- button "Continue"
- complementary:
  - link " My Account":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
  - link " Edit Account":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/edit
  - link " Password":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/password
  - link " Address Book":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/address
  - link " Wish List":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
  - link " Notification":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/account/notification/product
  - link " Order History":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/order
  - link " Downloads":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/download
  - link " Recurring payments":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/recurring
  - link " Reward Points":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/reward
  - link " Returns":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/return
  - link " Transactions":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/transaction
  - link " Newsletter":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/newsletter
  - link " Logout":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/logout
- contentinfo:
  - paragraph: © LambdaTest - Powered by OpenCart
```

# Test source

```ts
  56  |         await page.goto(process.env.BASE_URL);
  57  |         await loginPage.navigate();
  58  |         await loginPage.login(sharedEmail, password);
  59  |         await expect(page).toHaveURL(/account\/account/, { timeout: 15000 });
  60  |     });
  61  | 
  62  |     // ==================================================
  63  |     // TC_DSH_001 - Modify Profile First Name Updates Account
  64  |     // ==================================================
  65  |     test('TC_DSH_001 - Modify Profile First Name Updates Account', async ({ dashboardPage, page }) => {
  66  |         await dashboardPage.clickEditAccount();
  67  |         await page.waitForLoadState('domcontentloaded');
  68  | 
  69  |         const firstNameInput = page.locator('#input-firstname');
  70  |         await firstNameInput.fill('UpdatedFirstName');
  71  | 
  72  |         await page.locator('input[value="Continue"]').click();
  73  |         await page.waitForLoadState('domcontentloaded');
  74  | 
  75  |         const alert = page.locator('.alert-success');
  76  |         await expect(alert).toBeVisible();
  77  |         await expect(alert).toHaveText(/Success: Your account has been successfully updated\./);
  78  |     });
  79  | 
  80  |     // ==================================================
  81  |     // TC_DSH_002 - Edit Profile Email Validates Format
  82  |     // ==================================================
  83  |     test('TC_DSH_002 - Edit Profile Email Validates Format', async ({ dashboardPage, page }) => {
  84  |         await dashboardPage.clickEditAccount();
  85  |         await page.waitForLoadState('domcontentloaded');
  86  | 
  87  |         const emailInput = page.locator('#input-email');
  88  |         await emailInput.fill('Invalidemailformat');
  89  | 
  90  |         await page.locator('input[value="Continue"]').click();
  91  |         await page.waitForLoadState('domcontentloaded');
  92  | 
  93  |         const hasError = await page.locator('.text-danger, .alert-danger').first().isVisible().catch(() => false);
  94  |         const stillOnEdit = page.url().includes('route=account/edit');
  95  |         expect(hasError || stillOnEdit).toBe(true);
  96  |     });
  97  | 
  98  |     // ==================================================
  99  |     // TC_DSH_003 - Address Book Creates New Delivery Entry
  100 |     // ==================================================
  101 |     test('TC_DSH_003 - Address Book Creates New Delivery Entry', async ({ dashboardPage, page }) => {
  102 |         await dashboardPage.clickAddressBook();
  103 |         await page.waitForLoadState('domcontentloaded');
  104 | 
  105 |         const addAddressBtn = page.locator('a[href*="route=account/address/add"], a:has-text("New Address")').first();
  106 |         await addAddressBtn.click();
  107 |         await page.waitForLoadState('domcontentloaded');
  108 | 
  109 |         await page.locator('#input-firstname').fill('John');
  110 |         await page.locator('#input-lastname').fill('Doe');
  111 |         await page.locator('#input-address-1').fill('456 Alternative Way');
  112 |         await page.locator('#input-city').fill('Mumbai');
  113 |         await page.locator('#input-postcode').fill('400002');
  114 | 
  115 |         await page.locator('#input-country').selectOption({ label: 'India' });
  116 |         await page.waitForTimeout(1000);
  117 | 
  118 |         await page.waitForFunction(() => {
  119 |             const el = document.querySelector('#input-zone');
  120 |             return el && el.options.length > 1;
  121 |         }, { timeout: 8000 }).catch(() => {});
  122 | 
  123 |         const zoneSelect = page.locator('#input-zone');
  124 |         if (await zoneSelect.locator('option').count() > 1) {
  125 |             await zoneSelect.selectOption({ index: 1 });
  126 |         }
  127 | 
  128 |         await page.locator('input[value="Continue"]').click();
  129 |         await page.waitForLoadState('domcontentloaded');
  130 | 
  131 |         const alert = page.locator('.alert-success');
  132 |         await expect(alert).toBeVisible();
  133 |         await expect(alert).toHaveText(/Your address has been successfully added/);
  134 |     });
  135 | 
  136 |     // ==================================================
  137 |     // TC_DSH_004 - Edit Delivery Listing Saves Updates
  138 |     // ==================================================
  139 |     test('TC_DSH_004 - Edit Delivery Listing Saves Updates', async ({ dashboardPage, page }) => {
  140 |         await dashboardPage.clickAddressBook();
  141 |         await page.waitForLoadState('domcontentloaded');
  142 | 
  143 |         const editBtns = page.locator('a[href*="route=account/address/edit"]');
  144 |         const count = await editBtns.count();
  145 |         if (count > 0) {
  146 |             await editBtns.first().click();
  147 |             await page.waitForLoadState('domcontentloaded');
  148 | 
  149 |             const postcodeField = page.locator('#input-postcode');
  150 |             await postcodeField.fill('999999');
  151 | 
  152 |             await page.locator('input[value="Continue"]').click();
  153 |             await page.waitForLoadState('domcontentloaded');
  154 | 
  155 |             const alert = page.locator('.alert-success');
> 156 |             await expect(alert).toBeVisible();
      |                                 ^ Error: expect(locator).toBeVisible() failed
  157 |             await expect(alert).toHaveText(/Your address has been successfully updated/);
  158 |         }
  159 |     });
  160 | 
  161 |     // ==================================================
  162 |     // TC_DSH_005 - Delete Delivery Listing Updates Records
  163 |     // ==================================================
  164 |     test('TC_DSH_005 - Delete Delivery Listing Updates Records', async ({ dashboardPage, page }) => {
  165 |         await dashboardPage.clickAddressBook();
  166 |         await page.waitForLoadState('domcontentloaded');
  167 | 
  168 |         let deleteBtns = page.getByRole('link', { name: 'Delete' });
  169 |         let count = await deleteBtns.count();
  170 | 
  171 |         if (count === 0 || count === 1) {
  172 |             const addAddressBtn = page.locator('a[href*="route=account/address/add"], a:has-text("New Address")').first();
  173 |             await addAddressBtn.click();
  174 |             await page.waitForLoadState('domcontentloaded');
  175 | 
  176 |             await page.locator('#input-firstname').fill('Temp');
  177 |             await page.locator('#input-lastname').fill('User');
  178 |             await page.locator('#input-address-1').fill('789 Temporary Rd');
  179 |             await page.locator('#input-city').fill('Mumbai');
  180 |             await page.locator('#input-postcode').fill('400003');
  181 |             await page.locator('#input-country').selectOption({ label: 'India' });
  182 |             await page.waitForTimeout(1000);
  183 | 
  184 |             await page.waitForFunction(() => {
  185 |                 const el = document.querySelector('#input-zone');
  186 |                 return el && el.options.length > 1;
  187 |             }, { timeout: 8000 }).catch(() => {});
  188 | 
  189 |             const zoneSelect = page.locator('#input-zone');
  190 |             if (await zoneSelect.locator('option').count() > 1) {
  191 |                 await zoneSelect.selectOption({ index: 1 });
  192 |             }
  193 | 
  194 |             await page.locator('input[value="Continue"]').click();
  195 |             await page.waitForLoadState('domcontentloaded');
  196 | 
  197 |             deleteBtns = page.getByRole('link', { name: 'Delete' });
  198 |             count = await deleteBtns.count();
  199 |         }
  200 | 
  201 |         if (count > 0) {
  202 |             await deleteBtns.last().click();
  203 |             await page.waitForLoadState('domcontentloaded');
  204 | 
  205 |             const alert = page.locator('.alert-success');
  206 |             await expect(alert).toBeVisible({ timeout: 10000 });
  207 |             await expect(alert).toHaveText(/Your address has been successfully deleted/);
  208 |         }
  209 |     });
  210 | 
  211 |     // ==================================================
  212 |     // TC_DSH_006 - Password Modification Updates Login
  213 |     // ==================================================
  214 |     test('TC_DSH_006 - Password Modification Updates Login', async ({ dashboardPage, page, loginPage }) => {
  215 |         await dashboardPage.clickPasswordChange();
  216 |         await page.waitForLoadState('domcontentloaded');
  217 | 
  218 |         const newPassword = 'NewSecurePassword123!';
  219 |         await page.locator('#input-password').fill(newPassword);
  220 |         await page.locator('#input-confirm').fill(newPassword);
  221 | 
  222 |         await page.locator('input[value="Continue"]').click();
  223 |         await page.waitForLoadState('domcontentloaded');
  224 | 
  225 |         const alert = page.locator('.alert-success');
  226 |         await expect(alert).toBeVisible();
  227 |         await expect(alert).toHaveText(/Success: Your password has been successfully updated\./);
  228 | 
  229 |         await dashboardPage.clickLogout();
  230 |         await page.waitForLoadState('domcontentloaded');
  231 | 
  232 |         await loginPage.navigate();
  233 |         await loginPage.login(sharedEmail, newPassword);
  234 |         await expect(page).toHaveURL(/account\/account/, { timeout: 15000 });
  235 | 
  236 |         await dashboardPage.clickPasswordChange();
  237 |         await page.waitForLoadState('domcontentloaded');
  238 |         await page.locator('#input-password').fill(password);
  239 |         await page.locator('#input-confirm').fill(password);
  240 |         await page.locator('input[value="Continue"]').click();
  241 |         await page.waitForLoadState('domcontentloaded');
  242 |         const alertBack = page.locator('.alert-success');
  243 |         await expect(alertBack).toBeVisible();
  244 |         await expect(alertBack).toHaveText(/Success: Your password has been successfully updated\./);
  245 |     });
  246 | 
  247 |     // ==================================================
  248 |     // TC_DSH_007 - Dashboard Counters Display Order Counts
  249 |     // ==================================================
  250 |     test('TC_DSH_007 - Dashboard Counters Display Order Counts', async ({ page }) => {
  251 |         const contentText = await page.locator('#content').innerText();
  252 |         console.log('===== ACCOUNT DASHBOARD CONTENT DUMP =====');
  253 |         console.log(contentText);
  254 |         console.log('==========================================');
  255 | 
  256 |         await expect(page.locator('#content')).toBeVisible();
```