var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('abetController', function ($scope, session, php) {
    session.showLoginForm();
    $scope.message = 'You\'re on the ABET data page!';

    $scope.addClass = function () {
        var semeseter = $scope.class.season + " " + $scope.class.year;
        var postData = Array();
        postData["semester"] = semeseter;
        postData["courseNumber"] = $scope.class.courseNumber;
        postData["section"] = $scope.class.section;
        
        var url = "/api/addClass.php";

        php.post(postData, url, function () {
            $("#classAdd").notify("Class added.", "success");
        }, function (response) {
            $("#classAdd").notify("Add class failed!\n"+response.data);
        });
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