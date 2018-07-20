import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';

class Browser extends Component {
  constructor() {
    super();
    this.state = {count: 0}
  }
  componentDidMount() {
     const web3 = new Web3(window.web3.currentProvider);

    // Initialize the contract instance

     const kittyContract = new web3.eth.Contract(
       KittyCoreABI, // import the contracts's ABI and use it here
       CONTRACT_ADDRESS
     );

    // Add the contract to the drizzle store
    console.log(kittyContract)
     this.context.drizzle.addContract({
       contractName: CONTRACT_NAME,
       web3Contract: kittyContract
     });
     debugger
     console.log(this.context.drizzle);

  }

  click(event){
    event.preventDefault();
    this.setState({count: this.state.count+1 });
    var state = this.context.drizzle.store.getState();
     if (state.drizzleStatus.initialized) {


       const dataKey = this.context.drizzle.contractList[0].methods.getKitty(123123).call();
       var result = 0;
       dataKey.then(function(result) {
         console.log(result) //will log results.
       })

       // birthTime - convert unix epoch time
       // generation
       // genes
       // for image - is stored on the web server -
       // storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/123123.svg
       // where 0x06012c8cf97bead5deae237070f9587f8e7a266d is ethereum address for CryptoKittiesCore
       // and 123123 is kittyId


       var account = result;

     }
  }


  render() {


    return (
      <div className="browser">
        <h1>
          Kitty Browser
        </h1>
        <button onClick={this.click.bind(this)}>click me</button>
        {/* Input to type in the kitty ID here */}

        {/* Display Kitty info here */}
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
