const { client } = require("nightwatch")

module.exports = {
    elements: {
     
        VerifyHomeScreen: {
            locateStrategy: 'xpath',
            selector: `//div[text()="World's Largest NoBrokerage Property Site"]`
        },
        selectCity: {
            locateStrategy: 'xpath',
            selector: '(//div[@class="css-16pqwjk-indicatorContainer nb-select__indicator nb-select__dropdown-indicator"])[1]'
        },
        selectLocation: {
            locateStrategy: 'xpath',
            selector: '//input[@id="listPageSearchLocality"]'
        },
        selectPropertyType: {
            locateStrategy: 'xpath',
            selector: "//div[contains(@class,'cursor-pointer')]/..//div[text()='Rent']"
        },
        selectLocationDropDownOption: {
            locateStrategy: 'xpath',
            selector: "(//div[contains(@class,'flex w-full p-2 whitespace')])[1]"
        },
        selectTenantType: {
            locateStrategy: 'xpath',
            selector: "(//div[contains(@class,'css-16pqwjk-indicatorContainer')])[2]"
        },
        selectRoomType: {
            locateStrategy: 'xpath',
            selector: "(//div[contains(@class,'css-1hwfws3 nb-select__value-container')])[3]"
        },
        selectSearchButton: {
            locateStrategy: 'xpath',
            selector: "//button[@class='prop-search-button flex items-center justify-center btn btn-primary btn-lg']"
        },
    },
    commands: [
        {
            enterUrl(browser, url) {
                return browser
                    .windowMaximize()
                    .url(url)
            },

            verifySuccessHomePageOpen() {
                return this
                    .waitForElementVisible('@VerifyHomeScreen', 7000)
                    .assert.visible('@VerifyHomeScreen')
            },

            selectLocation(browser, location) {
                this
                    .waitForElementVisible('@selectLocation', 2000)
                    .assert.visible('@selectLocation')
                    .setValue('@selectLocation', location)
                    .pause(1000)
                    .waitForElementVisible('@selectLocationDropDownOption', 2000)
                    .click("@selectLocationDropDownOption")
    
                return browser.page.noBroker()
            },

            propertyType(browser) {
            this
                .waitForElementVisible('@selectPropertyType', 2000)
                .assert.visible('@selectPropertyType')
                .click("@selectPropertyType")

                return browser.page.noBroker()
            },

            selectLivingType(browser, living_type) {
                this.useXpath().click("//input[@type='radio']/../..//label[text()='"+living_type+"']")
    
                return browser.page.noBroker()
            },

            selectTenantType(browser, tenant_type) {
                this
                .waitForElementVisible('@selectTenantType', 2000)
                .assert.visible('@selectTenantType') 
                .click('@selectTenantType')
                .pause(2000)
                this.useXpath().click("//span[normalize-space()='"+tenant_type+"']")
    
                return browser.page.noBroker()
            },

            selectRoomType(browser, room_type) {
                this
                .waitForElementVisible('@selectRoomType', 2000)
                .assert.visible('@selectRoomType') 
                .click('@selectRoomType')
                .pause(2000)
                this.useXpath().click("//div[normalize-space()='"+room_type+"']")
    
                return browser.page.noBroker()
            },

            selectSearchButton(browser) {
                this
                .waitForElementVisible('@selectSearchButton', 2000)
                .assert.visible('@selectSearchButton') 
                .click('@selectSearchButton')
    
                return browser.page.noBroker()
            },

            verifyTenantTypeCheckBox(browser, tenant_type) {
                this
                .pause(3000)
                .assert.elementPresent("//span[text() ='"+tenant_type+"']/..//input[@type='checkbox']")
                .isSelected("//span[text() ='"+tenant_type+"']/..//input[@type='checkbox']", function(result) {
                browser.assert.ok(result.value, 'Checkbox is selected')
                  })
    
                return browser.page.noBroker()
            },
        }],
    

    }
