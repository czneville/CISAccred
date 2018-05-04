<?php
    include 'oracleQuery.php';
    include 'verifySessionKey.php';
    $academicYear = $_POST['academicYear'];
    $sessionkey = $_POST['session_key'];
    $outcomes = $_POST["fetchOutcomes"];
    $session = verifySession($sessionkey);
    if(!$session){
    header("HTTP/1.1 500 Internal Server Error");
        echo("Invalid Session Key! Login again please!");
        exit();
    };
    if($outcomes){
        $query = executeQuery("SELECT * FROM CIS_RUBRIC R, CIS_SCORESET S, CIS_SCORESET_CRITERIA A, CIS_OUTCOME O, CIS_OUTCOME_CRITERIA_MAP M, CIS_CRITERIA C WHERE S.SCORE_ID = A.SCORE_ID AND A.CRIT_ID=C.CRIT_ID AND O.OUT_ID = M.OUT_ID AND M.CRIT_ID = C.CRIT_ID AND C.R_ID = R.R_ID AND C_SEMESTER IN ('Summer ".$academicYear."','Fall ".$academicYear."','Spring ".($academicYear+1)."')",true);

        if($query){
            echo(json_encode($query));
            exit();
        }else{
            echo("{}");
            exit();
        }
    }else{
        $query = executeQuery("SELECT * FROM CIS_RUBRIC R, CIS_SCORESET S, CIS_SCORESET_CRITERIA A, CIS_CRITERIA C WHERE S.SCORE_ID = A.SCORE_ID AND A.CRIT_ID=C.CRIT_ID AND C.R_ID = R.R_ID AND C_SEMESTER IN ('Summer ".$academicYear."','Fall ".$academicYear."','Spring ".($academicYear+1)."')",true);

        if($query){
            echo(json_encode($query));
            exit();
        }else{
            echo("{}");
            exit();
        }
    }

?>