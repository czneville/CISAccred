var CISAccredApp = angular.module('CISAccredApp', ['ngRoute']);

CISAccredApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/student', {
            templateUrl: 'pages/student.html',
            controller: 'studentController'
        })
});