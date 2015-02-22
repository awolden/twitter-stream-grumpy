'use strict';

/* global describe, it, before, after */

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    mock = require('./lib/mock-db'),
    TweetSocket = require('../lib/tweet-sockets'),
    db = mock.db,
    http = require('http');

//chai support for promises
chai.use(require("chai-as-promised"));

//inject mock-db and dummy server
var tweetSockets = new TweetSocket(http.createServer(), db);

describe('Tweet Sockets', function (done) {

    before(function (done) {
        mock.createTweets(done);
    })
    after(function (done) {
        mock.destroyTweets(done);
    })

    //TODO: Mock socket connection and test

    /*
     * test public methods
     */
    it('Get a list of top posters', function () {

        //basic test of result length
        expect(tweetSockets.getTopPosters()).to.eventually.have.length(3);

        //TODO: test for properties and values on results

    });

    it('Get a total count of tweets', function () {

        //basic test of count
        expect(tweetSockets.getCount()).to.eventually.equal(3);

    });

    it('Get a list of tweets', function () {

        //TODO: test more permutations of the sort/filter criteria
        var params = {
            "offset": 0,
            "criteria": {
                "sort": {
                    "name": "Recent",
                    "expr": "-id"
                }
            }
        };

        //basic test of result length
        expect(tweetSockets.getTweets(params)).to.eventually.have.length(3);

        //TODO: Test properties and values

    });
});