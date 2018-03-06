var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('loginController', function ($scope, $http, $location, authentication) {
    $scope.login = function () {
        authentication.login($scope.username, $scope.password, function (result) {
            $location.path("/home");
        }, function () {
            $.notify("Login Failed!");
        });
    };
});