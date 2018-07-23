# Kitty Browser

CryptoKitty Notes

Browser Component(Parent)
  Constructor
    state will hold all necessary data: birthdate, genes, kittyId, generation, idBool
  componentDidMount
    Initialize the contract instance and import the contracts's ABI
    Add the contract to the drizzle store
  Update
    update kittyId state on each keystroke from the input field
    set idBool to false,
  handleClick
    event handler that makes a web3 call to getKitty(), passing in the user input. Retrieves relevant kitty information
  handleClickRandom
    fetch JSON from url, by limiting to 1, we will receive most recent kittyID constructed in the cryptokitties api. We will choose a random kitty (inclusive of 1 through mostRecentKitty Id number)
  render
    contains a form for user to fill out kitty id and click getKitty submit button, as well as a button for randomKitty
    contains a KittyIndex component which will have all relevant props passed to it

  KittyIndex Component(Child)
    render
      renders all relevant kitty information including image, birth date, genes, and generation

      crypto-kitties images are stored on google storage, we get the initial url, concat with the ethereum address for CryptoKittiesCore, and kittyId, to ultimately get the image svg that we set in the img tag.






![](https://i.imgur.com/A7D2gMb.png)

[CryptoKitties](http://cryptokitties.co) is one of the most popular distributed apps on the Ethereum Network. It's a game that allows players to purchase, collect, breed and sell various types of virtual cats.

To be able to run CryptoKitties on your browser you'll need to install [Metamask](http://metamask.io/) or use a dedicated Ethereum browser like Mist or Parity.

For this challenge you will create a simple UI that will be able to interact with the Ethereum Blockchain, using web3.js and the [drizzle](https://truffleframework.com/docs/drizzle/getting-started) library. This UI will allow the user to type in a CryptoKitty's ID, and will display information about that Kitty.

# Requirements to complete this challenge

- Use the code provided in this repo as a starting point to build your solution
- Given the address for the CryptoKitties Smart Contract: `0x06012c8cf97bead5deae237070f9587f8e7a266d` Find its *ABI* (You will need it to complete the challenge)
- Build a simple UI where the user can type in an ID and display the following information about a Kitty:
  - Genes
  - Birth time
  - Generation
- You will get extra points if you also display the Kitty's picture. 🏅
- You will get extra points if you create a "Fetch random Kitty" button. 🏅
- Feel free to customize the styles as you wish or use any extra libraries that you need


## The result should look somethig like this:

![kitty browser](https://i.imgur.com/YQdKma5.png)

# Hints
- You will need to use the `drizzle` instance available on React's context (See components/Browser.js)
- You will need to explore the smart contract `methods` to find out which one will get you the kitty's info (This operation won't require spending any ether)

# Setting up your dev environment

- Install and setup Metamask in your browser
- Clone this repo, to be used as a starting point for your solution
- Install the dependencies and run the development server

# Code Overview

This repo contains a few components that will be useful for you to complete this project. These components are based on the [drizzle-react](https://github.com/trufflesuite/drizzle-react) examples

### containers/Loading.js

Shows a Loading message while drizzle is being initialized or an error message if the browser is not *web3 enabled*

```Javascript
if (window.web3 === undefined || this.props.web3.status === 'failed') {
      return(
        // Display a web3 warning.
        <div className="warning">
          <p>This browser has no connection to the Ethereum network. </p>
          <p>Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
        </div>
      );
    }

    if (this.props.drizzleStatus.initialized) {
      // Load the dapp.
      return Children.only(this.props.children);
    }

    return(
      // Display a loading indicator.
      <div className="loading">
        <h1>Loading dapp...</h1>
        <img src="https://www.cryptokitties.co/images/loader.gif" width="120" alt="loading" />
      </div>
    );
```

## App.js

Initializes the `DrizzleProvider` and wraps your app with the `Loading` component.

```Javascript
class App extends Component {
  render() {
    const drizzleOptions = {
      contracts: []
    };

    return (
      <DrizzleProvider options={drizzleOptions}>
        <Loading>
          <Browser />
        </Loading>
      </DrizzleProvider>
    );
  }
}
```

## components/Browser.js

Once you have the Smart Contract's ABI, uncomment the lines you need to add the contract to the drizzle store, and start building your solution.

## Questions or comments

For any questions or comments please contact `Dragos Rizescu <dragos.rizescu@consensys.net>` or `Ruben  Torres <ruben.torres@consensys.net>`
