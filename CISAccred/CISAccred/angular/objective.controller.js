var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('objectiveController', function ($scope, session, php) {
    session.showLoginForm();

    $scope.activeTab = new Object();
    $scope.activeTab.active = 'objective';
    $scope.activetab.set = function (tab) {
        $("#" + $scope.activeTab.active).removeClass("active");
        $scope.activeTab.active = tab;
        $("#" + tab).addClass("active");
    };

    $scope.objective = new Object();

    $scope.chooseObjectiveFunction = function () {
        if ($scope.objective.verb == "add") {
            $scope.addObjective();
        }
        if ($scope.objective.verb == "modify") {
            $scope.modifyObjective();
        }
        if ($scope.objective.verb == "delete") {
            $scope.deleteObjective();
        }
    };

    var updateObjectives = function () {
        var postData = Array();
        if (session.key == "")
        {
            return;
        }

        postData["session_key"] = session.key;
        postData["verb"] = "active";
        postData["isActive"] = "1";
        var url = "api/objective.php";

        php.post(postData, url, function (response) {
            $scope.objectives = new Object();
            $scope.objectives = angular.fromJson(response.data);
        }, function (response) {
            $("#objectiveAdd").notify("Failed to load objectives list!\n" + response.data);
        });
    };


});