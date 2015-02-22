// Karma configuration
module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            'public/javascripts/app.js',
            'public/components/angular-mocks/angular-mocks.js',
            'test/angular/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 3002,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};