const web3 = require("web3");
const ganache_endpoint = "http://127.0.0.1:7545";
const webganache = new web3(ganache_endpoint);

async function getAccounts() {
  accounts = await webganache.eth.getAccounts();
  return accounts;
  // do whatever you need with vm.feed below
}
let rootAccount = "0";
webganache.eth.getAccounts().then((accs) => {
  rootAccount = accs[0];
});

setTimeout(() => console.log(rootAccount), 100); //this logs 'foo'
