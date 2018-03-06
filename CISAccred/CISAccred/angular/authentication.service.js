﻿var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.factory('authentication', function ($http) {
    var authentication = {};
    
    authentication.login = function (username, password, successCallBack, failCallBack) {
        var post_data = "username=" + username + "&password=" + password;
        $http({
            method: 'POST',
            url: '/api/verifyLogin.php',
            data: post_data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            $loginresult = response.data;
            if ($loginresult["p_id"] == undefined) {
                //failed login -- login incorrect
                failCallBack();
            } else {
                //login succeeded
                var result = {};
                result["p_id"]=$loginresult["p_id"];
                result["session_key"] = $loginresult["session_key"];
                successCallBack(result);
            }

        }, function (response) {
            failCallBack();
        });
    };
    return authentication;
});