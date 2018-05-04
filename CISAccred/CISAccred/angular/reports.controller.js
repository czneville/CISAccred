var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('reportsController', function ($scope, session, php) {
    session.showLoginForm();

    $scope.selectedYear = new Date().getFullYear().toString();

    $scope.activeTab = new Object();
    $scope.activeTab.active = 'year';
    $scope.activeTab.set = function (tab) {
        $("#" + $scope.activeTab.active).removeClass("active");
        $scope.activeTab.active = tab;
        $("#" + tab).addClass("active");
        $scope.fetchMasterList();
    };

    $scope.fetchMasterList = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["academicYear"] = $scope.selectedYear;
        if ($scope.activeTab.active != 'year') {
            postData["fetchOutcomes"] = 0;
        } else {
            postData["fetchOutcomes"] = 1;
        }

        var url = "api/masterList.php";

        php.post(postData, url, function (response) {
            $scope.masterList = new Object();
            $scope.masterList = angular.fromJson(response.data);
            computeOutcomes();
            computeRubrics();
        }, function (response) {
            $("").notify("Failed to load criteria list!\n" + response.data);
        });
    };

    var computeOutcomes = function () {
        $scope.outcomes = new Object();
        for (var i in $scope.masterList) {
            if($scope.outcomes[$scope.masterList[i]['OUT_ID']] == null){
                $scope.outcomes[$scope.masterList[i]['OUT_ID']] = new Object();
                $scope.outcomes[$scope.masterList[i]['OUT_ID']]['OUT_NAME'] = $scope.masterList[i]['OUT_NAME'];
                $scope.outcomes[$scope.masterList[i]['OUT_ID']]['OUT_DESC'] = $scope.masterList[i]['OUT_DESC'];
                $scope.outcomes[$scope.masterList[i]['OUT_ID']]['OUT_ID'] = $scope.masterList[i]['OUT_ID'];
            }
        }
        computePerformance();
    };

    var computePerformance = function () {
        $scope.performance = new Object;
        for (var i in $scope.outcomes) {
            var points = 0;
            var total = 0;
            for (var j in $scope.masterList) {
                if ($scope.masterList[j]["OUT_ID"] == i) {
                    points += parseFloat($scope.masterList[j]["SCORESET_SCORE"]);
                    total += parseFloat($scope.masterList[j]["CRIT_MAX"]);
                }
            }
            $scope.performance[i] = new Object();
            $scope.performance[i]['score'] = Math.round(((points / total) * 5) * 100) / 100;
        }
        for (var i in $scope.performance) {
            if (($scope.performance[i]['score'] <= 2) && ($scope.performance[i]['score'] >1)) {
                $scope.performance[i]['mode'] = 'watch';
            } else if(($scope.performance[i]['score'] >= 4) && ($scope.performance[i]['score'] <5)){
                $scope.performance[i]['mode'] = 'watch';
            } else if (($scope.performance[i]['score'] <= 1) || ($scope.performance[i]['score'] >= 5)) {
                $scope.performance[i]['mode'] = 'change';
            } else {
                $scope.performance[i]['mode'] = 'good';
            }
        }
    }

    var computeRubrics = function () {
        $scope.rubrics = new Object();
        for (var i in $scope.masterList) {
            if ($scope.rubrics[$scope.masterList[i]['R_ID']] == null) {
                $scope.rubrics[$scope.masterList[i]['R_ID']] = new Object();
                $scope.rubrics[$scope.masterList[i]['R_ID']]['R_ID'] = $scope.masterList[i]['R_ID'];
                $scope.rubrics[$scope.masterList[i]['R_ID']]['R_NAME'] = $scope.masterList[i]['R_NAME'];
            }
        }
        computeRubricCriteria();
    };

    var computeRubricCriteria = function () {
        $scope.criteria = new Object();
        for (var i in $scope.masterList) {
            if ($scope.masterList[i]['R_ID'] == $scope.selectedRubric) {
                if ($scope.criteria[$scope.masterList[i]['CRIT_ID']] == null) {
                    $scope.criteria[$scope.masterList[i]['CRIT_ID']] = new Object();
                    $scope.criteria[$scope.masterList[i]['CRIT_ID']]['CRIT_ID'] = $scope.masterList[i]['CRIT_ID'];
                    $scope.criteria[$scope.masterList[i]['CRIT_ID']]['CRIT_TASK_DESC'] = $scope.masterList[i]['CRIT_TASK_DESC'];
                    $scope.criteria[$scope.masterList[i]['CRIT_ID']]['CRIT_LINE'] = $scope.masterList[i]['CRIT_LINE'];
                }
            }
        }
        computeRubricPerformance();
    };

    var computeRubricPerformance = function () {
        $scope.rubricPerformance = new Object();
        for (var i in $scope.criteria) {
            var points = 0;
            var total = 0;
            for (var j in $scope.masterList) {
                if ($scope.masterList[j]["CRIT_ID"] == i) {
                    points += parseFloat($scope.masterList[j]["SCORESET_SCORE"]);
                    total += parseFloat($scope.masterList[j]["CRIT_MAX"]);
                }
            }
            $scope.rubricPerformance[i] = new Object();
            $scope.rubricPerformance[i]['score'] = Math.round(((points / total) * 5) * 100) / 100;
        }
        for (var i in $scope.rubricPerformance) {
            if (($scope.rubricPerformance[i]['score'] <= 2) && ($scope.rubricPerformance[i]['score'] > 1)) {
                $scope.rubricPerformance[i]['mode'] = 'watch';
            } else if (($scope.rubricPerformance[i]['score'] >= 4) && ($scope.rubricPerformance[i]['score'] < 5)) {
                $scope.rubricPerformance[i]['mode'] = 'watch';
            } else if (($scope.rubricPerformance[i]['score'] <= 1) || ($scope.rubricPerformance[i]['score'] >= 5)) {
                $scope.rubricPerformance[i]['mode'] = 'change';
            } else {
                $scope.rubricPerformance[i]['mode'] = 'good';
            }
        }
    };

    $scope.fetchMasterList();
});