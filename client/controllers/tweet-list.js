'use strict';

module.exports = ['$scope', 'tweetIo',
    function ($scope, tweetIo) {

        $scope.data = {
            tweets: tweetIo.tweets,
            topUsers: tweetIo.stats.top
        };

        $scope.criteria = tweetIo.criteria;

        /*
         * $scope functions
         */
        $scope.openTweet = function (tweet) {
            //open tweet on click
        };

        $scope.moreTweets = function () {
            tweetIo.moreTweets();
        };

        $scope.filterChanged = function () {
            tweetIo.refreshTweets();
        };

        $scope.setSort = function (sort) {

            if ($scope.criteria.sort.name === sort) return;

            $scope.criteria.sort.name = sort;
            switch (sort) {
            case "Recent":
                $scope.criteria.sort.expr = '-id';
                break;
            case "Favorites":
                $scope.criteria.sort.expr = '-favorite_count';
                break;
            case "Oldest":
                $scope.criteria.sort.expr = 'id';
                break;
            case "Retweets":
                $scope.criteria.sort.expr = '-retweet_count';
                break;
            }

            tweetIo.refreshTweets();
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