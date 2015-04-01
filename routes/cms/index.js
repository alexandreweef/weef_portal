var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );
var session = require('express-session')

/* GET LOGIN. */
router.get('/', function(req, res, next) {
  res.render('cms/index', { title: 'Weef - CMS' });
});

//post login
router.post('/', function(req, res, next) {
	var query = User.where({ username: req.body.email, password: req.body.password });
	query.findOne(function (err, users) {
		
		if (err) return console.error(err);	

		if(users){
			var user = req.session.user;

			if (!user) {
				user = req.session.user = {};
			}
			user.auth = true;
			user.detail = users;
			res.redirect("/cms/dashboard/");
		} else {
			res.render('cms/index', { title: 'Weef - Login inválido', error: "Usuário ou senha inválidos." });
		}

	});

});

module.exports = router;
