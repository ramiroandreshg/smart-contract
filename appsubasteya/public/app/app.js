var myApp = angular.module('myApp', []);

myApp.controller('auctionController', ['$scope', function($scope) {
    
    $scope.name = 'Main';
    
}]);

myApp.controller('bidController', ['$scope', function($scope) {
    
    $scope.name = 'Second';
    
}]);

myApp.controller('bidListController', ['$scope', function($scope) {
    
  $scope.name = 'Bid List';
  
}]);

