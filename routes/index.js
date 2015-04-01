var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weef' });
});

/* GET home page. */
router.get('/equipe', function(req, res, next) {
  res.render('equipe', { title: 'Weef' });
});

module.exports = router;
