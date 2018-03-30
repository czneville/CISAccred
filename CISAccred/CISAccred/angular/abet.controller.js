var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('abetController', function ($scope, session, php) {
    session.showLoginForm();
    $scope.message = 'You\'re on the ABET data page!';

    $scope.addClass = function () {
        var classData = Array();
        classData["c_semester"] = c_semester;
        classData["c_course_num"] = c_course_num;
        classData["c_section"] = c_section;
        php.post(classData, url, function (response) {});

        var url = '/api/addClass.php';

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