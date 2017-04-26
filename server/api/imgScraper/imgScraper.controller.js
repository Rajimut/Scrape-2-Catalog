'use strict'
// created by raji for imgur scraper
// 
var scrapers = {};

// scrapers is an object and we can tell which scrapers we will be using by passing
// a reference
scrapers['imgur'] = require ('./scrapers/imgur.js');

exports.scrape = function(req,res){
	var url = req.body.url;
	var scraperToUse;
	if(url.indexOf('imgur')>-1){
		scraperToUse = 'imgur';
		console.log(' located the scraper');
	} else {
		console.log('cannot locate scraper');

	}
// url is the universal variable between controller and imgur.js file
// url contains the url given to us by pintrest
// data ia an object that is going to get created in imgur.js file
	scrapers[scraperToUse].list(url, function(data){
		console.log('data from scraper:', data);
// easier to use json within the view
		res.json(data);
	})
}