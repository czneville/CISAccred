var CISAccredApp = angular.module('CISAccredApp');

CISAccredApp.controller('abetController', function ($scope, session, php) {
    session.showLoginForm();
    $scope.selectedRubric = 'undefined';
    $scope.activeTab = new Object();
    $scope.activeTab.active = 'class';
    $scope.activeTab.set = function (tab) {
        $("#" + $scope.activeTab.active).removeClass("active");
        $scope.activeTab.active = tab;
        $("#" + tab).addClass("active");
    };

    $scope.activePill = new Object();
    $scope.activePill.active = 'rubrics';
    $scope.activePill.set = function (pill) {
        $("#" + $scope.activePill.active).removeClass("active");
        $scope.activePill.active = pill;
        $("#" + pill).addClass("active");
    };

    $scope.class = new Object();
    $scope.chooseClassFunction = function () {
        if ($scope.class.verb == "add") {
            $scope.addClass();
        }
        if ($scope.class.verb == "modify") {
            $scope.modifyClass();
        }
        if ($scope.class.verb == "delete") {
            $scope.deleteClass();
        }
    };
    $scope.addClass = function () {
        var postData = Array();
        postData["verb"] = "add";
        postData["courseNumber"] = $scope.class.courseNumber;
        postData["title"] = $scope.class.title;
        postData["session_key"] = session.key;

        var url = "/api/addClass.php";

        php.post(postData, url, function () {
            $().notify("Class added.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateClasses();
        }, function (response) {
            $("#classAdd").notify("Add class failed!\n" + response.data);
        });

    }
    $scope.modifyClass = function () {
        var postData = Array();
        postData["verb"] = "modify";
        postData["id"] = $scope.class.id;
        postData["courseNumber"] = $scope.class.courseNumber;
        postData["title"] = $scope.class.title;
        postData["session_key"] = session.key;

        var url = "/api/addClass.php";

        php.post(postData, url, function () {
            $().notify("Class modified.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateClasses();
        }, function (response) {
            $("#classAdd").notify("Add class failed!\n" + response.data);
        });
    }
    $scope.deleteClass = function () {
        var postData = Array();
        postData["verb"] = "delete";
        postData["id"] = $scope.class.id;
        postData["session_key"] = session.key;

        var url = "/api/addClass.php";

        php.post(postData, url, function () {
            $().notify("Class Deleted.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateClasses();
        }, function (response) {
            $("#classAdd").notify("Delete class failed!\n" + response.data);
        });
    }

    $scope.rubric = new Object();
    $scope.chooseRubricFunction = function () {
        if ($scope.rubric.verb == "add") {
            $scope.addRubric();
        }
        if ($scope.rubric.verb == "modify") {
            $scope.modifyRubric();
        }
        if ($scope.rubric.verb == "delete") {
            $scope.deleteRubric();
        }
    };

    $scope.addRubric = function () {
        var postData = Array();
        postData["verb"] = 'add';
        postData["id"] = $scope.rubric.id;
        postData["name"] = $scope.rubric.name;
        postData["assessment"] = $scope.rubric.assessment;
        postData["session_key"] = session.key;

        var url = "/api/addRubric.php";

        php.post(postData, url, function () {
            $("rubricAdd").notify("Rubric added.", "success");
            updateRubrics();
        }, function (response) {
            $("rubricAdd").notify("Add rubric failed!\n" + response.data);
        });
    }

    $scope.modifyRubric = function () {
        var postData = Array();
        postData["verb"] = 'add';
        postData["id"] = $scope.rubric.id;
        postData["name"] = $scope.rubric.name;
        postData["assessment"] = $scope.rubric.assessment;
        postData["session_key"] = session.key;
    }

    $scope.deleteRubric = function () {

    }

    $scope.outcome = new Object();
    $scope.chooseOutcomeFunction = function () {
        if ($scope.outcome.verb == "add") {
            $scope.addOutcome();
        }
        if ($scope.outcome.verb == "modify") {
            $scope.modifyOutcome();
        }
        if ($scope.outcome.verb == "delete") {
            $scope.deleteOutcome();
        }
    };
    $scope.addOutcome = function () {
        var postData = Array();
        postData["verb"] = 'add';
        postData["outcome_name"] = $scope.outcome.name;
        postData["outcome_desc"] = $scope.outcome.desc;
        postData["session_key"] = session.key;

        var url = "/api/addOutcome.php";

        php.post(postData, url, function () {
            $("#outcomeAdd").notify("Outcome added.", "success");
            updateOutcomes();
        }, function (response) {
            $("#outcomeAdd").notify("Add outcome failed!\n" + response.data);
        });
    }
    $scope.modifyOutcome = function () {
        var postData = Array();
        postData["verb"] = "modify";
        postData["id"] = $scope.outcome.id;
        postData["outcome_name"] = $scope.outcome.name;
        postData["outcome_desc"] = $scope.outcome.desc;
        postData["session_key"] = session.key;

        var url = "/api/addOutcome.php";

        php.post(postData, url, function () {
            $().notify("Class modified.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateOutcomes();
        }, function (response) {
            $("#classAdd").notify("Add class failed!\n" + response.data);
        });
    }

    $scope.deleteOutcome = function () {
        var postData = Array();
        postData["verb"] = "delete";
        postData["id"] = $scope.outcome.id;
        postData["session_key"] = session.key;

        var url = "/api/addOutcome.php";

        php.post(postData, url, function () {
            $().notify("Class Deleted.", "success");
            $("#addClass > div.modal-dialog > div > div.modal-footer > button").click();
            updateOutcomes();
        }, function (response) {
            $("#classAdd").notify("Delete class failed!\n" + response.data);
        });
    }

    $scope.rubric = new Object();
    $scope.chooseRubricFunction = function () {
        if ($scope.rubric.verb == "add") {
            $scope.addRubric();
        }
        if ($scope.rubric.verb == "modify") {
            $scope.modifyRubric();
        }
        if ($scope.rubric.verb == "delete") {
            $scope.deleteRubric();
        }
    };
    $scope.addRubric = function () {
        var postData = Array();
        postData["verb"] = 'add';
        postData["assessment_method"] = $scope.rubric.assessment_method;
        postData["name"] = $scope.rubric.name;
        postData["session_key"] = session.key;

        var url = "/api/addRubric.php";

        php.post(postData, url, function () {
            $("#outcomeAdd").notify("Rubric added.", "success");
            updateRubrics();
        }, function (response) {
            $("#outcomeAdd").notify("Add Rubric failed!\n" + response.data);
        });
    }
    $scope.modifyRubric = function () {
        var postData = Array();
        postData["verb"] = "modify";
        postData["assessment_method"] = $scope.rubric.assessment_method;
        postData["name"] = $scope.rubric.name;
        postData["id"] = $scope.rubric.id;
        postData["session_key"] = session.key;

        var url = "/api/addRubric.php";

        php.post(postData, url, function () {
            $().notify("Rubric modified.", "success");
            updateRubrics();
        }, function (response) {
            $("#classAdd").notify("Modify rubric failed!\n" + response.data);
        });
    }
    $scope.deleteRubric = function () {
        var postData = Array();
        postData["verb"] = "delete";
        postData["id"] = $scope.rubric.id;
        postData["session_key"] = session.key;

        var url = "/api/addRubric.php";

        php.post(postData, url, function () {
            $().notify("Rubric Deleted.", "success");
            updateRubrics();
        }, function (response) {
            $("#classAdd").notify("Delete rubric failed!\n" + response.data);
        });
    }

    $scope.criterion = new Object();
    $scope.chooseCriteriaFunction = function () {
        if ($scope.criterion.verb == "add") {
            $scope.addCriteria();
        }
        if ($scope.criterion.verb == "modify") {
            $scope.modifyCriteria();
        }
        if ($scope.criterion.verb == "delete") {
            $scope.deleteCriteria();
        }
        if ($scope.criterion.verb == "moveup") {
            $scope.moveCriteriaUp();
        }
        if ($scope.criterion.verb == "movedown") {
            $scope.moveCriteriaDown();
        }
    };
    $scope.addCriteria = function () {
        var postData = Array();
        postData["verb"] = 'add';
        postData["session_key"] = session.key;
        postData["R_ID"] = $scope.selectedRubric;
        postData["CRIT_DESC"] = $scope.criterion.desc;
        postData["CRIT_MIN"] = $scope.criterion.min;
        postData["CRIT_MAX"] = $scope.criterion.max;
        postData["CRIT_BENCHMARK"] = $scope.criterion.benchmark;

        var url = "/api/addCriteria.php";

        php.post(postData, url, function () {
            $("#criteriaAdd").notify("Criteria added.", "success");
            updateCriteria();
        }, function (response) {
            $("#outcomeAdd").notify("Add Criteria failed!\n" + response.data);
        });
    };
    $scope.modifyCriteria = function () {
        var postData = Array();
        postData["verb"] = 'modify';
        postData["session_key"] = session.key;
        postData["CRIT_ID"] = $scope.criterion.id;
        postData["CRIT_DESC"] = $scope.criterion.desc;
        postData["CRIT_MIN"] = $scope.criterion.min;
        postData["CRIT_MAX"] = $scope.criterion.max;
        postData["CRIT_BENCHMARK"] = $scope.criterion.benchmark;

        var url = "/api/addCriteria.php";

        php.post(postData, url, function () {
            $().notify("Criteria modified.", "success");
            updateCriteria();
        }, function (response) {
            $().notify("Modify Criteria failed!\n" + response.data);
        });
    };
    $scope.deleteCriteria = function () {
        var postData = Array();
        postData["verb"] = "delete";
        postData["id"] = $scope.criterion.id;
        postData["session_key"] = session.key;

        var url = "/api/addCriteria.php";

        php.post(postData, url, function () {
            $().notify("Criteria Deleted.", "success");
            updateCriteria();
        }, function (response) {
            $().notify("Delete criteria failed!\n" + response.data);
        });
    };
    $scope.moveCriteriaUp = function () {
        var postData = Array();
        postData["verb"] = "moveup";
        postData["id"] = $scope.criterion.id;
        postData["R_ID"] = $scope.selectedRubric;
        postData["session_key"] = session.key;

        var url = "/api/addCriteria.php";

        php.post(postData, url, function () {
            updateCriteria();
        }, function (response) {
            $().notify("Move criteria failed!\n" + response.data);
        });
    };
    $scope.moveCriteriaDown = function () {
        var postData = Array();
        postData["verb"] = "movedown";
        postData["id"] = $scope.criterion.id;
        postData["R_ID"] = $scope.selectedRubric;
        postData["session_key"] = session.key;

        var url = "/api/addCriteria.php";

        php.post(postData, url, function () {
            updateCriteria();
        }, function (response) {
            $().notify("Move criteria failed!\n" + response.data);
        });
    };

    var updateClasses = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "/api/getClass.php";
        php.post(postData, url, function (response) {
            $scope.classes = new Object();
            $scope.classes = angular.fromJson(response.data);
        }, function (response) {
            $("#classAdd").notify("Failed to load class list!\n" + response.data);
        });
    };

    var updateRubrics = function () {
        var postData = Array();
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "/api/getRubric.php";
        php.post(postData, url, function (response) {
            $scope.rubrics = new Object();
            $scope.rubrics = angular.fromJson(response.data);
        }, function (response) {
            $("rubricAdd").notify("Failed to load rubrics list!\n" + response.data);
        });
    };

    var updateOutcomes = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "/api/getOutcome.php";
        php.post(postData, url, function (response) {
            $scope.outcomes = new Object();
            $scope.outcomes = angular.fromJson(response.data);
        }, function (response) {
            $("#classAdd").notify("Failed to load outcome list!\n" + response.data);
        });
    };
    var updateRubrics = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "/api/getRubric.php";
        php.post(postData, url, function (response) {
            $scope.rubrics = new Object();
            $scope.rubrics = angular.fromJson(response.data);
        }, function (response) {
            $("#classAdd").notify("Failed to load rubric list!\n" + response.data);
        });
    };
    var updateCriteria = function () {
        var postData = Array();
        if (session.key == "") { return; }
        postData["session_key"] = session.key;
        postData["isActive"] = "1";
        var url = "/api/getCriteria.php";
        php.post(postData, url, function (response) {
            $scope.criteria = new Object();
            $scope.criteria = angular.fromJson(response.data);
        }, function (response) {
            $("").notify("Failed to load criteria list!\n" + response.data);
        });
    };
    $scope.firstUpper = function (word) {
        if (typeof (word) !== "undefined") {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }
    };

    updateClasses();
    updateRubrics();
    updateOutcomes();
    updateRubrics();
    updateCriteria();
});