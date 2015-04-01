var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var session = require('express-session');
var Post = mongoose.model( 'Post' );
var routes_auth = require('./auth');
var fs = require('fs');

/* GET LOGIN. */
router.get('/', routes_auth.isLoggedIn, function(req, res, next) {
	var user = req.session.user;
	res.render('cms/dashboard', { title: 'Weef - '+ user.detail.name });
});

router.get('/add', routes_auth.isLoggedIn, function(req, res, next) {
	var user = req.session.user;
	res.render('cms/post_form', { title: 'Weef - '+ user.detail.name });
});

router.post('/upload', routes_auth.isLoggedIn, function(req, res, next) {
	fs.readFile(req.files.displayImage.path, function (err, data) {
		var newPath = __dirname + "/uploads/uploadedFileName";
		fs.writeFile(newPath, data, function (err) {
			res.redirect("back");
		});
	});
});


module.exports = router;
