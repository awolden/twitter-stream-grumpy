'use strict';

require('angular');
require('angular-route');
window._ = require('lodash');

var app = angular.module('grumpy-twitter', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'rootCtrl'
        });
});