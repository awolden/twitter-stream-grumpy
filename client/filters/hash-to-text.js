'use strict';

/*globals moment*/

module.exports = function () {
    return function (hashtags) {
        return _.map(hashtags, function (hashtag) {
            return "#" + hashtag.text;
        }).join(', ');
    };
}