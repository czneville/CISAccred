var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('abetController', function ($scope, session, php) {
    session.showLoginForm();
    $scope.message = 'You\'re on the ABET data page!';

    $scope.addClass = function (c_semester, c_course_num, c_section, successCallBack, failCallBack) {
        var classData = Array();
        classData["c_semester"] = c_semester;
        classData["c_course_num"] = c_course_num;
        classData["c_section"] = c_section;

        var url = '/api/addClass.php';

        php.post(classData, url, function (response) { });
    }

    $scope.addCriteria = function () {
        var criteriaData = Array();
        criteriaData["criteria_line"] = criteria_line;
        criteriaData["r_id"] = r_id;
        criteriaData["crit_task_name"] = crit_task_name;
        criteriaData["crit_task_desc"] = crit_task_desc;

        var url = '/api/addCriteria.php';

        php.post(criteriaData, url, function (response) { });
    }

    $scope.addObjective = function () {
        var objectiveData = Array();
        objectiveData["obj_id"] = obj_id;
        objectiveData["obj_name"] = obj_name;
        objectiveData["obj_desc"] = obj_desc;
        objectiveData["obj_bench"] = obj_bench;

        var url = '/api/addObjective.php';

        php.post(objectiveData, url, function (response) { });
    }

    $scope.addOutcome = function () {
        var outcomeData = Array();
        outcomeData["out_id"] = out_id;
        outcomeData["out_name"] = out_name;
        outcomeData["out_desc"] = out_desc;
        outcomeData["out_benchmark"] = out_benchmark;

        var url = '/api/addOutcome.php';

        php.post(outcomeData, url, function (response) { });
    }

    $scope.addRubric = function () {
        var rubricData = Array();
        rubricData["r_id"] = r_id;
        rubricData["r_name"] = r_name;
        rubricData["r_assessment_meth"] = r_assessment_meth;

        var url = '/api/addRubric.php';

        php.post(rubricData, url, function (response) { });
    }

    $scope.addScoreset = function () {
        var scoresetData = Array();
        scoresetData["score_id"] = score_id;
        scoresetData["student_fname"] = student_fname;
        scoresetData["student_lname"] = student_lname;
        scoresetData["r_id"] = r_id;
        scoresetData["p_id"] = p_id;
        scoresetData["c_semester"] = c_semester;
        scoresetData["c_course_num"] = c_course_num;
        scoresetData["c_section"] = c_section;

        var url = '/api/addScoreset.php';

        php.post(scoresetData, url, function (response) { });
    }

    $scope.addTask = function () {
        var taskData = Array();
        taskData["r_id"] = r_id;
        taskData["c_semester"] = c_semester;
        taskData["c_course_num"] = c_course_num;
        taskData["c_section"] = c_section;

        var url = '/api/addTask.php';

        php.post(taskData, url, function (response) { });
    }
});