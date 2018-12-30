pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {

    struct Star {
        string name;
    }

    struct starExchange {
        uint256 _tokenIdSell;
        address seller;
    }

    string public constant name = "Star Notary Token";
    string public constant symbol = "SNT";

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;
    mapping(uint256 => starExchange) public starExchanges;

    function createStar(string _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name);

        tokenIdToStarInfo[_tokenId] = newStar;

        _mint(msg.sender, _tokenId);
    }

    function lookUpTokenIdToStarInfo(uint256 _tokenId) public view returns (string) {
        require(_exists(_tokenId) == true);
        Star memory star = tokenIdToStarInfo[_tokenId];
        return star.name;
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender);
        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0);

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        starOwner.transfer(starCost);

        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
        starsForSale[_tokenId] = 0;
    }

    function putUpExchangeRequest(uint256 _tokenIdSell, uint256 _tokenIdBuy) public {
    /* A user can put up the token he would like to get, attach the data of the token he/she would give in return and his/her address. In turn, he/she also authorizes the owner of the desired star to transfer the exchange star to his/her own account. In the actual exchangeStars function, this way the two transfers can happen at the same time. */
        require(ownerOf(_tokenIdSell) == msg.sender);
        starExchanges[_tokenIdBuy] = starExchange(_tokenIdSell, msg.sender);
        approve(ownerOf(_tokenIdBuy), _tokenIdSell);
    }
    
    function exchangeStars(uint256 _tokenIdBuy, uint256 _tokenIdSell) public {
        require(ownerOf(_tokenIdBuy) == msg.sender);
        address seller = starExchanges[_tokenIdBuy].seller;
        safeTransferFrom(msg.sender, seller, _tokenIdBuy);
        safeTransferFrom(seller, msg.sender, _tokenIdSell);
        starExchanges[_tokenIdBuy] = starExchange(0, address(0));
    }

    function starTransfer(address _to, uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);
        safeTransferFrom(msg.sender, _to, _tokenId);
    }
}
