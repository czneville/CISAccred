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

    if($verb == 'add'){
        $rubric = $_POST['rubric'];
        $class = $_POST['class'];
        $query = executeQuery("SELECT * FROM CIS_RUBRIC_CLASS WHERE R_ID=".$rubric." AND C_ID=".$class, true);
        if($query){
            header("HTTP/1.1 500 Internal Server Error");
            echo("Class already mapped!");
            exit();
        }
        $maxId = executeQuery("SELECT MAX(RELATIONSHIP_ID) FROM CIS_RUBRIC_CLASS", true)[0]["MAX(RELATIONSHIP_ID)"];
        if(!isset($maxId)){$maxId=1000;}else{$maxId++;}
        $query = executeQuery("INSERT INTO CIS_RUBRIC_CLASS VALUES(".$maxId.",".$rubric.",".$class.")",false);
        if($query){
            exit();
        }else{
            header("HTTP/1.1 500 Internal Server Error");
            exit();
        }
    };

    if($verb == 'get'){
        $R_ID = $_POST["rubric"];
        $query = executeQuery("SELECT * FROM CIS_RUBRIC_CLASS c, CIS_CLASS r WHERE c.C_ID = r.C_ID AND c.R_ID =".$R_ID,true);
        if($query){
            echo(json_encode($query));
            exit();
        }else{
            echo("{}");
            exit();
        }
    }

    if($verb == 'getall'){
        $query = executeQuery("SELECT * FROM CIS_RUBRIC_CLASS c, CIS_CLASS r, CIS_RUBRIC s WHERE c.C_ID = r.C_ID AND c.R_ID = s.R_ID",true);
        if($query){
            echo(json_encode($query));
            exit();
        }else{
            echo("{}");
            exit();
        }
    }

    if($verb == 'delete'){
        $id = $_POST["id"];
        $query = executeQuery("DELETE FROM CIS_RUBRIC_CLASS WHERE RELATIONSHIP_ID=".$id,false);
        if($query){
            exit();
        }else{
            header("HTTP/1.1 500 Internal Server Error");
            exit();
        }
    }
?>