'use strict';

// file created by raji for looks api
var mongoose = require('mongoose');
// Schema from mongoose is needed because we are creating a new schema called LookSchema (table like) for saving various pin (each pin has a description, tags etc) that each user has in my looks page
var Schema = mongoose.Schema;

var LookSchema = new Schema{{
	image: String;
	linkURL: Srting;
	title: String;
	description: String;
	tags: [{
		type: String;
	}],
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	email: String,
	userName: String,
	createTime; {
		type: Date,
		'default': Date.now
	},
	views: {
		type: Number,
		'default': 0
	},
	upVotes: {
		type: Number,
		'default': 0
	}
}}
// export module is used to export the module so that it can be used in another place
module.exports = mongoose.model('Look', LookSchema);

