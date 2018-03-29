var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('loginController', function ($scope, $http, $location, authentication, session) {
    $scope.login = function () {
        authentication.login($scope.username, $scope.password, function (result) {
            session.setKey(result["session_key"]);
            session.setId(result["p_id"]);
            session.setName(result["username"]);
            if (result["p_isadmin"] === "1") {
                session.isAdmin = true;
            } else {
                session.isAdmin = false;
            }
            $location.path("/home");
        }, function () {
            $.notify("Login Failed!");
        });
    };
});