// CONTROLLERS
auctionApp.controller('auctionController', ['$log', 'auctionService', function ($log, auctionService) {
  var ctrl = {};
  
    ctrl = {
      auction: null,
      submit: submit,
    };
    
    _init();
    
    return ctrl;
    
    function _init() {
      ctrl.auction = {
        'showPrices': 'show' // setting it as a default value
      };
    }
    
    function submit () {
      if (!_validate()){
        $log.warn('Incomplete Auction Form');
        alert('Incomplete Auction Form')
        return;
      }

      // Send request to create contract
      auctionService.StartAuction(ctrl.auction);

      // save contract address into some datastore
      // send user to contracts page where all contracts get listed

      console.log('auction!', ctrl.auction);
    }

    function _validate() {
      return true;
      // ToDo: learn to validate through angularjs
      const a = ctrl.auction;
      return a.url && a.name && a.description &&
        a.basePrice && a.minPrice && a.maxPrice &&
        a.maxOffers && a.showPrices;
    }
}]);