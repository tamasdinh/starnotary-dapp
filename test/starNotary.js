//import 'babel-polyfill';
const StarNotary = artifacts.require('./starNotary.sol')

let instance;
let accounts;

contract('StarNotary', async (accs) => {
    accounts = accs;
    instance = await StarNotary.deployed();
});
    
it('can Create a Star and get its name', async() => {
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});
    
it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    let starPrice = web3.toWei((.01).toString(), "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    assert.equal(await instance.starsForSale.call(starId), starPrice)
});

it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3;
    let starPrice = web3.toWei((.01).toString(), "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1)
    await instance.buyStar(starId, {from: user2, value: starPrice})
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1)
    assert.equal(parseInt(balanceOfUser1BeforeTransaction) + parseInt(starPrice), parseInt(balanceOfUser1AfterTransaction));
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    let starPrice = web3.toWei((.01).toString(), "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    await instance.buyStar(starId, {from: user2, value: starPrice});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    let starPrice = web3.toWei((.01).toString(), "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2)
    assert.equal(parseInt(balanceOfUser2BeforeTransaction) - parseInt(balanceAfterUser2BuysStar), starPrice);
});

it('The token name and token symbol are added properly', async function() {
    assert.equal(await instance.name.call(), 'Star Notary Token');
    assert.equal(await instance.symbol.call(), 'SNT');
});

it('user can look up their Star based on the tokenId', async function() {
    let user1 = accounts[1];
    let starId = 10;
    await instance.createStar("User 1's original star", starId, {from: user1});
    assert.equal(await instance.lookUpTokenIdToStarInfo.call(starId), "User 1's original star");
});

it('2 users can exchange their stars', async function() {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId1 = 6;
    let starId2 = 7;
    await instance.createStar("User 1's original star", starId1, {from: user1});
    await instance.createStar("User 2's original star", starId2, {from: user2});
    await instance.putUpExchangeRequest(starId2, starId1, {from: user2});
    await instance.exchangeStars(starId1, starId2, {from: user1});
    assert.equal(await instance.ownerOf.call(starId1), user2);
    assert.equal(await instance.ownerOf.call(starId2), user1);
  });

it('Stars Tokens can be transferred from one address to another', async function() {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 8;
    await instance.createStar("User 1's original star", starId, {from: user1});
    assert.equal(await instance.ownerOf(starId), user1);
    await instance.starTransfer(user2, starId, {from: user1});
    assert.equal(await instance.ownerOf(starId), user2);
});