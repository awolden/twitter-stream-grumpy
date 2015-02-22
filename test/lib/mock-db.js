'use strict';

/* global describe, it, before, after */


//create a mock-db to test against


var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    db = require('../../models/tweet')('mongodb://localhost/tweets-test'),
    mock = {},
    tweets = require('./tweets');

module.exports = mock;

mock.db = db;

mock.createTweets = function (done) {

    //insert and test
    //lazy flow control
    var tweetCount = tweets.length,
        returned = 0;
    tweets.forEach(function (tweet) {
        db.Tweet.update({
            id: tweet.id
        }, tweet, {
            upsert: true
        }, function (err, result) {
            expect(err).to.not.be.ok;
            expect(result).to.equal(1);

            if (++returned >= tweetCount) {
                //test count
                db.Tweet.count({}, function (err, count) {
                    expect(err).to.not.be.ok;
                    expect(count).to.equal(3);
                    done();
                });
            }
        });
    });


};

mock.destroyTweets = function (done) {

    //insert and test
    db.Tweet.remove({}, function (err) {
        expect(err).to.not.be.ok;

        //test count
        db.Tweet.count({}, function (err, count) {
            expect(count).to.equal(0);
            done();
        });
    });


};