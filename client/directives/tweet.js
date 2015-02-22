'use strict';


module.exports = [function () {
    return {
        scope: {
            tweet: '=tweet',
            single: '=single',
            filter: '=filter'
        },
        restrict: 'E',
        templateUrl: '/partials/tweet.html',
        controller: function ($scope, $element, tweetIo) {
            $scope.openTweet = function (tweet) {
                tweetIo.selectTweet(tweet);
            };
        },
        link: function (scope, el, attr) {}
    }
}];