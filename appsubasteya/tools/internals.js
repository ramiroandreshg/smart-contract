const Web3 = require('web3');
const d = require('./deploy');

exports = module.exports = {};

exports.deployContract = async function (args) {
  const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545')); //todo: config para urls repetidas en el codigo
  const accounts = await web3.eth.getAccounts();

  args.publicInfo = args.publicInfo === 'hide' ? true : false;
  const params = Object.values(args);

  let contractAddress = '0x0rh';
  try {
    contractAddress = await d.deploy(accounts[9], params);
  } catch (err) { 
    console.log('err -> ', err);
  }

  console.log('contractAddress', contractAddress);
  return contractAddress;
}