'use strict';

module.exports = ['$scope', 'tweetIo',
    function ($scope, tweetIo) {

        $scope.data = {
            tweets: tweetIo.tweets,
            topUsers: tweetIo.stats.top
        };

        /*
         * $scope functions
         */
        $scope.openTweet = function (tweet) {
            //open tweet on click
        };

        $scope.moreTweets = function () {
            tweetIo.moreTweets();
        };

        /*
         * Listeners
         */
        $scope.$on('newTweets', function () {
            $scope.$apply(function () {
                $scope.data.tweets = tweetIo.tweets;
            });
        });
        $scope.$on('newStats', function () {
            $scope.$apply(function () {
                $scope.data.topUsers = tweetIo.stats.top;
            });
        });



    }
];