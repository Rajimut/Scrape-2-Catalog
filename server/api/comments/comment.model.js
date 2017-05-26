'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	author: {
		id: {
			type: Schema.ObjectId,
			ref: 'User'
		},
		// this is a typical mongoDB way of referencing properties of one model to another
		// User is one model with name n string properties
		// the user model is referenced here for author in comment model schema using term ref
		name: {
			type:String
		},
		email: {
			type: String
		}
	},
	lookId: {
		type: Schema.ObjectId,
		ref: 'Look'
	},
	gravatar: {
		type: String
	},
	comment: {
		type: String,
		trim: true
	},
	createTime: {
		type: Date,
		'default': Date.now
	}
});
// naming our schema as Comment in case u want to reference outside
module.exports = mongoose.model('Comment', CommentSchema);