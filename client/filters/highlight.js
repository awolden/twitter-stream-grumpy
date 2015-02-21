'use strict';

module.exports = ['$sce', function ($sce) {
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
            '<strong>$1</strong>')
        return $sce.trustAsHtml(text)
    };
}]