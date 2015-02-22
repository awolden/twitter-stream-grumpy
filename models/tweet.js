'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    self = {},
    config = require('../config');

/*
 * Setup Mongoose
 **/

module.exports = function (connString) {

    var conn = mongoose.createConnection(connString || config.mongoServer);

    /* Tweet Schema */
    var TweetSchema = new Schema({
        id: {
            type: Number,
            index: {
                unique: true,
                dropDups: true,
            }
        }
    }, {
        //allow any schema
        //not advised, but I am lazy and the tweet schema would be huge
        strict: false
    });

    var TweetModel = conn.model('tModel', TweetSchema);

    //return object
    return {
        Tweet: TweetModel,
    };

};