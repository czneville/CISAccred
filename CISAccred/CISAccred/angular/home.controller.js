﻿var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('homeController', function ($scope, session) {
    session.showLoginForm();
    $scope.message = session.isAdmin;
});