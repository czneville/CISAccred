var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.service('session', function ($location) {

    this.key = "";

    this.id = "";

    this.username = "";

    this.isAdmin = false;

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

    this.isLoggedIn = function () {
        if (this.id != "") {
            return false;
        } else {
            return true;
        }
    }

    this.showLoginForm = function () {
        if (this.id === "") {
            $location.path("/");
        }
    };

    this.logout = function () {
        this.key = "";

        this.id = "";

        this.username = "";

        this.isAdmin = false;

        $location.path("/");
    }

});