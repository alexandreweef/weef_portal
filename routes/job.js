var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:slug', function(req, res, next) {
	var slug = req.params.slug;
	switch(slug){
		case "cachaca-51":
			res.render('job_cachaca-51', { title: 'Weef', param: req.params.slug });
		break;
		case "bike-da-firma":
			res.render('job_bike-da-firma', { title: 'Weef', param: req.params.slug });
		break;
		case "sabin-vacinas":
			res.render('job_sabin-vacinas', { title: 'Weef', param: req.params.slug });
		break;
		case "pascoa-havanna":
			res.render('job_pascoa-havanna', { title: 'Weef', param: req.params.slug });
		break;
		default:
			res.redirect('/');
		break;
	}
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weef' });
});

module.exports = router;
