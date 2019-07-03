const HDWalletProvider = require('truffle-hdwallet-provider');

exports = module.exports = {};

const testnet = 'https://rinkeby.infura.io/v3/969c6e3184564fa68c449771085e8ef1';

const privateKeys = [
    "24F550D7E96220C0548C305A982AD0529D8341C9A4E7681BC5A3F6CFB949E88F",
    "644125D610863DF22992F9D5D68CA24C457EAEB016012A244FB106F4A09B00F8",
  ];

const _provider = new HDWalletProvider(
    privateKeys,
    testnet,
    0,
    privateKeys.length
);

exports.HDWalletProvider = _provider;