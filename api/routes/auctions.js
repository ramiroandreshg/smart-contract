const express = require('express');
const i = require('./../tools/internals');

const app = express.Router();
const currentContracts = [];

app.get('/', async function(req, res) {
  // res.json(currentContracts);


  const args = req.body;
  
  try {
    auction = await i.createAuctionAndDeployContract(args);
  } catch (err) {
    // perhaps logging it could be handy
    return res.status(err.httpCode).json(err);
  }

  return res.json({'out': 'put'});

});

/*
ToDo: 
app.post('/', async function(req, res) {

});

*/

module.exports = app;
