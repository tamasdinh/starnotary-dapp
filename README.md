# Ethereum-based Decentralized Token Notary Service App

>The goal of the project was to build a simple __end-to-end Ethereum-based blockchain notary solution__ for an __ERC721 non-fungible token__ (i.e. a token whose instances have unique values, e.g. representing unique collectible assets).
>
>The solution is a __decentralized app__, whose core components are:
>
>   - __Smart contract deployed in Ethereum's Rinkeby test network:__ smart contract written in Solidity that implements key token transactional and registry methods, building on the ERC721 token standard. It is part of the Ethereum blockchain and can be executed by any of the Ethereum nodes participating in the Rinkeby network.
>
>   - __JavaScript web app:__ provides a convenient way through a front-end application to create a new token, query existing tokens and tranfer tokens to Ethereum Rinkeby addresses. Built in the [Truffle Framework](https://truffleframework.com) in JavaScript, HTML and CSS.


## Key component files of interest

- *[/contracts/starNotary.sol](https://github.com/tamasdinh/starnotary-dapp/blob/master/contracts/starNotary.sol):* Solidity smart contract source code. Implements various token registry and transaction methods; built on, and in accordance with, the ERC721 non-fungible token standard.
- *[/app/scripts/index.js](https://github.com/tamasdinh/starnotary-dapp/blob/master/app/scripts/index.js):* implements smart contract interaction functionality needed for the front-end to operate properly.
- *[/app/index.html](https://github.com/tamasdinh/starnotary-dapp/blob/master/app/index.html):* implements simple front-end web page with create token, look up token by ID and transfer token functionality
- *[/test/starNotary.js](https://github.com/tamasdinh/starnotary-dapp/blob/master/test/starNotary.js):* unit tests for the Solidity smart contract - implemented in Mocha and Chai, leveraging [Truffle's](https://truffleframework.com) unique functionality for Solidity smart contracts.

---
## __Prerequisites and installing__ _(examples for MacOS, but most of it should work on Windows as well)_

To install the software, you need to do the following:

**1.** Install Node.JS on your computer - visit https://nodejs.org/en/ and choose installer for your system

**2.** Clone or download GitHub repo files into desired directory from https://github.com/tamasdinh/starnotary-dapp.git
```bash
mkdir project-folder
cd project-folder
git clone https://github.com/tamasdinh/starnotary-dapp.git
``` 

**3.** Install and save dependencies to project folder:

```bash
npm install -g truffle      # this is actually a global install
npm install openzeppelin-solidity --save    # this is needed for ERC721 contracts
npm install truffle-hdwallet-provider --save # wallet provider for deployment to Ethereum network
```
_You might run into trouble installing truffle globally. Alternatively to the above solution, you could use_

 ```bash
 sudo npm install -g truffle
 ```

__4.__ Install Ethereum wallet provider Metamask [(see instructions here)](https://metamask.io) plugin for your browser (Google Chrome or Brave)

__5.__ Create new account with Metamask (Metamask will take you through the process)

## Running and testing the smart contract and the web app

**1.** Once you have Truffle installed, you can start the Truffle develop console - this will initialize a local Ethereum blockchain at (http://127.0.0.1:9545) with 10 accounts, each with a balance of 100 ether and open the Truffle develop console for you.

```bash
truffle develop
```

**2.** Run test script against smart contract - this will show you what unit tests have been defined and whether they all pass on the contract:
```bash
test
```

**3.** Compile and migrate contracts to the local test network:
```bash
compile
migrate --reset --network develop # this will automatically target the development network as I already fixed its parameters in the config file truffle.js
```
__4.__ Set up Metamask to connect to local development network:
- go to Metamask plugin, click on active network, select Custom RPC and enter http://127.0.0.1:9545 under 'Custom RPC settings')
- please disable Privacy Mode under Settings. DO NOT FORGET to turn this back on before interacting with live Ethereum sites!
- add one or multiple local development network accounts to Metamask - click on Import Account and paste private key of selected local dev account (you can see the list of account addresses and corresponding private keys in the Terminal window in which you used the Truffle develop console.)

**5.** Start web app on development network - open new bash Terminal window:
```bash
npm run dev
```
This will start the web app at http://localhost:8080. Navigate to this page through the web browser in which you have the Metamask plugin (e.g. Google Chrome). You can try out the functionalities provided on the front-end with an account you imported from the local dev network.


## Built With

* [Node.js](http://www.nodejs.org) - The JavaScript runtime used
* [Truffle Framework](https://truffleframework.com) - JavaScript framework used for testing, compiling and deploying contracts, as well as interacting with the deployed contract from the web app
* [Web3.js](https://github.com/ethereum/web3.js/) - Ethereum JavaScript API; used as part of Truffle workflow to enable querying of accounts in network
* [Infura](https://infura.io) - Used to deploy contract on the live net (Infura has nodes in Ethereum, and through the service we can use these nodes to deploy contracts, without having to have our own node in the Ethereum network)
* [Metamask](https://metamask.io) - Ethereum wallet provider used
* [MS Visual Studio Code](http://code.visualstudio.com) - Code editor used for scripting
* [VSCode Solidity extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) - [GitHub](https://github.com/juanfranblanco/vscode-solidity) - Juan Blanco's excellent Solidity Language Extension for VSCode


## Authors

* **Tamas Dinh** - [LinkedIn profile](https://www.linkedin.com/in/tamasdinh/) - [GitHub](https://github.com/tamasdinh)