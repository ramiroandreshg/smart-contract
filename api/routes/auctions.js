const express = require('express');
const i = require('./../tools/internals');
const log = require('./../tools/logger');

const app = express.Router();

app.get('/', async function(req, res) {
  try {
    const auctions = i.getAllAuctions();
    return res.status(200).json(auctions);
  } catch (err) {
    log.error('getAllAuctions:', err.internalMsg);
    return res.status(err.httpCode).json(err.getMessage());
  }
});

app.get('/:auctionId', function (req, res) {
  try {
    const auctionId = req.params.auctionId;
    const auction = i.getAuction(auctionId);
    return res.status(200).json(auction);
  } catch (err) {
    log.error('getAuction:', err.internalMsg);
    return res.status(err.httpCode).json(err.getMessage());
  }
});

app.post('/', async function(req, res) {
  try {
    const args = req.body;
    console.log('args', args);
    const auction = await i.createAuction(args);
    return res.status(200).json(auction);
  } catch (err) {
    log.error('createAuction:', err.internalMsg);
    return res.status(err.httpCode).json(err.getMessage());
  }
});

app.put('/:auctionId', function (req, res) {
  return res.status(403).json({
    error: 'Update action not available'
  });
});

app.delete('/:auctionId', async function (req, res) {
  return res.status(500).json({
    error: 'To do'
  });

  const auctionId = req.params.auctionId;
  await i.deleteAuction(auctionId);
}); 

module.exports = app;
