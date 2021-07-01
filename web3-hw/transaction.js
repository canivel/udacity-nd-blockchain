/*##########################

CONFIGURATION
##########################*/

// -- Step 1: Set up the appropriate configuration
var Web3 = require("web3");
var EthereumTransaction = require("ethereumjs-tx").Transaction;
var web3 = new Web3("http://127.0.0.1:7545");

// -- Step 2: Set the sending and receiving addresses for the transaction.
var sendingAddress = "0x2180518DFa7d89Cc0D5dc9cb3D6569F41a79383a";
var receivingAddress = "0xaBAB71A5c00C594d065A55798C47f8A1Dd0D82D5";

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

/*##########################

CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown
var rawTransaction = {
  nonce: 5,
  to: receivingAddress,
  gasPrice: 20000000,
  gasLimit: 30000,
  value: 200000000,
  data: "0x",
};

// -- Step 5: View the raw transaction rawTransaction

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

// Note: They haven't changed because they need to be signed...

/*##########################

Sign the Transaction
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
var privateKeySender =
  "313a9a826aa2a8c74b1091cb327907415a1bb02f7cb2d49e1c3ca754983f29b3";
var privateKeySenderHex = new Buffer.from(privateKeySender, "hex");
var transaction = new EthereumTransaction(rawTransaction);
transaction.sign(privateKeySenderHex);

/*#########################################

Send the transaction to the network
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);

web3.eth.getGasPrice().then(console.log);

web3.eth.getUncle(500, 0).then(console.log);

web3.eth.getBlockTransactionCount(sendingAddress).then(console.log);

web3.eth.getBlockTransactionCount(receivingAddress).then(console.log);
