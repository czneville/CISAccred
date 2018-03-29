var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('studentController', function ($scope, session) {
    session.showLoginForm();
    $scope.message = 'You\'re on the students page!';
});