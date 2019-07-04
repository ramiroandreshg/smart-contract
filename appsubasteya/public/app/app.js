var myApp = angular.module('myApp', []);

myApp.controller('auctionController', ['$scope', '$log', '$filter', '$http',
function($scope, $log, $filter, $http) {
  $scope.auction = {
    basePrice: '',
    description: '',
    maxOffers: '',
    maxPrice: '',
    minPrice: '',
    name: '',
    ownerAddress: '',
    publicInfo: '',
    url: ''
  }; 
  $scope.auctionAddress = '';
  $scope.deployed = false;

  $scope.submit = function() {
    if (!validateAuction()) {
      alert('Incomplete Form');
      return;
    }
    if (!$scope.deployed) {
      startAuction();
    } else {
      endAuction();
    }
  }
  
  var validateAuction = function() {
    var a = $scope.auction;
    
    return a.basePrice && a.description && a.maxOffers &&
      a.maxPrice && a.minPrice && a.name && a.publicInfo && a.url;
  }


  var startAuction = function () {
    var data = _buildAuction($scope.auction);
     
    var config = {
      headers : {
        'Content-Type': 'application/json'
      }
    }

    $http.post('/auctions/start', data, config)
    .then(function successCallback(response) {
      $scope.deployed = true;
      $scope.auctionAddress = response.data.auctionAddress;
      _disableAndHideFields()
    }, function errorCallback(response) {
      console.log('err', response);
      alert('Error deploying contract');
    });

  }

  var endAuction = function () {

  }
  
}]);

function _buildAuction (a) {
  let auction = {
    url: a.url,
    name: a.name,
    description: a.description,
    basePrice: a.basePrice,
    minPrice: a.minPrice,
    maxPrice: a.maxPrice,
    maxOffers: a.maxOffers,
    publicInfo: a.publicInfo
  }
  if (a.ownerAddress) {
    auction.ownerAddress = a.ownerAddress 
  }    
  
  return JSON.stringify(auction);
}

function _disableAndHideFields () {
  if (document.querySelector('input[name="public-info"]:checked').value === 'hide') {
    document.getElementById('auction-min-price').value = "private";
    document.getElementById('auction-max-price').value = "private";
    document.getElementById('auction-max-offers').value = "private";
  }
  document.getElementById('auction-url').disabled = true;
  document.getElementById('auction-name').disabled = true;
  document.getElementById('auction-description').disabled = true;
  document.getElementById('auction-base-price').disabled = true;
  document.getElementById('auction-max-price').disabled = true;
  document.getElementById('auction-min-price').disabled = true;
  document.getElementById('auction-max-offers').disabled = true;

  document.querySelectorAll('input[name="public-info"]').forEach(function (el, idx, list) {
    el.disabled = true;
  });

  document.getElementById('auction-button').value = 'End Auction';
  document.getElementById('auction-button').classList.toggle('end-auction');
}

myApp.controller('bidController', ['$scope', function($scope) {
    
    $scope.name = 'Second';
    
}]);

myApp.controller('bidListController', ['$scope', function($scope) {
    
  $scope.name = 'Bid List';
  
  $scope.listBids = function () {
    $http({
      method: 'GET',
      url: '/auctions/bids'
    }).then(function successCallback(response) {
        console.log('bids', response);
      }, function errorCallback(response) {
        console.log('err', response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

}]);

function _validateAuction (auction) {
  return auction.url && auction.name && auction 
}
