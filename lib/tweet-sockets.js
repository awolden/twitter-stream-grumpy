'use strict';

var Io = require('socket.io'),
    _ = require('lodash'),
    db = require('../models/tweet')(),
    Q = require('q');

module.exports = function (server, injectedDb) {

    var self = this;

    db = injectedDb || db;

    //create socket server
    var io = new Io.listen(server);

    /*
     * Socket Set-up
     **/
    io.sockets.on('connection', function (client) {

        self.clients.push(client);

        client.emit('welcome');

        /*
         * Client Listeners
         */
        client.on('disconnect', function () {
            _.remove(self.clients, {
                id: this.conn.id
            });
        });

        client.on('getStats', function (params) {
            Q.all([self.getTopPosters(), self.getCount()]).then(function (results) {
                client.emit('stats', {
                    topUsers: results[0],
                    totalTweets: results[1]
                });
            }, function (err) {
                console.log('error retrieving stats');
            });
        });

        client.on('moreTweetsPls', function (params) {
            self.getTweets(params).then(function (tweets) {
                client.emit('tweets', tweets);
            }, function (err) {
                console.log('Error retrieving tweets');
            });
        });

    });

    /*
     * Public Properties
     **/

    self.clients = [];

    //get a list of top tweeters
    self.getTopPosters = function () {
        var deferred = Q.defer();

        //build aggregration query
        var agg = [{
            $group: {
                _id: {
                    name: '$user.name'
                },
                // SUCCESS!!! :D
                count: {
                    $sum: 1
                }
            }
        }, {
            $sort: {
                "count": -1
            }
        }, {
            $limit: 10
        }];

        db.Tweet.aggregate(agg, function (err, result) {
            if (err) deferred.reject(err);
            //return results to client
            deferred.resolve(result);
        });

        return deferred.promise;
    };

    //retrive a list of all tweets
    self.getTweets = function (params) {
        var filterObj = {};

        if (params.criteria.filter) {
            //sanitize filter text
            var filter = params.criteria.filter.replace(/\W+/g, "");
            filterObj = {
                text: new RegExp(filter, 'i')
            };
        }

        //todo:apply params
        var query = db.Tweet.find(filterObj)
            .limit(10)
            .skip(params.offset)
            .sort(params.criteria.sort.expr);

        return query.exec();
    };


    //get a total count of tweets
    self.getCount = function () {
        var deferred = Q.defer();

        db.Tweet.count({}, function (err, count) {
            if (err) deferred.reject(err);
            deferred.resolve(count);
        });

        return deferred.promise;
    };

}