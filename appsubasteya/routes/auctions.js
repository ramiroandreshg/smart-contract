const express = require('express');
const app = express.Router();

/* GET auction page. */
app.get('/', function(req, res) {
  res.render('auctions', { title: 'Auctions Page'});
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
  console.log('ending auction');
  res.send('OK ending auction');
});

module.exports = app;
