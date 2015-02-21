'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    self = {};

/*
 * Setup Mongoose
 **/
mongoose.connect('mongodb://localhost/tweets');


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
    strict: false
});

var TweetModel = mongoose.model('tModel', TweetSchema);

/*
 * Construct Output Object
 **/
module.exports = TweetModel;