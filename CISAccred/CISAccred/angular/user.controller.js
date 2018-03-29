var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('userController', function ($scope, session) {
    session.showLoginForm();
    $scope.message = 'You\'re on the user management page!';
});