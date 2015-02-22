'use strict';

module.exports = ['$scope', 'tweetIo',
    function ($scope, tweetIo) {

        $scope.data = {
            tweets: tweetIo.tweets,
            stats: tweetIo.stats
        };

        $scope.criteria = tweetIo.criteria;

        /*
         * $scope functions
         */
        $scope.moreTweets = function () {
            tweetIo.moreTweets();
        };

        $scope.filterChanged = function () {
            tweetIo.refreshTweets();
        };

        $scope.setSort = function (sort) {

            if ($scope.criteria.sort.name === sort) return;

            //TODO: Enum these expresions and map them server side.
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
                $scope.data.stats = tweetIo.stats;
            });
        });



    }
];