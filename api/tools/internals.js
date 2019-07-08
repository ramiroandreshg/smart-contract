const AppError = require('./apperror');
const smc = require('./smart-contract');

exports = module.exports = {};

exports.getAllAuctions = function () {  
  // ToDo
  return [
    {
      name: 'auction 1',
      description: 'auct 1 desc'
    }
  ];
  // in case of an error: throw new AppError('the message', 'the error common name', httpCode);
  // EG: throw new AppError('Couldnt find resource ${resource}', 'Resource not found', 404);
}

exports.getAuction = function (auctionId) {
  if (!auctionId) {
    throw new AppError('Missing auction id', 'Bad Request', 400);
  }

  const found = true; // dummy check to avoid throwing error
  if (!found) {
    throw new AppError(
      `Auction with id: ${auctionId} doesnt exist`, 
      'Error trying to lookup an auction that doesnt exist', 
      'Not Found', 404);
  }

  return {
    name: 'auction n',
    description: 'auct N desc'
  }
}

exports.createAuction = async function (auctionInfo) {
  const auction = _buildAuction(auctionInfo);
  
  await smc.deploySmartContract(auctionInfo);
  
  _saveAuction(auction);

  return auction;
}

exports.deleteAuction = async function (auctionId) {
  // find auction address (contract address)
  const contractAddress = _findContractAddress(auctionId);
  // ask smc to disable contract (awaits)
  await disableSmartContract(contractAddress)
  // remove auction from db (whatever method is used)
  _deleteAuction(auctionId);
}

function _buildAuction (auctionInfo) {
  _validateAuction(auctionInfo);
  // We could parse auctionInfo as an auction object (ES6 class)
  return auctionInfo;
}

function _validateAuction (auctionInfo) {
  // validate all data types
  
  /*
  if some property of auctionInfo is wrong then: 

  throw new AppError(
    'Invalid auction', 
    'invalid auction due to wrong property ${prop name here} with value ${wrong property value/type/etc}', 
    'Bad Request', 400);
  */
  
  return true;
}

function _saveAuction (auction) {
  // save the new auction into some json or db
}

function _deleteAuction (auctionId) {
  // save the new auction into some json or db
}

function _findContractAddress (auctionId) {
  return '0x0';
}