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

    Bid[] private currentBids;

    bool auctionInProgress;

    /* Structs */
    struct Bid{
        address bidder;
        uint256 amount;
    }

    /* Events */
    // what are these for? - I think its for writing to the blockchain purpose

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

    /* Payable function */
    function() external payable{}



}