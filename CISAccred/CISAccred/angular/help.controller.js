var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('helpController', function ($scope, session) {
    session.showLoginForm();
    $scope.activeTab = new Object();
    $scope.activeTab.active = 'terms';
    $scope.activeTab.set = function (tab) {
        $("#" + $scope.activeTab.active).removeClass("active");
        $scope.activeTab.active = tab;
        $("#" + tab).addClass("active");
    };
});