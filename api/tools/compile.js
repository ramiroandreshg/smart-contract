const path = require('path');
const fs = require('fs');
const solc = require('solc');

//Root dir
const contractPath = path.resolve(__dirname + '/../','contracts','Subasteya.sol');

const compilerInput = {
    language: "Solidity",
    sources: {
        'Subasteya': { content: fs.readFileSync(contractPath, 'utf8') }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": [ "abi", "evm.bytecode" ]
        }
      }
    }
};

const compiledContract = JSON.parse(solc.compile(JSON.stringify(compilerInput)));

if(compiledContract.errors) {
    compiledContract.errors.forEach(err => console.log(err.formattedMessage));
}

const contract = compiledContract.contracts['Subasteya'].Subasteya;
const abi = contract.abi;
const abiPath = path.resolve(__dirname + '/../','contracts','abi.json');
fs.writeFileSync(abiPath, JSON.stringify(abi, null, 2));

const bytecode = contract.evm;
const byteCodePath = path.resolve(__dirname + '/../','contracts','bytecode.json');
fs.writeFileSync(byteCodePath, JSON.stringify(bytecode, null, 2));