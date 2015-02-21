'use strict';

var Io = require('socket.io'),
    _ = require('lodash');

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


    });

    /*
     * Public Properties
     **/

    self.clients = [];



}