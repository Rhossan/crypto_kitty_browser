# Kitty Browser

## CryptoKitty Notes

### Browser Component(Parent)
  #### Constructor
   - state will hold all necessary data: birthdate, genes, kittyId, generation, idBool
  #### componentDidMount
   - Initialize the contract instance and import the contracts's ABI
   - Add the contract to the drizzle store
  #### Update
   - update kittyId state on each keystroke from the input field
   - set idBool to false, (resolved issue #2, see Issues for more information)
  #### handleClick
   - event handler that makes a web3 call to getKitty(), passing in the user input. Retrieves relevant kitty information
  #### handleClickRandom
   - fetch JSON from url, by limiting to 1, we will receive most recent kittyID constructed in the cryptokitties api. We will choose a       random kitty (inclusive of 1 through mostRecentKitty Id number)
  #### render
   - contains a form for user to fill out kitty id and click getKitty submit button, as well as a button for randomKitty
   - contains a KittyIndex component which will have all relevant props passed to it

  ### KittyIndex Component(Child)
   #### render
   - renders all relevant kitty information including image, birth date, genes, and generation
   - crypto-kitties images are stored on google storage, we get the initial url, concat with the ethereum address for                 CryptoKittiesCore, and kittyId, to ultimately get the image svg that we set in the img tag.






![](https://i.imgur.com/A7D2gMb.png)

[CryptoKitties](http://cryptokitties.co) is one of the most popular distributed apps on the Ethereum Network. It's a game that allows players to purchase, collect, breed and sell various types of virtual cats.

To be able to run CryptoKitties on your browser you'll need to install [Metamask](http://metamask.io/) or use a dedicated Ethereum browser like Mist or Parity.

Simple UI that will be able to interact with the Ethereum Blockchain, using web3.js and the [drizzle](https://truffleframework.com/docs/drizzle/getting-started) library. This UI will allow the user to type in a CryptoKitty's ID, and will display information about that Kitty.
