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
        .when('/user', {
            templateUrl: 'pages/user.html',
            controller: 'userController'
        })
        .when('/abet', {
            templateUrl: 'pages/abet.html',
            controller: 'abetController'
        })

        .when('/hidden', {
            templateUrl: 'pages/hidden.html',
            controller: 'hiddenController'
        })
});