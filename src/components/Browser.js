import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';
import KittyIndex from './kitty_index'

class Browser extends Component {
  constructor() {
    super();
    //this.handleClick = this.handleClick.bind(this);
    this.state = {birthdate: '', genes: '', kittyId: '', generation: '', idBool:false};
    this.handleClick = this.handleClick.bind(this);
    this.handleClickRandom = this.handleClickRandom.bind(this);
  }

  componentDidMount() {
     const web3 = new Web3(window.web3.currentProvider);

    // Initialize the contract instance
     const kittyContract = new web3.eth.Contract(
       KittyCoreABI, // import the contracts's ABI and use it here
       CONTRACT_ADDRESS
     );
    // Add the contract to the drizzle store
     this.context.drizzle.addContract({
       contractName: CONTRACT_NAME,
       web3Contract: kittyContract
     });
  }

  //update kittyId state on each keystroke
  update(field){
    return (e) => {
      this.setState({[field]: e.target.value, idBool:false});
    };
  }

  handleClickRandom(event){
    event.preventDefault();
    var state = this.context.drizzle.store.getState();
    let that = this;
    let url = 'https://api.cryptokitties.co/kitties?limit=1';
    let mostRecentKitty = 0;
    //fetch JSON from url, by limiting to 1, we will receive most recent kittyID constructed in cryptokitties api
    fetch(url)
      .then(result => result.json())
      .then((output) => {
        console.log('Checkout this JSON! ', output);
        mostRecentKitty = output.kitties[0].id;
        //1 to mostRecentKitty created inclusive
        let randomId =  Math.floor(Math.random() * (mostRecentKitty)) + 1;

         if (state.drizzleStatus.initialized) {
           const dataKey = this.context.drizzle.contractList[0].methods.getKitty(randomId).call();
           // var result = 0;
           dataKey.then(function(result) {
             that.setState({ kittyId: randomId, birthdate : result.birthTime, genes: result.genes, generation: result.generation, idBool: true});
           });
         }
      })
    .catch(err => { throw err });


  }
  handleClick(event){
    event.preventDefault();
    // this.setState({count: this.state.count+1 });
    var state = this.context.drizzle.store.getState();
    var that = this;
    var birthdate = '';
     if (state.drizzleStatus.initialized) {
       const dataKey = this.context.drizzle.contractList[0].methods.getKitty(this.state.kittyId).call();
       dataKey.then(function(result) {
         that.setState({kittyId: that.state.kittyId, birthdate : result.birthTime, genes: result.genes, generation: result.generation, idBool: true});
       });
     }
  }


  render() {
    return (
      <div className="browser">
        <h1>
          Kitty Browser
        </h1>
        <div>
          <form onSubmit={this.handleClick.bind(this)}>
            <label> Kitty ID:
              <input className='input'
                type= 'text'
                value= {this.state.kittyId}
                onChange= {this.update('kittyId')}
                />
            </label>
            <input className='button' type="submit" value='Find Kitty' />
            <button className='button button-random' onClick={this.handleClickRandom}>Random Kitty</button>
          </form>
        </div>

        <KittyIndex birthdate = {this.state.birthdate} genes = {this.state.genes}
          generation = {this.state.generation} kittyId = {this.state.kittyId} idBool = {this.state.idBool} />

      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
