var Comment = require('./comment.model');
var express = require('express');

// add comment is going to be a post method
// first thing to do a post is grabbing a reference to the model
// here thr reference is done by newComment = new Comment();
exports.addComment = function(req,res){

	var newComment = new Comment();
	newComment.author.id = req.body.authorId;
	// req.body.authorId is set in the front end
	newComment.author.name = req.body.authorName;
	newComment.author.email = req.body.authorEmail;
	newComment.gravatar = req.body.gravatar;
	newComment.comment = req.body.comment;
	newComment.lookId = req.body.lookId;
	newComment.createTime = Date.now();

	// saving this into our database using builtin save method
	newComment.save(function(err, comment){
		if(err){
			console.log('error saving comment');
			return res.send(500);
		} else{
			console.log(comment);
			res.status(200)
				.json(comment);
		}
	});
};

exports.getComments = function(req, res){
	Comment.find({
		// we use the parameter associated with the look to figure out all the comments of a look from the database
		'lookId': req.params.id
	})
	.sort({
		createTime: -1
	})
	.exec(function(err, comments){
		if(err){
			return res.send(500);
		}
		if(!comments){
			return res.send(404);
		}
		console.log(comments);
		return res.status(200)
		.json(comments);
	});
}