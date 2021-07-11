import React, { useState, useEffect } from "react";
import Web3 from "web3";
import starNotaryArtifact from "./abis/StarNotary.json"; // Importing the JSON representation of the Smart Contract

const App = () => {
  const [state, setState] = useState({
    web3: null, accounts: null, contract: null
  });
  const [status, setStatus] = useState("");
  const [starOwner, setStarOwner] = useState("");
  const [starName, setStarName] = useState("");

  useEffect(async () => {
    const init = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const accounts = await web3.eth.getAccounts();
        const networkId = 5777 //await web3.eth.net.getId(); //This method find the network id to retrieve the configuration from truffle-config.js file
        const deployedNetwork = starNotaryArtifact.networks[networkId]; // Retrieve the Network configuration from truffle-config.js file
        const contract = new web3.eth.Contract(starNotaryArtifact.abi, deployedNetwork.address) // Initializing the contract
        setState({web3, accounts, contract});
      } catch(error) {
        alert('Failed to load web3, accounts or contract')
        console.error(error)
      }
    }
    init();
  }, []);

  // function called to show the starName
  async function starNameFunc() {
    const { starName } = state.contract.methods; // to be able to use the functions in your Smart Contract use destructuring to get the function to be call
    const response = await starName().call(); // calling the starName property from your Smart Contract.
    setStarName(response);
    return starName;
  }

  // function called to show the starOwner
  async function starOwnerFunc() {
    const { starOwner } = state.contract.methods; // to be able to use the functions in your Smart Contract use destructuring to get the function to be call
    const response = await starOwner().call(); // calling the starOwner property from your Smart Contract.
    setStarOwner(response);
    return starOwner;
  }

  // function called to claim a Star
  async function claimStarFunc() {
    const { claimStar, starOwner } = state.contract.methods; // to be able to use the functions in your Smart Contract use destructuring to get the function to be call
    await claimStar().send({ from: state.accounts[0] }); // Use `send` instead of `call` when you called a function in your Smart Contract
    const response = await starOwner().call();
    setStatus("New Star Owner is " + response + ".");
  }

  return (
    <div>
      <h1>StarNotary DAPP</h1>
      <br />
      <label for="name">Star Name:</label>
      <h3 id="name">Star Name: {starName}</h3>
      <br />
      <br />
      <button onclick="starNameFunc">Get Star Name</button>
      <hr />
      <br />
      <label for="owner">Star Owner:</label>
      <h3 id="owner">Star Owner: {() => starOwnerFunc}</h3>
      <br />
      <br />
      <button onclick="starOwnerFunc">Get Star Owner</button>
      <br />
      <br />
      <hr />
      <br />
      <h1>Claim Star</h1>
      <br />
      <br />
      <button id="claimStar" onclick="claimStarFunc">
        Claim a Star
      </button>
      <br />
      <br />
      <br />
      <hr />
      <span id="status">{status}</span>
      <br />
    </div>
  );
}

export default App;