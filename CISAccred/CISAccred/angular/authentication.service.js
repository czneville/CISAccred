var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.factory('authentication', function ($http, php) {
    var authentication = {};
    
    authentication.login = function (username, password, successCallBack, failCallBack) {
        var postData = Array();
        postData["username"] = username;
        postData["password"] = password;
        var url = 'api/verifyLogin.php';
        php.post(postData, url, function (response) {
            $loginresult = response.data;
            if ($loginresult["p_id"] == undefined) {
                //failed login -- login incorrect
                failCallBack();
            } else {
                //login succeeded
                var result = {};
                result["p_id"] = $loginresult["p_id"];
                result["session_key"] = $loginresult["session_key"];
                result["username"] = $loginresult["p_name"];
                result["p_isadmin"] = $loginresult["p_isadmin"];
                successCallBack(result);
            }
        }, function (response) {
            failCallBack();
        });
    };

    authentication.checkSession = function (key) {

    };
    return authentication;
});