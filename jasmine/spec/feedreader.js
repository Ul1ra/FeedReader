/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    // Here is a list of variables that will be used inside the test
    var entriesStart,
        entriesEnd;

    // This is the RSS Feeds suite that tests the feeds 
    describe('RSS Feeds', function () {

        // Determines if allfeeds has been defined and that it is not empty
        it('feeds are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Determines if allFeeds have a url and that the url is not empty
        it('urls are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        // Determines if allFeeds have a name and that the name is not empty 
        it('names are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    // New test suite that will test the menu
    describe('The Menu', function () {

        // Searches for the class of 'menu-hidden' in the body tag. If true, 
        // then the menu is hidden 
        it('menu element is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        // Toggles on click event if the menu appears or disappears
        it('working toggle on click event', function () {
            // Calls the class of 'menu-icon-link' 
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // New test suite that will test initial entries
    describe('Initial Entries', function () {

        // Calls a function to do an asynchronous request 
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // Tests if the loadFeed function has at least a single '.entry' within
        // the '.feed' container
        it('define if entry has more than 0 entries', function () {
            expect($('.entry .feed')).toBeDefined();
        });
    });

    // New test suite that looks for new feed selections
    describe('New Feed Selection', function () {

        // Ensures that the new feed is loaded via the loadFeed function
        beforeEach(function (done) {
            $('.feed').empty();
            // Loads first entry and checks
            loadFeed(0, function () {

                // Searches for the first feed for url
                entriesStart = $('.feed').find(allFeeds.url);
                done();
            });
            loadFeed(1, function () {

                // Searches for the second feed for url
                entriesEnd = $('.feed').find(allFeeds.url);
                done();
            });
        });

        // Tests to see if two entries are not equal
        it('new feed is different to old one', function () {
            expect(entriesStart).not.toBe(entriesEnd);
        });

    });
}());
