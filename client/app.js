'use strict';

require('angular');
require('angular-route');
window._ = require('lodash');
var io = require('sio-client');

var app = angular.module('grumpy-twitter', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'tweetList'
        }).when('/tweet', {
            templateUrl: 'partials/tweet.html'
        });
});

app.constant('io', io);

app.controller('tweetList', require('./controllers/tweet-list'));

app.service('tweetIo', require('./services/tweet-io'));