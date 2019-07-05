// MODULE
var auctionApp = angular.module('auctionApp', ['ngRoute']);

// ROUTES
auctionApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'auction/auction.template.html',
      controller: 'auctionController',
      controllerAs: 'ctrl'
    })
    .otherwise({
      templateUrl: 'core/404.html'
    });
}]);