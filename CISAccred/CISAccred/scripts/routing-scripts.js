var cissacred = angular.module('cissacred', ["ngRoute"]);

cissacred.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "pages/home.html",
            controller: "mainController"
        })
    $routeProvider
        .when("/reports1", {
            templateUrl: "/pages/reports/reports1.html",
            controller: "reportsController"
        });

    $routeProvider
        .when("/reports2", {
            templateUrl: "/pages/reports/reports2.html",
            controller: "reportsController"
        });

    $routeProvider
        .when("/students", {
            templateUrl: "/pages/students/students.html",
            controller: "studentsController"
        });

    $routeProvider
        .when("/students/addStudent", {
            templateUrl: "/pages/students/addStudent.html",
            controller: "studentsController"
        });

    $routeProvider
        .when("/students/deleteStudent", {
            templateUrl: "/pages/students/deleteStudent.html",
            controller: "studentsController"
        });

    $routeProvider
        .when("/students/editStudent", {
            templateUrl: "/pages/students/editStudent.html",
            controller: "studentsController"
        });

});

cissacred.controller("mainController", function ($scope) {
    $scope.message = "Welcome to the home page.";
});

cisaccred.controller("loginController", function ($scope) {
    $scope.message = "Welcome to the login page"
});

cisaccred.controller("reportsController", function ($scope) {
    $scope.message = "Report pages";
});

cisaccred.controller("studentsController", function ($scope) {
    $scope.message = "Student pages";
});