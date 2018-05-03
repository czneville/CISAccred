<?php
    include 'oracleQuery.php';
    include 'verifySessionKey.php';
    $verb = $_POST["verb"];
    $sessionkey = $_POST['session_key'];
    $session = verifySession($sessionkey);
    if(!$session){
        header("HTTP/1.1 500 Internal Server Error");
        echo("Invalid Session Key! Login again please!");
        exit();
    };

    if($verb=='add'){
        $scoreset = json_decode($_POST["scoreset"],true);
        $maxId = executeQuery("SELECT MAX(SCORE_ID) FROM CIS_SCORESET", true)[0]["MAX(SCORE_ID)"];
        if(!isset($maxId)){$maxId=1000;}else{$maxId++;}
        $studentId = executeQuery("SELECT MAX(STUDENT_NUM) FROM CIS_SCORESET", true)[0]["MAX(STUDENT_NUM)"];
        if(!isset($studentId)){$studentId=1;}else{$studentId++;}
        $query = executeQuery("INSERT INTO CIS_SCORESET VALUES(".$maxId.",".$scoreset['R_ID'].",".$scoreset['P_ID'].",".$scoreset['EVAL_ID'].",'".$scoreset['C_SEMESTER']."',".$scoreset['C_ID'].",'".$scoreset['C_SECTION']."',".$studentId.")",false);
        if($query){
            $keys = array_keys($scoreset["criteria"]);
            $i = 0;
            foreach ($scoreset["criteria"] as $c)
            {
            	executeQuery("INSERT INTO CIS_SCORESET_CRITERIA VALUES(".$maxId.",".$keys[$i].",".$c["score"].")",false);
                $i++;
            }
            exit();
        }else{
            header("HTTP/1.1 500 Internal Server Error");
            exit();
        }
    }

    if($verb == 'get'){
        $semester = $_POST['semester'];
        $class = $_POST['c_id'];
        $rubric = $_POST['r_id'];

        $query = executeQuery("SELECT * FROM CIS_SCORESET A WHERE A.C_SEMESTER='".$semester."' AND A.C_ID =".$class." AND A.R_ID=".$rubric." ORDER BY A.STUDENT_NUM ASC", true);
        if($query)
	    {
		    echo(json_encode($query));
		    exit();
	    }
	    else
	    {
		    echo("{}");
		    exit();
        }
    }

    if($verb == 'getscoreset'){
        $id = $_POST['id'];

        $query = executeQuery("SELECT * FROM CIS_SCORESET A, CIS_SCORESET_CRITERIA B WHERE A.SCORE_ID=B.SCORE_ID AND A.SCORE_ID=".$id, true);
        if($query)
	    {
		    echo(json_encode($query));
		    exit();
	    }
	    else
	    {
		    echo("{}");
		    exit();
        }
    }

    if($verb == 'edit'){
        $scoreset = json_decode($_POST["scoreset"],true);

        $query = executeQuery("UPDATE CIS_SCORESET SET EVAL_ID =".$scoreset['EVAL_ID'].", C_SECTION = '".$scoreset['C_SECTION']."' WHERE SCORE_ID=".$scoreset['SCORE_ID'],false);
        if($query){
            $keys = array_keys($scoreset["criteria"]);
            $i = 0;
            foreach ($scoreset["criteria"] as $c)
            {
            	executeQuery("UPDATE CIS_SCORESET_CRITERIA SET SCORESET_SCORE=".$c["score"]." WHERE SCORE_ID=".$scoreset['SCORE_ID']." AND CRIT_ID=".$keys[$i],false);
                $i++;
            }
            if($query){
                exit();
            }else{
                header("HTTP/1.1 500 Internal Server Error");
                exit();
            }
        }else{
            header("HTTP/1.1 500 Internal Server Error");
            exit();
        }
    }
?>