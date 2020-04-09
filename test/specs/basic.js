const assert = require('assert')

const searchInputSel = '#search_input';
const searchButtonSel = '#search_button';
const resetButtonSel = '#reset_button';
const resultsContainerSel = '#results_container';

const checkValue = 'corona';

describe('Edgify Image Search App', () => {
    it('should have the right title', async () => {
        await browser.url('http://localhost:8080/');
        const title = await browser.getTitle();
        assert.strictEqual(title, 'Edgify Image Search App');
    });
    it('should have search input', () => {
        const searchInput = $(searchInputSel);
        assert.equal(searchInput.isExisting(), true);
    });
    it('should have search button', () => {
        const searchButton = $(searchButtonSel);
        assert.equal(searchButton.isExisting(), true);
    });
    it('should have reset button', () => {
        const resetButton = $(resetButtonSel);
        assert.equal(resetButton.isExisting(), true);
    });
    it('should run search flow', () => {
        const searchButton = $(searchButtonSel);     
        const searchInput = $(searchInputSel);
        searchInput.setValue(checkValue);
        browser.pause(5000);
        searchButton.click();
        browser.pause(5000);
        browser.waitUntil(
            () => $(resultsContainerSel),
            {
                timeout: 5000,
                timeoutMsg: 'expected results to be after 5s'
            }
        );
        assert.equal(searchInput.getValue(), checkValue);
    });
})