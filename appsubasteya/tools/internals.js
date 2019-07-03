const Web3 = require('web3');
const d = require('./deploy');
const provider = require('./provider');

const web3 = new Web3(provider.HDWalletProvider);

exports = module.exports = {};

exports.deployContract = async function (args) {
  let owner;
  if (!args.ownerAddress) {
    const accounts = await web3.eth.getAccounts();
    owner = accounts[0];
  } else {
    owner = args.ownerAddress;
    delete args.ownerAddress;
  }

  args.publicInfo = args.publicInfo === 'hide' ? true : false;
  const params = Object.values(args);
  const contractAddress = await d.deploy(owner, params);

  await _openAuction(owner, contractAddress);

  return contractAddress;
};

async function _openAuction (owner, contractAddress) {
  const contractInstance = new web3.eth.Contract(d.abi, contractAddress);

  return contractInstance.methods.openAuction().send({
    gas: '3000000',
    from: owner
  });
};

exports.getAllBids = async function (contractAddress) {
  if (!contractAddress) {
    throw new Error('undefined contract address');
  }

  const contractInstance = new web3.eth.Contract(d.abi, contractAddress);

  const bidsCount = await contractInstance.methods.getBidsCount().call();
  let bidList = [];
  let bid;
 
  if (bidsCount > 0) {
    for (let i = 1; i <= bidsCount; i++) { 
      try {
        bid = await _getBid(i, contractInstance);
        bidList.push(bid);
      } catch (err) {
        console.log('Unable to fetch bid number #', i);
        console.log('error: ', err);
      }
    } 
  }

  return bidList;
};

async function _getBid(bidNumber, contractInstance) {
  const bid = await contractInstance.methods.getBid(bidNumber).call();
  
  return {
    bidNumber,
    bidderAddress: bid.bidder,
    amount: bid.amount
  }
};

exports.placeBid = async function (contractAddress, args) {
  if (!contractAddress) {
    throw new Error('undefined contract address');
  }

  const contractInstance = new web3.eth.Contract(d.abi, contractAddress);

  const bidder = args.address;
  const amount = args.amount;

  await contractInstance.methods.bid().send({
    gas: '3000000',
    from: bidder,
    value: amount
  });
};

exports.closeAuction = async function (contractAddress, args) {
  const owner = args.owner;
  
  const contractInstance = new web3.eth.Contract(d.abi, contractAddress);
  await contractInstance.methods.closeAuction().send({
    gas: '3000000',
    from: owner
  });
};