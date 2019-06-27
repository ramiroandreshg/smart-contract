var express = require('express');
var app = express.Router();

/* GET auction page. */
app.get('/', function(req, res) {
  res.render('index', { title: 'Auctions Page' });
});

app.get('/start', function (req, res) {
  console.log('starting auction');
  res.send('OK starting auction');
});

app.get('/end', function (req, res) {
  console.log('ending auction');
  res.send('OK ending auction');
});

/* ToDo: change get request to POST */

module.exports = app;
