var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  res.render('index', { title: 'Express' });
});

module.exports = router;
