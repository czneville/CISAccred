var cissacred = angular.module('cissacred', ["ngRoute"]);

cissacred.config(function ($routeProvider)
{
    $routeProvider
        .when("/home", {
            templateUrl: "pages/home.html",
            controller: "mainController"
        })
});

cissacred.controller("mainController", function ($scope) {
    $scope.message = "Welcome to the home page.";
});