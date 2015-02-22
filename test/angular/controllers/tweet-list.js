'use strict';

/* global describe, it, before, after, beforeEach, inject, assert */


/* test Tweet list */
describe('Unit: tweetListController', function () {
    beforeEach(module('grumpy-twitter'));
    // Our tests will go here
    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('tweetList', {
            $scope: scope
        });
    }));


    //test sorting options
    it('should allow sorting', function () {

        expect(scope.criteria.sort.name).to.equal('Recent');
        expect(scope.criteria.sort.expr).to.equal('-id');

        scope.setSort('Oldest');

        expect(scope.criteria.sort.name).to.equal('Oldest');
        expect(scope.criteria.sort.expr).to.equal('id');

        scope.setSort('Favorites');

        expect(scope.criteria.sort.name).to.equal('Favorites');
        expect(scope.criteria.sort.expr).to.equal('-favorite_count');

        scope.setSort('Retweets');

        expect(scope.criteria.sort.name).to.equal('Retweets');
        expect(scope.criteria.sort.expr).to.equal('-retweet_count');


    });


})