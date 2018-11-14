var app = angular.module('boreholeManager', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl:'partials/list.htm',
        controller: 'boreholeList'
    });
});

app.controller('boreholeList', ['$scope', '$http', function($scope, $http) {

    $scope.list = [{name: 'Borehole1'}, {name: 'Borehole2'}];

}]);

app.controller('addBorehole', ['$scope', '$http', function($scope, $http) {

}]);

