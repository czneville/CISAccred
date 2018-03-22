var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.service('session', function () {

    this.key = "";

    this.id = "";

    this.username = "";

    this.setId = function (id) {
        if (typeof (id) !== "undefined") {
            this.id = id;
            return true;
        } else {
            return false;
        }
    };

    this.setKey = function (key) {
        if (typeof (key) !== "undefined") {
            this.key = key;
            return true;
        } else {
            return false;
        }
    };

    this.setName = function (username) {
        if (typeof (username) !== "undefined") {
            this.username = username;
            return true;
        } else {
            return false;
        }
    };

});