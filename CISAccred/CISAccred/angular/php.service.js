var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.factory('php', function ($http) {
    var php = {};

    php.post = function (postData, url, success, fail) {
        //postdata should be an associative array of values to encode in the post body
        /*
            var subs = Array();
            subs["name"]='kagami';
            subs["age"]=23;
        */
        //url is the relative url
        //"/api/verifyLogin.php"
        //success gets called when a 200 OK comes back
        //fail gets called for any 404, 403, 300, etc...
        //both receive a "response" variable, which is the http response data and headers

        var encodedPost = "";
        var postVariableCount = 0;
        for (var i in postData) {
            if (postVariableCount === 0) {
                postData[i] = encodeURIComponent(postData[i]);
                encodedPost += i + "=" + postData[i];
                postVariableCount++;
            } else {
                postData[i] = encodeURIComponent(postData[i]);
                encodedPost += "&" + i + "=" + postData[i];
            }
        }

        $http({
            method: 'POST',
            url: url,
            data: encodedPost,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            success(response);
        }, function (response) {
            fail(response);
        });
    };

    return php;
});