var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('abetController', function ($scope, session, php) {
    session.showLoginForm();
    $scope.message = 'You\'re on the ABET data page!';

    $scope.addClass = function (c_semester, c_course_num, c_section, successCallBack, failCallBack) {
        var classData = Array();
        classData["c_semester"] = c_semester;
        classData["c_course_num"] = c_course_num;
        classData["c_section"] = c_section;
        php.post(classData, url, function (response) { });

        var url = '/api/addClass.php';

    }

    $scope.addCriteria = function () {
        var classData = Array();
        classData["criteria_line"] = criteria_line;
        classData["r_id"] = r_id;
        classData["crit_task_name"] = crit_task_name;
        classData["crit_task_desc"] = crit_task_desc;
        php.post(classData, url, function (response) { });

        var url = '/api/addCriteria.php';

    }

    $scope.addObjective = function () {
        var classData = Array();
        classData["obj_id"] = obj_id;
        classData["obj_name"] = obj_name;
        classData["obj_desc"] = obj_desc;
        classData["obj_bench"] = obj_bench;
        php.post(classData, url, function (response) { });

        var url = '/api/addObjective.php';

    }

    $scope.addOutcome = function () {
        var classData = Array();
        classData["out_id"] = out_id;
        classData["out_name"] = out_name;
        classData["out_desc"] = out_desc;
        classData["out_benchmark"] = out_benchmark;
        php.post(classData, url, function (response) { });

        var url = '/api/addOutcome.php';

    }

    $scope.addRubric = function () {
        var classData = Array();
        classData["r_id"] = r_id;
        classData["r_name"] = r_name;
        classData["r_assessment_meth"] = r_assessment_meth;
        php.post(classData, url, function (response) { });

        var url = '/api/addRubric.php';

    }

    $scope.addScoreset = function () {
        var classData = Array();
        classData["score_id"] = score_id;
        classData["student_fname"] = student_fname;
        classData["student_lname"] = student_lname;
        classData["r_id"] = r_id;
        classData["p_id"] = p_id;
        classData["c_semester"] = c_semester;
        classData["c_course_num"] = c_course_num;
        classData["c_section"] = c_section;
        php.post(classData, url, function (response) { });

        var url = '/api/addScoreset.php';

    }

    $scope.addTask = function () {
        var classData = Array();
        classData["r_id"] = r_id;
        classData["c_semester"] = c_semester;
        classData["c_course_num"] = c_course_num;
        classData["c_section"] = c_section;
        php.post(classData, url, function (response) { });

        var url = '/api/addTask.php';

    }
});