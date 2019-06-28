const express = require('express');
const app = express.Router();

/* GET auction page. */
app.get('/', function(req, res) {
  res.send('OK');

  /*
    web3 logic to fech all auctions from current contract and reeturn them as a json
    Algo we should make the current best bid always VISIBLE
  */
});

app.get('/new', function(req, res) {
  res.render('auctions', { title: 'Auctions Page'});
});

app.get('/bid', function(req, res) {
  res.send('OK');

  /*
    web3 logic to send a bid to the current auction
  */
});

app.post('/start', function (req, res) {
  let args = req.body;
  
  // web3 logic here
  
  res.json({
    deployed: true
  });

  /* Error Example
  res.json({
    deployed: false,
    error: "not enough ether"
  });
  */
});

app.post('/end', function (req, res) {
  res.json({
    cancelled: true
  });
});

module.exports = app;
