var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('userController', function ($scope, session) {
    session.showLoginForm();
    $scope.message = 'You\'re on the user management page!';

    $scope.addUser = function (p_id, p_name, p_username, p_password, p_isadmin, successCallBack, failCallBack) {
        var userData = Array();
        userData[""] = p_id;
        userData[""] = p_name;
        userData[""] = p_username;
        userData[""] = p_password;
        userData[""] = p_isadmin;

});