const express = require('express');
const i = require('./../tools/internals');
const log = require('./../tools/logger');

const app = express.Router();

app.get('/', async function(req, res) {
  try {
    const auctions = i.getAllAuctions();
    return res.status(200).json(auctions);
  } catch (err) {
    log.error('getAllAuctions', err.message);
    return res.status(err.httpCode).json(err);
  }
});

app.get('/:auctionId', function (req, res) {

});

app.post('/', async function(req, res) {
  try {
    auction = await i.createAuction(args);
  } catch (err) {

    return res.status(err.httpCode).json(err);
  }

  return res.json({'out': 'put'});
});

app.put('/:auctionId', function (req, res) {

});

app.delete('/:auctionId', function (req, res) {

}); 

module.exports = app;
