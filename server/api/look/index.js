'use strict';

var controller = require('./look.controller');
// we require express because we need the routes utility of express
var express =  require('express');
var router = express.Router();

// auth is needed to protect our pages. only logged in users have to be allowed
var auth = require('../../auth/auth.service');
router.post('/scrapeUpload', auth.isAuthenticated(), controller.scrapeUpload);
router.get('/', controller.index);

module.exports = router;
