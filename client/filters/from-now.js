'use strict';

/*globals moment*/

module.exports = function () {
    return function (date) {
        return moment(date).fromNow();
    };
}