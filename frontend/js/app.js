var app = angular.module('boreholeManager', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl:'partials/list.htm',
        controller: 'boreholeList'
    }).when('/add', {
        templateUrl:'partials/add.htm',
        controller: 'addBorehole'
    }).when('/update/:id', {
        templateUrl:'partials/update.htm',
        controller: 'updateBorehole'
    }).when('/waterLevel/:id', {
        templateUrl:'partials/level.htm',
        controller: 'waterLevel'
    }).otherwise({
        redirectTo: '/'
    });
});

app.controller('boreholeList', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {

    $scope.getList = function () {
        $http.get('http://localhost:8001/listBoreholes').then(function (data) {
            $scope.list = data.data.response;
            $rootScope.list = $scope.list;
        }, function (err) {
            console.log(err);
        });
    }

    $scope.deleteBorehole = function(id) {
        $http.delete('http://localhost:8001/deleteBorehole/'+id).then(function (data) {
           alert("Borehole successfully deleted");
           $window.location.href = '/';
        }, function (err) {
            console.log(err);
        });
    }
}]);

app.controller('addBorehole', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.borehole = {};

    $scope.add = function(borehole) {
        
        $http.post('http://localhost:8001/addBorehole', borehole).then(function(data) {
            $window.location.href = '/';
        }, function(err) {
            console.log(err);
        })
    }
}]);

app.controller('updateBorehole', ['$scope', '$http', '$window', '$routeParams', "$rootScope", function($scope, $http, $window, $routeParams, $rootScope) {
    $scope.borehole = $rootScope.list.find(function(item) {
        return item.id = $routeParams.id;
    });

    $scope.update = function(borehole) {
        
        $http.patch('http://localhost:8001/updateBorehole', borehole).then(function(data) {
            $window.location.href = '/';
        }, function(err) {
            console.log(err);
        })
    };
}]);

app.controller('waterLevel', ['$scope', '$http', '$window', '$routeParams', '$rootScope', function($scope, $http, $window, $routeParams, $rootScope) {
    $scope.lastReading = '';
    $scope.lastDate = '';
    $scope.boreholeName = ''
    $scope.getCurrent = function() {
        $scope.boreholeName = $rootScope.list.find(function(item) {return item.id == $routeParams.id}).name;
        $http.get('http://localhost:8001/currentLevel/'+$routeParams.id).then(function (data) {
            var apiResponse =  data.data.response;
            $scope.lastReading = apiResponse[0].reading;
            $scope.lastDate = apiResponse[0].read_date;
        }, function (err) {
            console.log(err);
        });
    };

    $scope.add = function(reading) {
        
        $http.post('http://localhost:8001/addWaterLevel/', {reading: reading, id: $routeParams.id}).then(function(data) {
            $window.location.href = '/';
        }, function(err) {
            console.log(err);
        })
    }
}]);

