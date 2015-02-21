'use strict';

require('angular');
require('angular-route');
window.io = require('sio-client');
window._ = require('lodash');

var app = angular.module('grumpy-twitter', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html'
        }).when('/tweet', {
            templateUrl: 'partials/tweet.html'
        });
});

var socket = io();
socket.on('welcome', function () {
    console.log('the server has welcomed us');
});

setTimeout(function () {
    console.log('disconnecting')
    socket.disconnect();
}, 5000);