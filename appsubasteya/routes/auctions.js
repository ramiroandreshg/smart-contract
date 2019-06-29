const express = require('express');
const i = require('./../tools/internals');

const app = express.Router();

var deployedContract; // somewhere we must save the current deployed contract

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

app.post('/start', async function (req, res) {
  const args = req.body;

  const result = await i.deployContract(args);

  console.log('END START', result);
  
  
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

app.get('/bid', function(req, res) {
  res.send('OK');

  /*
    web3 logic to send a bid to the current auction
  */
});

module.exports = app;
