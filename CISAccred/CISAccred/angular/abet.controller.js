var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('abetController', function ($scope, session, php) {
    session.showLoginForm();
    $scope.message = 'You\'re on the ABET data page!';
    $scope.class = new Object();
    $scope.outcome = new Object();
    $scope.class.season = "Fall";
    $scope.class.year = new Date().getFullYear().toString();
    $scope.addClass = function () {
        var semeseter = $scope.class.season + " " + $scope.class.year;
        var postData = Array();
        postData["semester"] = semeseter;
        postData["courseNumber"] = $scope.class.courseNumber;
        postData["section"] = $scope.class.section;
        postData["session_key"] = session.key;
        
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
        var postData = Array();
        postData["out_name"] = $scope.outcome.name;
        postData["out_desc"] = $scope.outcome.desc;
        postData["session_key"] = session.key;

        var url = "/api/addOutcome.php";

        php.post(postData, url, function () {
            $("#outcomeAdd").notify("Outcome added.", "success");
        }, function (response) {
            $("#outcomeAdd").notify("Add outcome failed!\n" + response.data);
        });
    }

    $scope.addRubric = function () {

    }

    $scope.addScoreset = function () {

    }

    $scope.addTask = function () {

    }
});