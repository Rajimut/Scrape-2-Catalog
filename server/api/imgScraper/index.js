'use strict';

// we dont need a imgScraper.model.js file because the data we get through this api
// is going to be stored in look model

var controller = require('./imgScraper.controller');
// we require express because we need the routes utility of express
var express =  require('express');
var router = express.Router();

// auth is needed to protect our pages. only logged in users have to be allowed
var auth = require('../../auth/auth.service');

// there is one router.post in here. It is post call meaning it is gonna post all details to /scrape. 
// It will call api/links/scrape
// that is once an user inputs url of pintrest then this route s gonna be called
// we want to allow this only for logged in users
// 
router.post('/scrape', auth.isAuthenticated(), controller.scrape);
//controller.scrape is the method going to be defined in controller
module.exports = router;