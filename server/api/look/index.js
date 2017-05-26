'use strict';

var controller = require('./look.controller');
// we require express because we need the routes utility of express
var express =  require('express');
var router = express.Router();

// auth is needed to protect our pages. only logged in users have to be allowed
var auth = require('../../auth/auth.service');

console.log('3');
router.post('/scrapeUpload', auth.isAuthenticated(), controller.scrapeUpload);
router.post('/upload', auth.isAuthenticated(), controller.upload);
console.log('4');
router.put('/:id', auth.isAuthenticated(), controller.update);

router.get('/', controller.index);
router.get('/getUserLooks', controller.userLooks);
// below we are creating a new route to retrive all the looks from the database (i.e using get method)
// allLooks is a fuction in the controller that will fetch the different images from db
router.get('/getAllLooks', controller.allLooks);

router.get('/:lookId', controller.singleLook);
router.get('/popLooks/:id', controller.popLooks);
router.delete('/:id', controller.delete);

module.exports = router;
