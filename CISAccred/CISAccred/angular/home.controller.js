var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('homeController', function ($scope,session) {
    $scope.message = session.id;
});