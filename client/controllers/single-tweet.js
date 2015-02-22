'use strict';

module.exports = ['$scope', 'tweetIo', '$location', '$window',
    function ($scope, tweetIo, $location, $window) {

        $scope.tweet = tweetIo.selectedTweet;

        //TODO: handle direct calls to this page
        if (_.isEmpty($scope.tweet)) {
            $location.path('/');
        }

        $scope.back = function () {
            $window.history.back();
        };

    }
];