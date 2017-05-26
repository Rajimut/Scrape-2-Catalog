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
};

exports.userLooks = function(req, res) {
	//this is to filter the database for this particular usera (USING EMAIL ID)
	var userEmail = req.query.email;
	Look.find({
		email:{
			$in: userEmail
		}
	})
	.sort({
		createTime: -1

	})
	.exec(function(err, looks){
		if(err){
			return handleError(res, err);
		}
		console.log(looks);
		return res.status(200)
			.json(looks);
		});
};

exports.upload = function(req, res) {
	console.log('hiii');
  var newLook = new Look();
  var fileimage = req.middlewareStorage.fileimage;

  console.log(req.body);
  newLook.image = '/assets/images/uploads/' + fileimage;
  newLook.email = req.body.email;
  newLook.linkURL = req.body.linkURL;
  newLook.title = req.body.title;
  newLook.description = req.body.description;
  newLook.userName = req.body.name;
  newLook._creator = req.body._creator;
  newLook.createTime = Date.now();
  newLook.upVotes = 0;

  newLook.save(function(err, look) {
    if(err) {
      console.log('error saving look');
      return res.send(500);
    } else {
      console.log(look);
      res.status(200)
           .send(look);
    }
  });
};
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
		// slice is used for trimmimg the file name
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

// This method is to update a look
exports.update = function (req, res){
	if(req.body._id){
		delete req.body._id;
	}
	Look.findById(req.params.id, function(err, look){
		if(err){
			return handleError(res, err)
			}
		if(!look){
			return res.send(404);
		}
		// we are using _merge to save the new title description for a look
		var updated = _.merge(look, req.body);
		updated.save(function(err){
			if(err){
				return handleError(res, err);
			}
			console.log(look);
			return res.json(look);
		});
	});
}
// This method is used to find a single look, by passing the parameter for that look
// 
exports.singleLook = function(req, res) {
	Look.findById(req.params.lookId, function(err, look){
		if(err){
			return handleError (res, err);
		}
		if(!look) {
			return res.send(404);
		}
		return res.json(look);
	});
};

exports.popLooks = function(req, res) {
	Look.find(req.params.id)
	.sort('-upVotes')
	.limit(6)
	.exec(function(err, looks){
		if (err) {
			return handleError(res,err);
		}
		console.log(looks);
		return res.json(looks);
	});
};

// this method is to delete a look
// 
exports.delete = function(req, res) {
	Look.findById(req.params.id, function(err, look){
		if(err){
			return handleError(res, err);
		}
		if(!look) {
			return res.send(404);
		}
		look.remove(function(err){
			if(err) {
				return handleError(res, err);
			}
			return res.send(200);
		});

	});
};

exports.upload = function(req, res){
	var newLook = new Look();
	// req.middlewareStorage.fileimage is multer format
	var fileimage = req.middlewareStorage.fileimage;
	newLook.image = 'assets/images/uploads/' + fileimage;
	newLook.email = req.body.email;
	newLook.linkURL = req.body.linkURL;
	newLook.title = req.body.title;
	newLook.description = req.body.description;
	newLook.userName = req.body.name;
	newLook._creator = req.body._creator;
	newLook.createTime = Date.now();
	newLook.upVotes = 0;
	//newLook.image = filename.slice(9);
	newLook.save(function(err, look){
		if(err){
			console.log('error occured saving image');
			return res.send(500);
		} else {
			console.log('Success post saved');
			console.log(look);
			res.status(200)
			.send(look);
		}
	});

};

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