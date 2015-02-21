'use strict';

module.exports = ['$rootScope', 'io',
    function ($rootScope, io) {

        var self = this;

        /*
         * Configure socket connection
         */
        self.socket = io();
        console.log(io);

        self.socket.on('welcome', function () {
            console.log('the server has welcomed us');
            self.socket.emit('getTweets');
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
            self.stats.top = stats;
            console.log('the server sent us some stats ->', stats);
            $rootScope.$broadcast('newStats');
        });

        /*
         * Configure service
         */

        self.tweets = [];
        self.stats = {};

        //get more tweets from server
        self.moreTweets = function () {
            self.socket.emit('moreTweetsPls', {
                offset: self.tweets.length,
                sort: null,
                filter: null
            });
            console.log('getting more tweets');
        }


    }
];