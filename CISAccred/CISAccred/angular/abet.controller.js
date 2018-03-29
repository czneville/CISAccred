var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('abetController', function ($scope, session) {
    session.showLoginForm();
    $scope.message = 'You\'re on the ABET data page!';
});