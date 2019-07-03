const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

exports = module.exports = {};

const mnemonic = 'unveil dynamic pride someone local since quantum buffalo trick swear quit stay';
const testnet = 'https://rinkeby.infura.io/v3/969c6e3184564fa68c449771085e8ef1';

let _provider = new HDWalletProvider(
    mnemonic,
    testnet
);

_provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545')

exports.HDWalletProvider = _provider;
