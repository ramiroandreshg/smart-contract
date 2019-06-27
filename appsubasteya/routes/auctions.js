var express = require('express');
var app = express.Router();
var handlebars = require('handlebars');

/* GET auction page. */
app.get('/', function(req, res) {
  res.render('auctions', { title: 'Auctions Page' });
});

app.post('/start', function (req, res) {
  console.log('starting auction', req.body);
  res.json({ok: 'ok!'});

  // web3 logic here
});

app.post('/end', function (req, res) {
  console.log('ending auction');
  res.send('OK ending auction');
});

module.exports = app;
