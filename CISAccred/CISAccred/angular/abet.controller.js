var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('abetController', function ($scope, session, php) {
    session.showLoginForm();

    $scope.activeTab = new Object();
    $scope.activeTab.active = 'class';
    $scope.activeTab.set = function (tab) {
        $("#" + $scope.activeTab.active).removeClass("active");
        $scope.activeTab.active = tab;
        $("#" + tab).addClass("active");
    };

    $scope.class = new Object();
    $scope.chooseClassFunction = function () {
        if ($scope.class.verb == "add") {
            $scope.addClass();
        }
        if ($scope.class.verb == "modify") {
            $scope.modifyClass();
        }
        if ($scope.class.verb == "delete") {
            $scope.deleteClass();
        }
    };
    $scope.addClass = function () {
        var postData = Array();
        postData["verb"] = "add";
        postData["courseNumber"] = $scope.class.courseNumber;
        postData["title"] = $scope.class.title;
        postData["session_key"] = session.key;
        
        var url = "/api/addClass.php";

        php.post(postData, url, function () {
            $().notify("Class added.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateClasses();
        }, function (response) {
            $("#classAdd").notify("Add class failed!\n"+response.data);
        });
        
    }
    $scope.modifyClass = function () {
        var postData = Array();
        postData["verb"] = "modify";
        postData["id"] = $scope.class.id;
        postData["courseNumber"] = $scope.class.courseNumber;
        postData["title"] = $scope.class.title;
        postData["session_key"] = session.key;

        var url = "/api/addClass.php";

        php.post(postData, url, function () {
            $().notify("Class modified.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateClasses();
        }, function (response) {
            $("#classAdd").notify("Add class failed!\n" + response.data);
        });
    }
    $scope.deleteClass = function () {
        var postData = Array();
        postData["verb"] = "delete";
        postData["id"] = $scope.class.id;
        postData["session_key"] = session.key;

        var url = "/api/addClass.php";

        php.post(postData, url, function () {
            $().notify("Class Deleted.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateClasses();
        }, function (response) {
            $("#classAdd").notify("Delete class failed!\n" + response.data);
        });
    }

    $scope.outcome = new Object();
    $scope.chooseOutcomeFunction = function () {
        if ($scope.outcome.verb == "add") {
            $scope.addOutcome();
        }
        if ($scope.outcome.verb == "modify") {
            $scope.modifyOutcome();
        }
        if ($scope.outcome.verb == "delete") {
            $scope.deleteOutcome();
        }
    };
    $scope.addOutcome = function () {
        var postData = Array();
        postData["verb"] = 'add';
        postData["outcome_name"] = $scope.outcome.name;
        postData["outcome_desc"] = $scope.outcome.desc;
        postData["session_key"] = session.key;

        var url = "/api/addOutcome.php";

        php.post(postData, url, function () {
            $("#outcomeAdd").notify("Outcome added.", "success");
            updateOutcomes();
        }, function (response) {
            $("#outcomeAdd").notify("Add outcome failed!\n" + response.data);
        });
    }
    $scope.modifyOutcome = function () {
        var postData = Array();
        postData["verb"] = "modify";
        postData["id"] = $scope.outcome.id;
        postData["outcome_name"] = $scope.outcome.name;
        postData["outcome_desc"] = $scope.outcome.desc;
        postData["session_key"] = session.key;

        var url = "/api/addOutcome.php";

        php.post(postData, url, function () {
            $().notify("Class modified.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateOutcomes();
        }, function (response) {
            $("#classAdd").notify("Add class failed!\n" + response.data);
        });
    }
    $scope.deleteOutcome = function () {
        var postData = Array();
        postData["verb"] = "delete";
        postData["id"] = $scope.outcome.id;
        postData["session_key"] = session.key;

        var url = "/api/addOutcome.php";

        php.post(postData, url, function () {
            $().notify("Class Deleted.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateOutcomes();
        }, function (response) {
            $("#classAdd").notify("Delete class failed!\n" + response.data);
        });
    }

    var updateClasses = function () {
        var postData = Array();
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "/api/getClass.php";
        php.post(postData, url, function (response) {
            $scope.classes = new Object();
            $scope.classes = angular.fromJson(response.data);
        }, function (response) {
            $("#classAdd").notify("Failed to load class list!\n" + response.data);
        });
    };
    var updateOutcomes = function () {
        var postData = Array();
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "/api/getOutcome.php";
        php.post(postData, url, function (response) {
            $scope.outcomes = new Object();
            $scope.outcomes = angular.fromJson(response.data);
        }, function (response) {
            $("#classAdd").notify("Failed to load class list!\n" + response.data);
        });
    };

    updateClasses();
    updateOutcomes();
});