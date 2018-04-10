var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('userController', function ($scope, session) {
    session.showLoginForm();
    $scope.message = 'You\'re on the user management page!';

    $scope.addUser = function () {
        var postData = Array();
        postData["p_id"] = p_id;
        postData["p_fname"] = p_fname;
        postData["p_lname"] = p_lname;
        postData["p_username"] = p_username;
        postData["p_password"] = p_password;
        postData["p_isadmin"] = p_isadmin;

        var url = "api/addUser.php";

        php.post(postData, url, function () {
            $("#addUser").notify("User added.", "success");
        }, function (response) {
            $("#addUser").notify("Add user failed!\n" + response.data);
        });
    }
});