'use strict';

var Twit = require('twit'),
    config = require('../config'),
    db = require('../models/tweet')(),
    twit = new Twit(config.twit),
    msgsToLoad = 5000,
    msgsPerCall = 100;


//backfill set amount of messages into the application so we have a health dataset to work with
//could theoretically load all relevant tweets but the api is rate limited.
function getPage(msgs, count, maxId) {

    console.log('calling getpage ->', msgs, count, maxId);

    if (msgs <= 0) {
        console.log('complete');
        return;
    }

    var paramsObj = {
        q: '#grumpycat OR #maruthecat',
        count: msgsPerCall
    };

    if (maxId) paramsObj.max_id = maxId;

    twit.get('search/tweets', paramsObj, function (err, data, response) {
        if (err) console.log(err);

        console.log('tweets returned and processing ->', data.statuses.length);

        //trigger next page load
        if (data.statuses.length)
            getPage((msgs - count), count, data.statuses[data.statuses.length - 1].id);
        else
            console.log('no more tweets available. Stopping import.')

        data.statuses.forEach(function (tweet) {
            db.Tweet.update({
                id: tweet.id
            }, tweet, {
                upsert: true
            }, function (err, result) {});
        });

    });
}

getPage(msgsToLoad, msgsPerCall);