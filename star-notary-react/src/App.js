import React, { Component } from "react";
import Web3 from "web3";
import starNotaryArtifact from "./abis/StarNotary.json"; // Importing the JSON representation of the Smart Contract

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      starOwner: null,
      starName: "",
      status: "",
    };
  }

  async componentDidMount() {
    try {
      const web3 = new Web3("http://127.0.0.1:7545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId(); //This method find the network id to retrieve the configuration from truffle-config.js file
      const deployedNetwork = starNotaryArtifact.networks[networkId]; // Retrieve the Network configuration from truffle-config.js file
      const contract = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address
      ); // Initializing the contract
      this.setState({ web3, accounts, contract });
    } catch (error) {
      alert("Failed to load web3, accounts or contract");
    }
  }

  // function called to show the starName
  starNameFunc = () => {
    // calling the starName property from your Smart Contract.
    this.state.contract.methods
      .starName()
      .call()
      .then((starName) => {
        this.setState({ starName });
      });
  };

  // function called to show the starOwner
  starOwnerFunc = () => {
    this.state.contract.methods
      .starOwner()
      .call()
      .then((starOwner) => {
        this.setState({ starOwner });
      }); // calling the starOwner property from your Smart Contract.
  };

  // function called to claim a Star
  claimStarFunc = () => {
    this.state.contract.methods
      .claimStar()
      .send({ from: this.state.accounts[0] }); // Use `send` instead of `call` when you called a function in your Smart Contract
    this.starOwnerFunc();
    this.state.contract.methods
      .starOwner()
      .call()
      .then((status) => {
        console.log(status);
        this.setState({ status });
      });
  };

  render() {
    return (
      <div>
        <h1>StarNotary DAPP</h1>
        <br />
        <label htmlFor="name">Star Name:</label>
        <h3 id="name">Star Name: {this.state.starName}</h3>
        <br />
        <br />
        <button onClick={this.starNameFunc}>Get Star Name</button>
        <hr />
        <br />
        <label htmlFor="owner">Star Owner:</label>
        <h3 id="owner">Star Owner: {this.state.starOwner}</h3>
        <br />
        <br />
        <button onClick={this.starOwnerFunc}>Get Star Owner</button>
        <br />
        <br />
        <hr />
        <br />
        <h1>Claim Star</h1>
        <br />
        <br />
        <button id="claimStar" onClick={this.claimStarFunc}>
          Claim a Star
        </button>
        <br />
        <br />
        <br />
        <hr />
        <span id="status">{this.state.status}</span>
        <br />
      </div>
    );
  }
}

export default App;
