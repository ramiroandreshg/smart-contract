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

  Bid[] private bids;

  bool private auctionOpen;

  /*  STRUCTS */
  struct Bid {
    address bidder;
    uint256 amount;
  }

  /*  EVENTS */

  /*  CONSTRUCTOR */
  constructor(bytes32 itmUrl, bytes32 itmName, bytes32 itmDesc,
    uint256 itmBPrice, uint256 itmPmin, uint256 itmPmax, uint256 itmMaxOffers) public {
    owner = msg.sender;
    url = itmUrl;
    name = itmName;
    description = itmDesc;
    basePrice = itmBPrice;
    minPrice = itmPmin;
    maxPrice = itmPmax;
    maxOffers = itmMaxOffers;
    auctionOpen = true;
  }

  /*  MODIFIERS */

  /*  PAYABLE FUNCTION */
  function() external payable{}

  /*  EXTERNAL METHODS */
  function bid () external {}

  function listBids () external {}

  function closeAuction () external {}

  function getAuctionInfo () external {}

  function getCurrentMaxBid () external {}

  /*  INTERNAL METHODS */
  function disableContract () internal {}

  function makePayment () internal {}

  function returnMoney () internal {}

  /*  AUX FUNCTIONS */

}