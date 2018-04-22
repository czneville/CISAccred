var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('userController', function ($scope, session, php) {
    session.showLoginForm();
    $scope.message = 'You\'re on the user management page!';

    var updateUsers = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        var url = "/api/getUser.php";
        php.post(postData, url, function (response) {
            $scope.users = new Object();
            $scope.users = angular.fromJson(response.data);
        }, function (response) {
            $("#userAdd").notify("Failed to load list of users!\n" + response.data);
        });
    };

    updateUsers();
});