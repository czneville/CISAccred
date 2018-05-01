var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('userController', function ($scope, session, php) {
    session.showLoginForm();
    $scope.activeTab = new Object();
    $scope.activeTab.active = 'user';
    $scope.activeTab.set = function (tab) {
        $("#" + $scope.activeTab.active).removeClass("active");
        $scope.activeTab.active = tab;
        $("#" + tab).addClass("active");
    };

    $scope.user = new Object();
    $scope.chooseUserFunction = function () {
        if ($scope.user.verb == "add") {
            $scope.addUser();
        }
        if ($scope.user.verb == "modify") {
            $scope.modifyUser();
        }
        if ($scope.user.verb == "delete") {
            $scope.deleteUser();
        }
    };

    $scope.evaluator = new Object();
    $scope.chooseEvaluatorFunction = function () {
        if ($scope.evaluator.verb == "add") {
            $scope.addEvaluator();
        }
        if ($scope.evaluator.verb == "modify") {
            $scope.modifyEvaluator();
        }
        if ($scope.evaluator.verb == "delete") {
            $scope.deleteEvaluator();
        }
    };

    $scope.addUser = function () {
        var postData = Array();
        postData["verb"] = "add";
        postData["id"] = $scope.user.id;
        postData["fname"] = $scope.user.fname;
        postData["lname"] = $scope.user.lname;
        postData["username"] = $scope.user.username;
        postData["password"] = $scope.user.password;
        postData["isadmin"] = $scope.user.isadmin;
        postData["session_key"] = session.key;

        var url = "api/addUser.php";

        php.post(postData, url, function () {
            $().notify("User added.", "success");
            $("#addUser > div.modal-dialog > div > div.modal-footer > button").click();
            updateUsers();
        }, function (response) {
            $("#userAdd").notify("Add user failed!\n" + response.data);
        });
    }

    $scope.modifyUser = function () {
        var postData = Array();
        postData["verb"] = "modify";
        postData["id"] = $scope.user.id;
        postData["fname"] = $scope.user.fname;
        postData["lname"] = $scope.user.lname;
        postData["username"] = $scope.user.username;
        postData["password"] = $scope.user.password;
        postData["isadmin"] = $scope.user.isadmin;
        postData["session_key"] = session.key;

        var url = "api/addUser.php";

        php.post(postData, url, function () {
            $().notify("User modified.", "success");
            $("#addUser > div.modal-dialog > div > div.modal-footer > button").click();
            updateUsers();
        }, function (response) {
            $("#userAdd").notify("Modify user failed!\n" + response.data);
        });
    }

    $scope.deleteUser = function () {
        var postData = Array();
        postData["verb"] = "delete";
        postData["id"] = $scope.user.id;
        postData["session_key"] = session.key;

        var url = "api/addUser.php";

        php.post(postData, url, function () {
            $().notify("User Deleted.", "success");
            $("#userAdd > div.modal-dialog > div > div.modal-footer > button").click();
            updateUsers();
        }, function (response) {
            $("#userAdd").notify("Delete user failed!\n" + response.data);
        });
    }

    $scope.addEvaluator = function () {
        var postData = Array();
        postData["verb"] = "add";
        postData["id"] = $scope.evaluator.id;
        postData["name"] = $scope.evaluator.name;
        postData["session_key"] = session.key;

        var url = "api/addEvaluator.php";

        php.post(postData, url, function () {
            $().notify("Evaluator added.", "success");
            $("#addEvaluator > div.modal-dialog > div > div.modal-footer > button").click();
            updateEvaluators();
        }, function (response) {
            $("#evaluatorAdd").notify("Add evaluator failed!\n" + response.data);
        });
    }

    $scope.modifyEvaluator = function () {
        var postData = Array();
        postData["verb"] = "modify";
        postData["id"] = $scope.evaluator.id;
        postData["name"] = $scope.evaluator.name;
        postData["session_key"] = session.key;

        var url = "api/addEvaluator.php";

        php.post(postData, url, function () {
            $().notify("Evaluator added.", "success");
            $("#addEvaluator > div.modal-dialog > div > div.modal-footer > button").click();
            updateEvaluators();
        }, function (response) {
            $("#evaluatorAdd").notify("Modify evaluator failed!\n" + response.data);
        });
    }

    $scope.deleteEvaluator = function () {
        var postData = Array();
        postData["verb"] = "delete";
        postData["id"] = $scope.evaluator.id;
        postData["session_key"] = session.key;

        var url = "api/addEvaluator.php";

        php.post(postData, url, function () {
            $().notify("Evaluator Deleted.", "success");
            $("#evaluatorAdd > div.modal-dialog > div > div.modal-footer > button").click();
            updateEvaluators();
        }, function (response) {
            $("#evaluatorAdd").notify("Delete evaluator failed!\n" + response.data);
        });
    }

    var updateUsers = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "1";

        var url = "api/getUser.php";

        php.post(postData, url, function (response) {
            $scope.users = new Object();
            $scope.users = angular.fromJson(response.data);
        }, function (response) {
            $("#userAdd").notify("Failed to load list of users!\n" + response.data);
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

    $scope.firstUpper = function (word) {
        if (typeof (word) !== "undefined") {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }
    };

    updateUsers();
    updateEvaluators();
});