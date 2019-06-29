// const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
// const ganache = require("ganache-cli");

const abi = require('./../contracts/abi.json');
const bytecode = require('./../contracts/bytecode.json');

//const web3 = new Web3(provider);


exports = module.exports = {};

exports.deploy = async (account, params) => {
  const _bytecode = '0x' + bytecode.bytecode.object;
  
  const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545'));
  const result = await new web3.eth.Contract(abi)
  .deploy({
    data: _bytecode,
    arguments: params
  })
  .send({
    gas: '3000000', 
    from: account,
    value: 0
  });
  console.log('contract address: '+ result.options.address);
  return result.options.address;
}

