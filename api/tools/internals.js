const AppError = require('./apperror');

exports = module.exports = {};

exports.createAuctionAndDeployContract = function (auction) {
  throw new AppError('app error', 404, "further explanation", true)

  if (!_validAuction(auction)) {
    throw new Error('invalid auction');
  }

};

function _validAuction (auction) {
  return true;
}