'use strict';

var Io = require('socket.io'),
    _ = require('lodash'),
    Tweet = require('../models/tweet');

module.exports = function (server) {

    var self = this;

    //create socket server
    var io = new Io.listen(server);

    /*
     * Socket Set-up
     **/
    io.sockets.on('connection', function (client) {

        console.log('a connection has been made ->', client.id);
        client.emit('welcome');

        self.clients.push(client);

        client.on('disconnect', function () {
            _.remove(self.clients, {
                id: this.conn.id
            });
        });

        client.on('getTweets', function (params) {
            var query = Tweet.find().limit(10).sort('id').exec();
            query.then(function (tweets) {
                client.emit('tweets', tweets);
            });
        });

        client.on('getStats', function (params) {

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

            Tweet.aggregate(agg, function (err, result) {
                if (err) console.log('aggregration error ->', err);
                //return results to client
                client.emit('stats', result);
            });
        });

        client.on('moreTweetsPls', function (params) {
            //todo:apply params
            var query = Tweet.find().limit(10).skip(params.offset).sort('id').exec();
            query.then(function (tweets) {
                client.emit('tweets', tweets);
            });
        });

    });

    /*
     * Public Properties
     **/

    self.clients = [];

}