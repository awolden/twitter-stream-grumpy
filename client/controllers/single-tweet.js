'use strict';

module.exports = ['$scope', 'tweetIo', '$location', '$window',
    function ($scope, tweetIo, $location, $window) {

        $scope.tweet = tweetIo.selectedTweet;
        $scope.$window = $window;

        //TODO: handle direct calls to this page
        if (_.isEmpty($scope.tweet)) {
            $location.path('/');
        }

        $scope.back = function () {
            $window.history.back();
        };

    }
];