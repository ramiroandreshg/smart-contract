auctionApp.service('auctionService', ['$http', '$log', function ($http, $log) {
  
  this.StartAuction = function (auction) {
    const config = {
      headers : { 'Content-Type': 'application/json' }
    };

    $http.post('http://localhost:3000/auctions/bid', auction, config)
      .then(function onSuccess (response) {
        $log.info('response:', response);
        
      }, function onError (response) {
        $log.error('response:', response);
        
      })
      .finally(function always () {
        $log.info('Always runs this');
        // reserved to code which needs to be run always
      }
    );
  }

}]);