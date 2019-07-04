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
    publicInfo: 'show',
    url: ''
  }; 
  $scope.auctionAddress = '';
  $scope.deployed = false;

  $scope.elems = _gatherFormElements();

  $scope.contract = function() {
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
  
  var validateAuction = function() {
    var a = $scope.auction;
    
    return a.basePrice && a.description && a.maxOffers &&
      a.maxPrice && a.minPrice && a.name && a.publicInfo && a.url;
  }

  var startAuction = function () {
    var data = _buildAuction($scope.elems);
     
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

    $http.post('/auctions/end', data, config)
    .then(function successCallback(response) {
      $scope.deployed = false;
      $scope.auctionAddress = '';
      _cleanUpForm()
    }, function errorCallback(response) {
      console.log('err', response);
      alert('Error disabling contract');
    });
  }


  
}]);

function _buildAuction (elems) {
  let auction = {
    url: elems.url.value,
    name: elems.name.value,
    description: elems.description.value,
    basePrice: elems.basePrice.value,
    minPrice: elems.minPrice.value,
    maxPrice: elems.maxPrice.value,
    maxOffers: elems.maxOffers.value,
    publicInfo: elems.publicInfo.value
  }
  if (elems.ownerAddress.value) {
    auction.ownerAddress = elems.ownerAddress.value 
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

function _cleanUpForm () {
  document.getElementById("auction-form").reset(); 
}

function _gatherFormElements () {
  return {
    url: document.getElementById('auction-url'),
    name: document.getElementById('auction-name'),
    description: document.getElementById('auction-description'),
    basePrice: document.getElementById('auction-base-price'),
    minPrice: document.getElementById('auction-min-price'),
    maxPrice: document.getElementById('auction-max-price'),
    maxOffers: document.getElementById('auction-max-offers'),
    publicInfo: document.querySelector('input[name="public-info"]:checked'),
    ownerAddress: document.getElementById('auction-owner-address'),
    formBtn: document.getElementById('auction-button')
  }
}  


 



function _validateAuction (auction) {
  return auction.url && auction.name && auction 
}
