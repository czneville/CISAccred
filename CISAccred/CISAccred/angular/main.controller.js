﻿var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('mainController', function ($scope, $location) {
    $scope.$location = $location;
});