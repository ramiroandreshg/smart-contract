const express = require('express');
const i = require('./../tools/internals');

const app = express.Router();

var deployedContractAddress; // somewhere we must save the current deployed contract

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

  const output = {};
  
  try {
    deployedContractAddress = await i.deployContract(args);
    output.deployed = true;
  } catch (err) {
    console.log('Auction Start ERROR -> ', err);
    output.deployed = false;
  }
  
  res.json(output);
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
