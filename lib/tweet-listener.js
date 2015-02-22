'use strict';

var Io = require('socket.io'),
    _ = require('lodash'),
    config = require('../config'),
    db = require('../models/tweet')(),
    Twit = require('twit'),
    twit = new Twit(config.twit),
    service = {};

/* opens a stream to listen for new tweets */
module.exports = service;


service.listen = function () {
    service.stream = twit.stream('statuses/filter', {
        track: ['#grumpycat', '#maruthecat']
    });

    service.stream.on('tweet', function (tweet) {
        console.log('incoming tweet ->', tweet.id);

        db.Tweet.update({
            id: tweet.id
        }, tweet, {
            upsert: true
        }, function (err, result) {});

        //TODO: Notify Webclient of new message
        //Will have to run new tweet through currently applied filter
        //to see if it is within the range that the user is currently viewing
    });
}