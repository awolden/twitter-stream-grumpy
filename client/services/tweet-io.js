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
        });

        self.socket.on('tweets', function (tweets) {

            //guarantee uniqueness of tweet
            _.each(tweets, function (tweet) {

                var uniq = !_.findWhere(self.tweets, {
                    id: tweet.id
                });

                if (uniq) self.tweets.push(tweet);

            });

            console.log('The server has sent us some delicious tweets ->', self.tweets);
        });

        /*
         * Configure service
         */

        self.tweets = [];

    }
];