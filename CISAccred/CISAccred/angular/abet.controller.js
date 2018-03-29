var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('abetController', function ($scope, session) {
    session.showLoginForm();
    $scope.message = 'You\'re on the ABET data page!';

    $scope.addClass = function () {
        $.notify("addClass");
    }

    $scope.addCriteria = function () {

    }

    $scope.addObjective = function () {

    }

    $scope.addOutcome = function () {

    }

    $scope.addRubric = function () {

    }

    $scope.addScoreset = function () {

    }

    $scope.addTask = function () {

    }
});