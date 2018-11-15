var app = angular.module('boreholeManager', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl:'partials/list.htm',
        controller: 'boreholeList'
    });
});

app.controller('boreholeList', ['$scope', '$http', function ($scope, $http) {

    $scope.getList = function () {
        $http.get('http://localhost:8001/listBoreholes').then(function (data) {
            $scope.list = data.data.response;
        }, function (err) {
            console.log(err);
        });
    }

}]);

app.controller('addBorehole', ['$scope', '$http', function($scope, $http) {

}]);

