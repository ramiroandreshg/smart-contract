const express = require('express');
const i = require('./../tools/internals');

const app = express.Router();
const currentContracts = [];

app.get('/', function(req, res) {
  try {
    i.createAuctionAndDeployContract('args');
  } catch (e) {
    console.log('ERRORRRR', e.message);
  }
  res.json(currentContracts);
});

app.post('/', async function(req, res) {
  const args = req.body;

  try {
    auction = await i.createAuctionAndDeployContract(args);
  } catch (err) {
    // handle it
  }

  return res.json({'out': 'put'});

});

module.exports = app;
