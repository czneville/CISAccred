var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('mainController', function ($scope, $location, session) {
    $scope.session = session;
    $scope.$location = $location;
});