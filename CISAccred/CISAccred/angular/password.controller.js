var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('passwordController', function ($scope, session, php) {
    session.showLoginForm();

    $scope.change = new Object();

    $scope.message = "Hasn't run";

    $scope.changePassword = function () {
        var postData = Array();
        postData["id"] = session.id;
        postData["old"] = $scope.change.old;
        postData["new"] = $scope.change.new;
        postData["session_key"] = session.key;

        var url = "api/changePassword.php";

        php.post(postData, url, function () {
            $("#password-btn").notify("Password changed!", "success");
        }, function (response) {
            $("#passwordChange").notify("Password change failed!\n" + response.data);
        });
    }

    
});