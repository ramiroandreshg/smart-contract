pragma solidity ^0.5.3;

contract Subasteya {
  /*  VARIABLES */
  address payable private owner;

  string private url;
  string private name;
  string private description;

  uint256 private basePrice;
  uint256 private minPrice;
  uint256 private maxPrice;
  uint256 private maxOffers;

  bool private hidePrices;

  Bid[] private bids;

  AuctionState private state;

  /*  STRUCTS */
  struct Bid {
    address payable bidder;
    uint256 amount;
  }

  /*  ENUMS */
  enum AuctionState { JustCreated, Open, Disabled }

  /*  EVENTS */
  event placeBid(address bidder, uint amount);

  /*  CONSTRUCTOR */
  constructor(string memory itmUrl, string memory itmName, string memory itmDesc, uint256 itmBPrice,
    uint256 itmPmin, uint256 itmPmax, uint256 itmMaxOffers, bool hiddenPrices) public {
    owner = msg.sender;
    url = itmUrl;
    name = itmName;
    description = itmDesc;
    basePrice = itmBPrice;
    minPrice = itmPmin;
    maxPrice = itmPmax;
    maxOffers = itmMaxOffers;
    hidePrices = hiddenPrices;
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

  modifier betterThanCurrentBid () {
    require(getBidsCount() == 0 || msg.value > getCurrentAmount(), "betterThanCurrentBid - Bid must be greater than current max offer");
    _;
  }

  modifier onlyOtherBidders () {
    require(getBidsCount() == 0 || msg.sender != getCurrentBidder(), "onlyOtherBidders - Cant accept 2 consecutive bids from same user");
    _;
  }

  modifier betterThanBasePrice () {
    require(msg.value > basePrice, "betterThanBasePrice - Bid must be greater than base price");
    _;
  }

  modifier maxOffersNotReached () {
    require(getBidsCount() < maxOffers, "maxOffersNotReached - Max # of offers got reached");
    _;
  }

  modifier minPriceReached () {
    require(getBidsCount() > 0 && getCurrentAmount() >= minPrice, "minPriceReached - Min Price not reached yet");
    _;
  }

  /*  PAYABLE FUNCTION */
  function() external payable{}

  /*  EXTERNAL METHODS */
  function openAuction () external onlyOwner justCreated {
    state = AuctionState.Open;
  }

  function bid () external payable onlyOpen maxOffersNotReached onlyOtherBidders betterThanBasePrice betterThanCurrentBid {
    refundPreviousBestBid();

    Bid memory newBid = Bid(msg.sender, msg.value);
    bids.push(newBid);
    emit placeBid(msg.sender, msg.value);

    if (automaticAuctionEnd()) {
      disableContract();
      makeThePayment();
    }
  }

  function getBid (uint bidNumber) external onlyOpen view returns(address bidder, uint256 amount) {
    require(bidNumber <= getBidsCount(), "The bid requested does not exist yet");
    
    return (bids[bidNumber - 1].bidder, bids[bidNumber - 1].amount);
  }

  function closeAuction () external onlyOwner onlyOpen minPriceReached {
    disableContract();
    makeThePayment();
  }

  function getAuctionInfo () external view onlyOpen returns(string memory itmUrl,
    string memory itmName, string memory itmDesc, uint256 itmBPrice,
    int256 itmPmin, int256 itmPmax, int256 itmMaxOffers){
    
    int256 pMin = int(minPrice);
    int256 pMax = int(maxPrice);
    int256 mOffers = int(maxOffers);
    
    if (hidePrices) {
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

  /*  PRIVATE METHODS & AUX FUNCTIONS */
  function disableContract () private {
    state = AuctionState.Disabled;
  }

  function makeThePayment () private {
    owner.transfer(address(this).balance);
  }
  
  function refundPreviousBestBid () private {
    if (getBidsCount() > 0) {
      address payable lastBidder = getCurrentBidder();
      uint256 amountOffered = getCurrentAmount();

      lastBidder.transfer(amountOffered);
    }
  }

  function automaticAuctionEnd () private view returns(bool) {
    return lastBidCoversMaxPrice() || maxOffersReached();
  }

  function lastBidCoversMaxPrice () private view returns(bool) {
    return bids[getBidsCount() - 1].amount >= maxPrice;
  }

  function maxOffersReached () private view returns(bool) {
    return getBidsCount() >= maxOffers;
  }

  /*  GETTERS */
  function getBidsCount () public onlyOpen view returns(uint256 bidsCount) {
    return bids.length;
  }

  // PreCondition: only called with bidsCount > 0
  function getCurrentAmount () private view returns(uint256 amount) {
    uint256 bidsCount = getBidsCount();

    return bids[bidsCount - 1].amount;
  }

  // PreCondition: only called with bidsCount > 0
  function getCurrentBidder () private view returns(address payable bidder) {
    uint256 bidsCount = getBidsCount();
    
    return bids[bidsCount - 1].bidder;
  }
}