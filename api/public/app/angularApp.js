var myApp = angular.module('myApp', []);

myApp.controller('auctionController', ['$scope', '$http', '$log',
function($scope, $http, $log) {
  var utils = window.utils || {};

  $scope.deployed = false;
  $scope.auctionAddress = '';
  $scope.auction = utils.initAuction();
  $scope.bids = [];
  $scope.bestBid = 0;
  $scope.bid = utils.initBid();
  $scope.contractLoading = false;
  $scope.bidLoading = false;
  $scope.elems = utils.gatherFormElements();

  $scope.contract = function () {
    if (!validateAuction()) {
      alert('Incomplete Auction Form');
      return;
    }
    if (!$scope.deployed) {
      startAuction();
    } else {
      endAuction();
    }
  }

  $scope.placeBid = function () {
    if (!validateBid()) {
      alert('Incomplete Bid Form');
      return;
    }

    var data = JSON.stringify({
      amount: $scope.bid.amount,
      address: $scope.bid.address
    })

    var config = {
      headers : {
        'Content-Type': 'application/json'
      }
    }

    $scope.bidLoading = true;
    $http.post('/auctions/bid', data, config)
    .then(function successCallback(response) {
      if(response.data.success){
        $log.info('bid Placed');
        $scope.bestBid = response.data.bidAmount;
        $scope.listBids();
        utils.cleanUpForm('bid-form'); 
      } else {
        $log.warn('placing bid', response.data.error);
        alert('Error placing bid');
        utils.cleanUpForm('bid-form'); 
      }
    }, function errorCallback(response) {
      $log.error('callback placing bid', response);
      alert('Error placing bid');
    }).finally(function () {
      $scope.bidLoading = false;
    });
  }
  
  $scope.listBids = function () {
    $http({
      method: 'GET',
      url: '/auctions/bids'
    }).then(function successCallback(response) {
      if (response.data.error) {
        $log.warn('listing bids', response);
      } else {
        $scope.bids = response.data.bids;
      }
    }, function errorCallback(response) {
      $log.error('callback listing bids', response);
    });
  }
  
  var validateAuction = function() {
    var a = $scope.auction;
    
    return a.basePrice && a.description && a.maxOffers &&
      a.maxPrice && a.minPrice && a.name && a.publicInfo && a.url;
  }

  var validateBid = function () {
    var b = $scope.bid;

    return b.amount && b.address;
  }

  var startAuction = function () {
    var data = utils.buildAuction($scope.auction);
     
    var config = {
      headers : {
        'Content-Type': 'application/json'
      }
    }

    $scope.contractLoading = true;
    $http.post('/auctions/start', data, config)
    .then(function successCallback(response) {
      if(response.data.success){
        $log.info('deploy successful');
        $scope.deployed = true;
        $scope.auctionAddress = response.data.auctionAddress;
        utils.disableAndHideFields($scope.elems);   
      } else {
        $log.warn('deploying contract', response.data.error);
      alert('Error deploying contract');
      }
    }, function errorCallback(response) {
      $log.error('callback deploying contract', response);
      alert('Error deploying contract');
    }).finally(function () {
      $scope.contractLoading = false;
    });
  }

  var endAuction = function () {
    if (!$scope.auction.ownerAddress) {
      alert('Owner Address required');
      return;
    }
    var data = JSON.stringify({owner: $scope.auction.ownerAddress})

    var config = {
      headers : {
        'Content-Type': 'application/json'
      }
    }

    $scope.contractLoading = true;
    $http.post('/auctions/end', data, config)
    .then(function successCallback(response) {
      if (response.data.success) {
        $log.info('disabling contract success');
        $scope.deployed = false;
        $scope.auctionAddress = '';
        utils.cleanUpForm('auction-form');
        alert('Contract disabled');
      } else {
        $log.warn('disabling contract', response.data.error);
        alert('Cant cancel auction');
      }
    }, function errorCallback(response) {
      $log.error('callback disabling contract', response);
      alert('Error disabling contract');
    }).finally(function () {
      $scope.contractLoading = false;
    });
  }  
}]);