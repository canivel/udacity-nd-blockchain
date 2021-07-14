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
      starId: "",
      status: "",
    };

    // this.handleChangestarName = this.handleChangestarName.bind(this);
    // this.handleChangestarId = this.handleChangestarId.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChangestarName = (event) => {
    this.setState({starName: event.target.value});
  }

  handleChangestarId = (event) => {
    this.setState({starId: event.target.value});
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
  createStar = async(event) => {
    event.preventDefault();
    await this.state.contract.methods
      .createStar(this.state.starName, this.state.starId).send({from: this.state.accounts[0]});

    alert('Star minted: ' + this.state.starName);

    // calling the starName property from your Smart Contract.
    // await this.state.contract.createStar(this.state.starName, this.state.starId, {from: this.state.accounts[0]});
    // this.setState({status: "New Star Owner is " + this.state.accounts[0] });
  }

  

  render() {
    return (
      <div>
        <h1>StarNotary DAPP</h1>
        <br />
        <h1>Create a Star</h1>
        <form  onSubmit={this.createStar}>
        <br />Star Name: <input type="text" id="starName"  value={this.state.starName} onChange={this.handleChangestarName} />
        Star Name will be, {this.state.starName}
        <br />Star ID:<input type="text" id="starId" value={this.state.starId} onChange={this.handleChangestarId} />
        <br />
        <input type="submit" value="Create Star" />
        </form>
        <br />

        <span id="status">{this.state.status}</span>
      </div>
    );
  }
}

export default App;
