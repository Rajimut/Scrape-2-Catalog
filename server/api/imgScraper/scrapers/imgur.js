'use strict';

var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, cb) {
	console.log('11')
	request(url, function(error, resp, body){
		if(error){
			cb({
				error: error

			});

		}
		if(!error){
			var $ = cheerio.load(body);
			var pin = {};
			var $url = url;
			var $img = $('.post-image-placeholder').attr('src');
			var $img_ = $('.image post-image');
			console.log($img_)

			// get from pinterest
			//var $desc = $('.image post-image img').attr('src'); // description from pinterest
		var pin = {
			img: $img,
			url: $url
		}
		cb(pin);
		}
	})
}