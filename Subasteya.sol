pragma solidity ^0.5.3;

contract Subasteya {
  /*  VARIABLES */
  address private owner;

  bytes32 private url;
  bytes32 private name;
  bytes32 private description;

  uint256 private basePrice;
  uint256 private minPrice;
  uint256 private maxPrice;
  uint256 private maxOffers;

  bool private showPrices;

  Bid[] private bids;

  AuctionState private state;

  /*  STRUCTS */
  struct Bid {
    address bidder;
    uint256 amount;
  }

  /*  ENUMS */
  enum AuctionState { JustCreated, Open, Finished }

  /*  EVENTS */

  /*  CONSTRUCTOR */
  constructor(bytes32 itmUrl, bytes32 itmName, bytes32 itmDesc, uint256 itmBPrice,
    uint256 itmPmin, uint256 itmPmax, uint256 itmMaxOffers, bool publicPrices) public {
    owner = msg.sender;
    url = itmUrl;
    name = itmName;
    description = itmDesc;
    basePrice = itmBPrice;
    minPrice = itmPmin;
    maxPrice = itmPmax;
    maxOffers = itmMaxOffers;
    showPrices = publicPrices;
    state = AuctionState.JustCreated;
  }

  /*  MODIFIERS */
  modifier onlyOwner () {
    require(msg.sender == owner, "onlyOwner - caller is not the owner.");
    _;
  }

  modifier onlyOpen () {
    require(state == AuctionState.Open, "onlyOpen - auction is not open anymore");
    _;
  }

  modifier justCreated () {
    require(state == AuctionState.JustCreated, "justCreated - Cant open auction twice");
    _;
  }

  /*  PAYABLE FUNCTION */
  function() external payable{}

  /*  EXTERNAL METHODS */
  function openAuction () external onlyOwner justCreated {
    state = AuctionState.Open;
  }

  function bid () external onlyOpen {}

  // function listBids () external activeContract() {}

  function getBid (uint pos) external onlyOpen view returns(address bidder, uint256 amount) {
    require(pos < getBidsCount(), "The bid requested does not exist yet");
    
    return (bids[pos].bidder, bids[pos].amount);
  }

  function closeAuction () external onlyOpen {}

  function getAuctionInfo () external view onlyOpen returns(bytes32 itmUrl, bytes32 itmName, bytes32 itmDesc, uint256 itmBPrice,
    int256 itmPmin, int256 itmPmax, int256 itmMaxOffers){
    int256 pMin = int(minPrice);
    int256 pMax = int(maxPrice);
    int256 mOffers = int(maxOffers);
    
    if (showPrices) {
     pMin = -1;
     pMax = -1;
     mOffers = -1;
    }

    return (url, name, description, basePrice, pMin, pMax, mOffers);
  }

  function getCurrentMaxBid () external onlyOpen view returns(address bidder, uint256 amount) {
    uint256 bidsCount = getBidsCount();
    require(bidsCount > 0, "No offers yet");
    uint256 lastIdx = bidsCount - 1;

    return (bids[lastIdx].bidder, bids[lastIdx].amount);
  }

  /*  PRIVATE METHODS */
  function disableContract () private {
    state = AuctionState.Finished;
  }

  function checkIfAuctionEnds () private view returns(bool) {
    return lastBidCoversMaxPrice() || maxOffersReached();
  }

  function makeThePayment () private {}

  function refundPreviousBestBid () private {}

  /*  AUX FUNCTIONS */
  function getBidsCount () public onlyOpen view returns(uint256 bidsCount) {
    return bids.length;
  }

  function lastBidCoversMaxPrice () private view returns(bool) {
    return bids[getBidsCount() - 1].amount >= maxPrice;
  }

  function maxOffersReached () private view returns(bool) {
    return getBidsCount() >= maxOffers;
  }

}