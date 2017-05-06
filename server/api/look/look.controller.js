'use strict';

var _ = require('lodash');
var Look = require('./look.model');
var path = require('path');
// utils is neded to download an image and create a file name
// that folder will be located in the routes of the folder
var utils = require('../../utils/utils.js');

exports.allLooks = function (req, res) {
// find is a method in mongoosejs API that when passed in an empty object will grab all the looks in this model
Look.find({})
	.sort({
		// we are sorting in ascending order based on the create time
		// create time is a property on our look
		createTime: -1
	}) // below we are doing an execute function because we are chaining functions above
	.exec(function(err, looks){
		// .exec takes error and response. In this case looks is the response
		if(err){
			// handleError is a function created by us below at the very end of this file
			return handleError(res,err);
		}
		if(!looks){
		return res.send(404);
		}
		console.log(looks);
		return res.status(200)
		.json(looks);
	})
}
exports.scrapeUpload = function (req,res){	
	var random = utils.randomizer(32, '01234567890abcdefghijklmnopqrstuvwxyz');
	console.log('hh');
	utils.downloadURI(req.body.image, '../client/assets/images/uploads/'+ random + '.png', function(filename){
		console.log('done');

		var newLook = new Look();
		newLook.title = req.body.title;
		newLook.email = req.body.email;
		newLook.linkURL = req.body.linkURL;
		newLook.description = req.body.description;
		newLook.userName = req.body.name;
		newLook._creator = req.body._creator;
		newLook.createTime = Date.now();
		newLook.upVotes = 0;
		newLook.image = filename.slice(9);
		// save is a mongoose method to save the data
		newLook.save(function(err,item){
		if(err){
			console.log('error occured saving image');
		} else {
			console.log('success');
			console.log(item);
			res.status(200)
			.json(item);
		}
		});



	})
}

function handleError(res, err){
	return res.send(500, err);
}

exports.index = function(req, res) {
 
    res.json(200, users);

};
/**
 * Get list of users
 * restriction: 'admin'
 */
//exports.index = function(req, res) {

//};