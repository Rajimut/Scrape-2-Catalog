'use strict';

var controller = require('./look.controller');
// we require express because we need the routes utility of express
var express =  require('express');
var router = express.Router();

// auth is needed to protect our pages. only logged in users have to be allowed
var auth = require('../../auth/auth.service');
router.post('/scrapeUpload', auth.isAuthenticated(), controller.scrapeUpload);
router.get('/', controller.index);
// below we are creating a new route to retrive all the looks from the database (i.e using get method)
// allLooks is a fuction in the controller that will fetch the different images from db
router.get('/getAllLooks', controller.allLooks);

module.exports = router;
