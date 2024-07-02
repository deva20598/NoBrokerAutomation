const { setDefaultTimeout, After, AfterAll } = require('@cucumber/cucumber');
const path = require('path');
const fs = require('fs');
// const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api');
const attachedScreenshots = getScreenshots();
const reporter = require('cucumber-html-reporter');
const reportName = process.env.reportName;

function getScreenshots() {
    try {
        const folder = path.resolve(__dirname, 'screenshots');

        const screenshots = fs.readdirSync(folder).map(file => path.resolve(folder, file));
        return screenshots;
    } catch (err) {
        return [];
    }
}


setDefaultTimeout(480000);

// BeforeAll(async () => {
//   await startWebDriver();
//   await createSession();
// });

AfterAll(async () => {
    //   await closeSession();
    //   await stopWebDriver();

    setTimeout(() => {
        reporter.generate({
            theme: 'bootstrap',
            jsonFile: `report/${reportName}_json.json`,
            output: `report/${reportName}_report.html`,
            reportSuiteAsScenarios: true,
            scenarioTimestamp: true,
            launchReport: true,
            metadata: {
                "Test Environment": "STAGING",
                "Browser": "Chrome 98",
                "Platform": "Windows 10",
            }
        });
    }, 100);

});

After(function () {
    return Promise.all(
        getScreenshots()
            .filter(file => !attachedScreenshots.includes(file))
            .map(file => {
                attachedScreenshots.push(file);
                return this.attach(fs.readFileSync(file), 'image/png');
            })
    );
});