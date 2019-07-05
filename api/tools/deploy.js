const Web3 = require('web3');
const provider = require('./provider');

exports = module.exports = {};

const bytecode = require('./../contracts/bytecode.json');
const _bytecode = '0x' + bytecode.bytecode.object;

const _abi = require('./../contracts/abi.json');

exports.deploy = async (account, params) => {
  const web3 = new Web3(provider.HDWalletProvider);
  const result = await new web3.eth.Contract(_abi)
  .deploy({
    data: _bytecode,
    arguments: params
  })
  .send({
    gas: '3000000', 
    from: account,
    value: 0
  });

  console.log('contract address', result.options.address);
  
  return result.options.address;
}

exports.abi = _abi;
exports.bytecode = _bytecode;

