pragma solidity ^0.5.3;

contract Subasteya {

    /* Variables */
    address private owner;

    bytes32 private url;
    bytes32 private name;
    bytes32 private description;

    uint256 private basePrice;
    uint256 private minPrice;
    uint256 private maxPrice;
    uint256 private maxAmountOfBids;

    Bid[] private bids;
    Bid private currentBestBid;

    bool auctionInProgress;

    /* Structs */
    struct Bid{
        address bidder;
        uint256 amount;
    }

    /* Events */
    // emit events when you want to write some data into the blockchain

    /* Constructor */
    constructor(bytes32 itemUrl, bytes32 itemName, bytes32 itemDescription,
        uint256 priceBase, uint256 priceMin, uint256 priceMax, uint256 maxAmount) public {
        owner = msg.sender;
        url = itemUrl;
        name = itemName;
        description = itemDescription;
        basePrice = priceBase;
        minPrice = priceMin;
        maxPrice = priceMax;
        maxAmountOfBids = maxAmount;
        auctionInProgress = false;
    }

    /* Modifiers */
    modifier onlyOwner () {
        require(msg.sender == owner, "onlyOwner - caller is NOT the owner.");
        _;
    }

    modifier isAuctionOpen () {
        require(auctionInProgress == true, "isAuctionOpen - called when auction closed");
        _;
    }

    modifier isBetterThanMaxBid () {
        require(msg.value > currentBestBid.amount, "isBetterThanMaxBid - bid placed was not better than current best bid");
        _;
    }

    /* Payable function */
    function() external payable{}

    /* Methods */
    function openAuction () public onlyOwner() {
        auctionInProgress = true;
    }

    function bid () public payable isAuctionOpen() returns(bool) {
        /* Try to place a bid or refund the money sent.
        Log bid attempt
        Return true if bid was succesfully placed or false otherwise */
        return false;
    }
    // closeAuctionByOwner onlyowner (si se cumplen los parametros de bids)
    // closeAuctionAutomatically private

    /* Getters */

    /* Aux fn */
}