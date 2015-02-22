'use strict';


module.exports = [function () {
    return {
        scope: {
            tweet: '=tweet',
        },
        restrict: 'E',
        templateUrl: '/partials/tweet.html',
        controller: function ($scope, $element) {},
        link: function (scope, el, attr) {}
    }
}];