const express = require('express');
const i = require('./../tools/internals');

const app = express.Router();
let deployedContractAddress;

app.get('/new', function(req, res) {
  res.render('auctions', { title: 'Auctions Page'});
});

app.post('/start', async function (req, res) {
  const args = req.body;

  const output = {};
  try {
    deployedContractAddress = await i.deployContract(args);
    output.success = true; // should handle this with HTTP error codes 
    output.auctionAddress = deployedContractAddress;
  } catch (err) {
    console.log('Auction Start ERROR -> ', err);
    output.success = false;
    output.error = err;
  }
  
  res.json(output);
});

app.post('/end', async function (req, res) {
  const args = req.body;
  
  const output = {};
  try {
    await i.closeAuction(deployedContractAddress, args);
    output.success = true;
  } catch (err) {
    console.log('End Auction ERROR -> ', err.message);
    output.success = false;
    output.error = err.message;
  }
  
  res.json(output);
});

/*
app.get('/bids', async function(req, res) {
  let output = {};
  try {
    const bidList = await i.getAllBids(deployedContractAddress);
    output = bidList;
  } catch (err) {
    console.log('Bid List Start ERROR -> ', err.message);
    output.error = err.message;
  }
  
  res.json(output);
});
*/

app.get('/bid', function(req, res) {
  res.render('bid', { title: 'Bid Page'});
});

app.post('/bid', async function(req, res) {
  const args = req.body;

  const output = {};
  try {
    await i.placeBid(deployedContractAddress, args);
    output.success = true;
  } catch (err) {
    console.log('Place Bid ERROR -> ', err.message);
    output.success = false;
    output.error = err.message;
  }
  
  res.json(output);
});

////////////

app.get('/bids', function(req, res) {
  res.json([
    {
      address: 'addr1',
      amount: 1
    },
    {
      address: 'addr1',
      amount: 1
    },
    {
      address: 'addr2',
      amount: 1
    },
    {
      address: 'addr5',
      amount: 1
    },
  ]);
});



module.exports = app;
