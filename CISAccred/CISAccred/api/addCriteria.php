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

    if($verb == "add"){
        $R_ID = $_POST["R_ID"];
        $CRIT_TASK_DESC = $_POST["CRIT_DESC"];
        $CRIT_MIN = $_POST["CRIT_MIN"];
        $CRIT_MAX = $_POST["CRIT_MAX"];
        $CRIT_BENCHMARK = $_POST["CRIT_BENCHMARK"];
        $maxId = executeQuery("SELECT MAX(CRIT_ID) FROM CIS_CRITERIA", true)[0]["MAX(CRIT_ID)"];
        if(!isset($maxId)){$maxId=1000;}else{$maxId++;}
        $line = executeQuery("SELECT MAX(CRIT_LINE) FROM CIS_CRITERIA WHERE R_ID=".$R_ID." AND CRIT_ISACTIVE=1", true)[0]["MAX(CRIT_LINE)"];
        if(!isset($line)){$line=1;}else{$line++;}
        $query = executeQuery("INSERT INTO CIS_CRITERIA VALUES(".$maxId.",".$R_ID.",'".$CRIT_TASK_DESC."',".$line.",".$CRIT_MIN.",".$CRIT_MAX.",".$CRIT_BENCHMARK.",1)",false);
        if($query){
            exit();
        }else{
            header("HTTP/1.1 500 Internal Server Error");
            exit();
        }
    }

    if($verb == "delete"){
        $c_id = $_POST['id'];
        $query = executeQuery("UPDATE CIS_CRITERIA SET CRIT_ISACTIVE = 0 WHERE CRIT_ID =".$c_id,false);
        if($query){
            exit();
        }else{
            header("HTTP/1.1 500 Internal Server Error");
            exit();
        }
    }

    if($verb == "modify"){
        $CRIT_ID = $_POST["CRIT_ID"];
        $CRIT_TASK_DESC = $_POST["CRIT_DESC"];
        $CRIT_MIN = $_POST["CRIT_MIN"];
        $CRIT_MAX = $_POST["CRIT_MAX"];
        $CRIT_BENCHMARK = $_POST["CRIT_BENCHMARK"];
        $query = executeQuery("UPDATE CIS_CRITERIA SET CRIT_TASK_DESC='".$CRIT_TASK_DESC."', CRIT_MIN=".$CRIT_MIN.", CRIT_MAX=".$CRIT_MAX.", CRIT_BENCHMARK=".$CRIT_BENCHMARK." WHERE CRIT_ID=".$CRIT_ID,false);
        if($query){
            exit();
        }else{
            header("HTTP/1.1 500 Internal Server Error");
            exit();
        }
    }

    if($verb == "moveup"){
        $CRIT_ID = $_POST["id"];
        $R_ID = $_POST["R_ID"];
        $currentLine = executeQuery("SELECT CRIT_LINE FROM CIS_CRITERIA WHERE CRIT_ID =".$CRIT_ID." AND CRIT_ISACTIVE=1", true);
        $currentLine = intval($currentLine[0]['CRIT_LINE']);
        if($currentLine > 1){
            $otherCrit = executeQuery("SELECT CRIT_ID FROM CIS_CRITERIA WHERE R_ID=".$R_ID." AND CRIT_LINE=".(intval($currentLine)-1)." AND CRIT_ISACTIVE=1",true)[0]['CRIT_ID'];
            if($otherCrit){
                executeQuery("UPDATE CIS_CRITERIA SET CRIT_LINE=".$currentLine." WHERE CRIT_ID=".$otherCrit, false);
            }
            $result = executeQuery("UPDATE CIS_CRITERIA SET CRIT_LINE=".(intval($currentLine)-1)." WHERE CRIT_ID=".$CRIT_ID, false);
            if($result){
                exit();
            }
        }
        header("HTTP/1.1 500 Internal Server Error");
        exit();
    }
    if($verb == "movedown"){
        $CRIT_ID = $_POST["id"];
        $R_ID = $_POST["R_ID"];
        $currentLine = executeQuery("SELECT CRIT_LINE FROM CIS_CRITERIA WHERE CRIT_ID =".$CRIT_ID." AND CRIT_ISACTIVE=1", true);
        $currentLine = intval($currentLine[0]['CRIT_LINE']);
        if($currentLine){
            $otherCrit = executeQuery("SELECT CRIT_ID FROM CIS_CRITERIA WHERE R_ID=".$R_ID." AND CRIT_LINE=".(intval($currentLine)+1)." AND CRIT_ISACTIVE=1",true)[0]['CRIT_ID'];
            if($otherCrit){
                executeQuery("UPDATE CIS_CRITERIA SET CRIT_LINE=".$currentLine." WHERE CRIT_ID=".$otherCrit, false);
            }else{
                header("HTTP/1.1 500 Internal Server Error");
                exit();
            }
            $result = executeQuery("UPDATE CIS_CRITERIA SET CRIT_LINE=".(intval($currentLine)+1)." WHERE CRIT_ID=".$CRIT_ID, false);
            if($result){
                exit();
            }
        }
        header("HTTP/1.1 500 Internal Server Error");
        exit();
    }
?>