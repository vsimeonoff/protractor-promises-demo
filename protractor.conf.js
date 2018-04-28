// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ["--window-size=700,600" ]
    }
  },
  directConnect: true,
  baseUrl: 'http://www.livescore.com/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function() {}
  },
  plugins: [{
    package: 'jasmine2-protractor-utils',
    disableHTMLReport: false,
    disableScreenshot: false,
    screenshotPath:'./report/screenshots',
    screenshotOnExpectFailure: true,
    screenshotOnSpecFailure: true,
    clearFoldersBeforeTest: true,
    htmlReportDir: './report/htmlReports',
    failTestOnErrorLog: {
      failTestOnErrorLogLevel: 2000, //ignore browser console error; 800 = INFO, 900 = WARNING, 1000 = ERROR
      excludeKeywords: []
    }
  }],
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    // returning the promise makes protractor wait for the reporter config before executing tests
    return global.browser.getProcessedConfig();
  }
};
