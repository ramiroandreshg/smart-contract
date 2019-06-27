var express = require('express');
var app = express.Router();
var handlebars = require('handlebars');

/* GET auction page. */
app.get('/', function(req, res) {
  console.log(handlebars.partials);
  res.render('auctions', { title: 'Auctions Page' });
});

app.post('/start', function (req, res) {
  console.log('starting auction');
  res.send('OK starting auction');
});

app.get('/end', function (req, res) {
  console.log('ending auction');
  res.send('OK ending auction');
});

/* ToDo: change get request to POST */

module.exports = app;
