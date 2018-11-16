var app = angular.module('boreholeManager', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl:'partials/list.htm',
        controller: 'boreholeList'
    }).when('/add', {
        templateUrl:'partials/add.htm',
        controller: 'addBorehole'
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

    $scope.deleteBorehole = function(id) {
        $http.delete('http://localhost:8001/deleteBorehole/'+id).then(function (data) {
           alert("Borehole successfully deleted");
        }, function (err) {
            console.log(err);
        });
    }

}]);

app.controller('addBorehole', ['$scope', '$http', function($scope, $http) {
    $scope.borehole = {};

    $scope.add = function(borehole) {
        console.log(borehole);
        $http.post('http://localhost:8001/addBorehole', borehole).then(function(data) {
            alert('Borehole successfully added');
        }, function(err) {
            console.log(err);
        })
    }
}]);

