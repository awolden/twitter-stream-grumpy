'use strict';

var Twit = require('twit'),
    config = require('../config'),
    Tweet = require('../models/tweet'),
    twit = new Twit(config.twit),
    msgsToLoad = 100,
    msgsPerCall = 100;


//backfill set amount of messages into the application so we have a health dataset to work with
//could theoretically load all relevant tweets but the api is rate limited.
for (var i = msgsToLoad; i > 0; i -= msgsPerCall) {
    twit.get('search/tweets', {
        q: '#grumpycat OR #maruthecat',
        count: msgsPerCall
    }, function (err, data, response) {
        if (err) console.log(err);
        console.log(data)
        data.statuses.forEach(function (tweet) {
            Tweet.update({
                id: tweet.id
            }, tweet, {
                upsert: true
            }, function (err, result) {
                console.log('added tweet ->', result);
            });
        });
    });
}