const HDWalletProvider = require('truffle-hdwallet-provider');

exports = module.exports = {};

const mnemonic = 'unveil dynamic pride someone local since quantum buffalo trick swear quit stay';
const testnet = 'https://rinkeby.infura.io/v3/969c6e3184564fa68c449771085e8ef1';

const _provider = new HDWalletProvider(
    mnemonic,
    testnet
);

exports.HDWalletProvider = _provider;
