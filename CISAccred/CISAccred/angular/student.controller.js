var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('studentController', function ($scope, session, php) {
    session.showLoginForm();

    $scope.selectedYear = 'undefined';
    $scope.selectedSemester = 'undefined';
    $scope.selectedClass = 'undefined';
    $scope.selectedRubric = 'undefined';

    $scope.firstUpper = function (word) {
        if (typeof (word) !== "undefined") {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }
    };


    var updateClasses = function () {
        if (session.key == "") { return; }
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
        if (session.key == "") { return; }
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
        if (session.key == "") { return; }
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
        if ($scope.scoreset.verb == 'add') {
            addScoreset();
        }
        if ($scope.scoreset.verb == 'edit') {
            editScoreset();
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
            $('#scoresetModal > div.modal-dialog > div > div.modal-footer > button').click();
            updateScoresets();
        }, function () {
            //fail
        })
    };
    var editScoreset = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["scoreset"] = angular.toJson($scope.scoreset);
        postData["verb"] = 'edit';

        var url = 'api/scoreset.php';

        php.post(postData, url, function () {
            //succeed
            $('#scoresetModal > div.modal-dialog > div > div.modal-footer > button').click();
            updateScoresets();
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
            updateScoresets();
        }, function (response) {
            $("").notify("Failed to load criteria list!\n" + response.data);
        });
    };
    var updateScoresets = function () {
        var postData = Array();
        postData['r_id'] = $scope.selectedRubric;
        postData['c_id'] = $scope.selectedClass;
        postData['semester'] = $scope.selectedSemester + " " + $scope.selectedYear;
        postData['verb'] = 'get';
        postData['session_key'] = session.key;

        var url = 'api/scoreset.php';

        php.post(postData, url, function (response) {
            $scope.scoresets = new Object();
            $scope.scoresets = angular.fromJson(response.data);
        }, function (response) {

        })
    };
    $scope.loadScoreset = function (id) {
        var postData = Array();
        postData['id'] = id;
        postData['verb'] = 'getscoreset';
        postData['session_key'] = session.key;

        var url = 'api/scoreset.php';

        php.post(postData, url, function (response) {
            $scope.scoreset = new Object();
            var scores = angular.fromJson(response.data);
            $scope.scoreset.R_ID = scores[0]['R_ID'];
            $scope.scoreset.C_ID = scores[0]['C_ID'];
            $scope.scoreset.P_ID = scores[0]['P_ID'];
            $scope.scoreset.C_SEMESTER = scores[0]['C_SEMESTER'];
            $scope.scoreset.SCORE_ID = id;
            $scope.scoreset.EVAL_ID = scores[0]['EVAL_ID'];
            $scope.scoreset.STUDENT_NUM = scores[0]['STUDENT_NUM'];
            $scope.scoreset.C_SECTION = scores[0]['C_SECTION'];
            $scope.scoreset.criteria = Object();
            $scope.scoreset.verb = 'edit';
            for (var c in scores) {
                $scope.scoreset.criteria[scores[c]['CRIT_ID']] = Object();
                $scope.scoreset.criteria[scores[c]['CRIT_ID']]['score'] = parseInt(scores[c]['SCORESET_SCORE']);

            }
            
        }, function (response) {

        })
    };
    $scope.resetScoreset = function () {
        $scope.scoreset = new Object();
        $scope.scoreset.verb = 'add';
    };

    updateClasses();
    updateRubrics();
    updateRubricClasses();
    updateEvaluators();
});