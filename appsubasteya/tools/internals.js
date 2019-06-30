const Web3 = require('web3');
const d = require('./deploy');

const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545')); //todo: config para urls repetidas en el codigo

exports = module.exports = {};

exports.deployContract = async function (args) {
  const accounts = await web3.eth.getAccounts();
  const owner = accounts[0];

  args.publicInfo = args.publicInfo === 'hide' ? true : false;
  const params = Object.values(args);

  const contractAddress = await d.deploy(owner, params);

  await _openAuction(owner, contractAddress);

  return contractAddress;
};

async function _openAuction (owner, contractAddress) {
  const contractInstance = new web3.eth.Contract(d.abi, contractAddress);

  return contractInstance.methods.openAuction().send({from: owner})
};

exports.getAllBids = async function (contractAddress) {
  if (!contractAddress) {
    throw new Error('undefined contract address');
  }

  const contractInstance = new web3.eth.Contract(d.abi, contractAddress);

  const bidsCount = await contractInstance.methods.getBidsCount().call();
  let bidList = [];
 
  if (bidsCount > 0) {
    for (let i = 1; i <= bidsCount.length; i++) { 
      try {
        const bid = await _getBid(bidNumber, contractInstance);
        bidList.push(bid);
      } catch (err) {
        console.log('Unable to fetch bid number #', i);
      }
    } 
  }

  return bidList;
};

async function _getBid(bidNumber, contractInstance) {
  return contractInstance.methods.getBid(bidNumber).call();
}