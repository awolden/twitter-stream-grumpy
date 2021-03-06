'use strict';

require('angular');
require('angular-route');
require('angular-sanitize');
window.moment = require('moment');
window._ = require('lodash');
var io = require('sio-client');

var app = angular.module('grumpy-twitter', ['ngRoute', 'ngSanitize']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'tweetList'
        }).when('/tweet/:tweetid', {
            templateUrl: 'partials/individual-tweet.html',
            controller: 'singleTweet'
        });
});

app.run(['$rootScope', '$location',
    function ($rootScope, $location) {
        $rootScope.$on('tweetSelected', function (event, tweet) {
            $location.path('/tweet/' + tweet.id);
        });
    }
]);



app.constant('io', io);

/* Controllers */
app.controller('tweetList', require('./controllers/tweet-list'));
app.controller('singleTweet', require('./controllers/single-tweet'));

/* Services */
app.service('tweetIo', require('./services/tweet-io'));

/* Directives */
app.directive('tweet', require('./directives/tweet'));

/* Filters */
app.filter('fromNow', require('./filters/from-now'));
app.filter('highlight', require('./filters/highlight'));
app.filter('hashToText', require('./filters/hash-to-text'));