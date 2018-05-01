var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('studentController', function ($scope, session, php) {
    session.showLoginForm();

    $scope.selectedYear = 'undefined';
    $scope.selectedSemester = 'undefined';
    $scope.selectedClass = 'undefined';
    $scope.selectedRubric = 'undefined';

    var updateClasses = function () {
        var postData = Array();
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "api/getClass.php";
        php.post(postData, url, function (response) {
            $scope.classes = new Object();
            $scope.classes = angular.fromJson(response.data);
        }, function (response) {
            $("#classAdd").notify("Failed to load class list!\n" + response.data);
        });
    };
    var updateRubrics = function () {
        var postData = Array();
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "api/getRubric.php";
        php.post(postData, url, function (response) {
            $scope.rubrics = new Object();
            $scope.rubrics = angular.fromJson(response.data);
        }, function (response) {
            $("rubricAdd").notify("Failed to load rubrics list!\n" + response.data);
        });
    };
    var updateRubricClasses = function () {
        var postData = Array();
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        postData["verb"] = "getall";
        var url = "api/rubricClass.php";
        php.post(postData, url, function (response) {
            $scope.rubricClasses = new Object();
            $scope.rubricClasses = angular.fromJson(response.data);
        }, function (response) {

        });
    };
    var updateEvaluators = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "1";

        var url = "api/getEvaluator.php";

        php.post(postData, url, function (response) {
            $scope.evaluators = new Object();
            $scope.evaluators = angular.fromJson(response.data);
        }, function (response) {
            $("#EvaluatorAdd").notify("Failed to load list of evaluators!\n" + response.data);
        });
    };

    $scope.chooseScoresetAction = function () {
        if ($scope.scoreset.verb = 'add') {
            addScoreset();
        }
    };
    var addScoreset = function () {
        $scope.scoreset.R_ID = $scope.selectedRubric;
        $scope.scoreset.C_ID = $scope.selectedClass;
        $scope.scoreset.P_ID = session.id;
        $scope.scoreset.C_SEMESTER = $scope.selectedSemester + " " + $scope.selectedYear;
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["scoreset"] = angular.toJson($scope.scoreset);
        postData["verb"] = 'add';

        var url = 'api/scoreset.php';

        php.post(postData, url, function () {
            //succeed
        }, function () {
            //fail
        })
    };

    $scope.fetchCriteria = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "api/getCriteria.php";
        php.post(postData, url, function (response) {
            $scope.criteria = new Object();
            var data = angular.fromJson(response.data);
            for (var i in data) {
                if (data[i]["R_ID"] == $scope.selectedRubric) {
                    $scope.criteria[i] = data[i];
                }
            };
        }, function (response) {
            $("").notify("Failed to load criteria list!\n" + response.data);
        });
    };

    updateClasses();
    updateRubrics();
    updateRubricClasses();
    updateEvaluators();
});