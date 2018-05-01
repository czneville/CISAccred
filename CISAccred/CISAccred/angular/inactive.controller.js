﻿var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('inactiveController', function ($scope, session, php) {
    session.showLoginForm();
    $scope.activeTab = new Object();
    $scope.activeTab.active = 'class';
    $scope.activeTab.set = function (tab) {
        $("#" + $scope.activeTab.active).removeClass("active");
        $scope.activeTab.active = tab;
        $("#" + tab).addClass("active");
    };

    $scope.class = new Object();
    $scope.rubric = new Object();
    $scope.outcome = new Object();
    $scope.user = new Object();
    $scope.evaluator = new Object();

    var updateClasses = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "0";
        postData["verb"] = "get";
        var url = "api/inactiveClass.php";
        php.post(postData, url, function (response) {
            $scope.classes = new Object();
            $scope.classes = angular.fromJson(response.data);
        }, function (response) {
            $().notify("Failed to load class list!\n" + response.data);
        });
    };

    var updateUsers = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "0";
        postData["verb"] = "get";
        var url = "api/inactiveUser.php";
        php.post(postData, url, function (response) {
            $scope.users = new Object();
            $scope.users = angular.fromJson(response.data);
        }, function (response) {
            $().notify("Failed to load user list!\n" + response.data);
        });
    };

    var updateRubrics = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "0";
        postData["verb"] = "get";
        var url = "api/inactiveRubric.php";
        php.post(postData, url, function (response) {
            $scope.rubrics = new Object();
            $scope.rubrics = angular.fromJson(response.data);
        }, function (response) {
            $().notify("Failed to load rubric list!\n" + response.data);
        });
    };

    var updateOutcomes = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "0";
        postData["verb"] = "get";
        var url = "api/inactiveOutcome.php";
        php.post(postData, url, function (response) {
            $scope.outcomes = new Object();
            $scope.outcomes = angular.fromJson(response.data);
        }, function (response) {
            $().notify("Failed to load outcome list!\n" + response.data);
        });
    };

    var updateEvaluators = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "0";
        postData["verb"] = "get";
        var url = "api/inactiveEvaluator.php";
        php.post(postData, url, function (response) {
            $scope.evaluators = new Object();
            $scope.evaluators = angular.fromJson(response.data);
        }, function (response) {
            $().notify("Failed to load evaluator list!\n" + response.data);
        });
    };


    $scope.restoreClass = function () {
        var postData = Array();
        postData["verb"] = "restore";
        postData["id"] = $scope.class.id;
        postData["isActive"] = "0";
        postData["session_key"] = session.key;

        var url = "api/inactiveClass.php";

        php.post(postData, url, function () {
            $().notify("Class Restored.", "success");
            $("#restoreClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateClasses();
        }, function (response) {
            $().notify("Restore class failed!\n" + response.data);
            });
    }

    $scope.restoreRubric = function () {
        var postData = Array();
        postData["verb"] = "restore";
        postData["id"] = $scope.rubric.id;
        postData["isActive"] = "0";
        postData["session_key"] = session.key;

        var url = "api/inactiveRubric.php";

        php.post(postData, url, function () {
            $().notify("Rubric Restored.", "success");
            $("#restoreClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateRubrics();
        }, function (response) {
            $().notify("Restore class failed!\n" + response.data);
        });
    }

    $scope.restoreOutcome = function () {
        var postData = Array();
        postData["verb"] = "restore";
        postData["id"] = $scope.outcome.id;
        postData["isActive"] = "0";
        postData["session_key"] = session.key;

        var url = "api/inactiveOutcome.php";

        php.post(postData, url, function () {
            $().notify("Outcome Restored.", "success");
            $("#restoreClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateOutcomes();
        }, function (response) {
            $().notify("Restore class failed!\n" + response.data);
        });
    }

    $scope.restoreUser = function () {
        var postData = Array();
        postData["verb"] = "restore";
        postData["id"] = $scope.user.id;
        postData["isActive"] = "0";
        postData["session_key"] = session.key;

        var url = "api/inactiveUser.php";

        php.post(postData, url, function () {
            $().notify("User Restored.", "success");
            $("#restoreClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateUsers();
        }, function (response) {
            $().notify("Restore class failed!\n" + response.data);
        });
    }

    $scope.restoreEvaluator = function () {
        var postData = Array();
        postData["verb"] = "restore";
        postData["id"] = $scope.evaluator.id;
        postData["isActive"] = "0";
        postData["session_key"] = session.key;

        var url = "api/inactiveEvaluator.php";

        php.post(postData, url, function () {
            $().notify("Evaluator Restored.", "success");
            $("#restoreClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateEvaluators();
        }, function (response) {
            $().notify("Restore class failed!\n" + response.data);
        });
    }

    updateClasses();
    updateRubrics();
    updateOutcomes();
    updateEvaluators();
    updateUsers();
});