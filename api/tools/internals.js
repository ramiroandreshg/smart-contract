const AppError = require('./apperror');

exports = module.exports = {};

exports.createAuctionAndDeployContract = function (auction) {
  if (!_validAuction(auction)) {
    throw new AppError('invalid auction', 'Bad Request', 400); // http code 422 could be more descriptive here
  }

};

function _validAuction (auction) {
  return false;
}