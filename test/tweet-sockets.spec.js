'use strict';

/* global describe, it, before, after */

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    mock = require('./lib/mock-db'),
    db = mock.db;



describe('Tweet Sockets', function (done) {
    before(function (done) {
        mock.createTweets(done);
    })
    after(function (done) {
        mock.destroyTweets(done);
    })

    it('Query the database correctly', function (done) {


        done();

    });
});