var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');

module.exports = {
  write : function(results, options, done) {

    var date = new Date();
    var newDate = (date.getMonth() + 1) + '_' + date.getDate() + '_' +  date.getFullYear() + '_' +date.getHours() + '_' + date.getMinutes();
    var reportFilename = "RC-AutmationResult_" + newDate + '.html';
    var reportFilePath = path.join(__dirname, options.output_folder, reportFilename);

    handlebars.registerHelper("inc", function (value) {
      return value + 1;
    });

    handlebars.registerHelper("getSkipCount", function (data) {
      return data.length + 1;
    });

    handlebars.registerHelper("getCompletedStepCount", function (data) {
      return Object.keys(data).length - 1;
    });

    handlebars.registerHelper("getPassedStepCount", function (data) {
      return Object.keys(data).length;
    });

    // read the html template
    fs.readFile('html-reporter.hbs', function(err, data) {
      if (err) throw err;

      var template = data.toString();

      let totCount = Object.keys(results.modules).length
      var totalCount = totCount > 0 ? totCount : 0;
      results.totalTestCount = totalCount
      let passedTests = 0;
      let skippedTestsCount = 0;

      for (let index = 0; index < totCount; index++) {
        let test = results["modules"];

        if (test[Object.keys(results.modules)[index]]["failures"] == 0 && test[Object.keys(results.modules)[index]]["assertionsCount"] != 0) {
          passedTests = passedTests + 1;
        }

        if (test[Object.keys(results.modules)[index]]["assertionsCount"] == 0)
          skippedTestsCount = skippedTestsCount + 1;
      }

      results.passedTestCount = passedTests
      results.skippedTestsCount = skippedTestsCount

      // merge the template with the test results data
      var html = handlebars.compile(template)({
        results   : results,
        options   : options,
        timestamp : new Date().toString(),
        browser   : options.filename_prefix.split('_').join(' '),
        totalAssertions: results.passed + results.errors + results.failed,
      });

      // write the html to a file
      fs.writeFile(reportFilePath, html, function(err) {
        if (err) throw err;
        console.log('Report generated: ' + reportFilePath);
        done();
      });
    });
  }
};