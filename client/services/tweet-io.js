'use strict';

module.exports = ['$rootScope', 'io',
    function ($rootScope, io) {

        var self = this;

        /*
         * Configure socket connection
         */
        self.socket = io();

        self.socket.on('welcome', function () {
            self.moreTweets();
            self.socket.emit('getStats');
        });

        self.socket.on('tweets', function (tweets) {

            //guarantee uniqueness of tweet
            _.each(tweets, function (tweet) {

                var uniq = !_.findWhere(self.tweets, {
                    id: tweet.id
                });

                if (uniq) self.tweets.push(tweet);

            });
            $rootScope.$broadcast('newTweets');
            console.log('The server has sent us some delicious tweets ->', self.tweets);
        });

        self.socket.on('stats', function (stats) {
            self.stats = stats;
            console.log('the server sent us some stats ->', stats);
            $rootScope.$broadcast('newStats');
        });

        /*
         * Configure service
         */

        self.tweets = [];
        self.selectedTweet = {};
        self.stats = {};
        self.criteria = {
            sort: {
                name: "Recent",
                expr: '-id'
            }
        };

        //get more tweets from server
        self.moreTweets = function () {
            self.socket.emit('moreTweetsPls', {
                offset: self.tweets.length,
                criteria: self.criteria
            });
        };

        //clear tweets and get new list
        self.refreshTweets = function () {
            self.tweets = [];
            self.socket.emit('moreTweetsPls', {
                offset: self.tweets.length,
                criteria: self.criteria
            });
        };

        //clear tweets and get new list
        self.selectTweet = function (tweet) {
            self.selectedTweet = tweet;
            $rootScope.$broadcast('tweetSelected', tweet);
        };

    }
];