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
    $criteria = $_POST['criteria'];
    $outcome = $_POST['outcome'];
    $query = executeQuery('SELECT * FROM CIS_OUTCOME_CRITERIA_MAP WHERE CRIT_ID='.$criteria.' AND OUT_ID='.$outcome,true);
    if($query){
        header("HTTP/1.1 500 Internal Server Error");
        echo("Class already mapped!");
        exit();
    }
    $maxId = executeQuery("SELECT MAX(RELATIONSHIP_ID) FROM CIS_OUTCOME_CRITERIA_MAP", true)[0]["MAX(RELATIONSHIP_ID)"];
    if(!isset($maxId)){$maxId=1000;}else{$maxId++;}
    $query = executeQuery("INSERT INTO CIS_OUTCOME_CRITERIA_MAP VALUES(".$maxId.",".$criteria.",".$outcome.")", false);
    if($query){
        exit();
    }else{
        header("HTTP/1.1 500 Internal Server Error");
        exit();
    }
};

if($verb == 'get'){
    $criteria = $_POST['criteria'];
    $query = executeQuery("SELECT * FROM CIS_OUTCOME_CRITERIA_MAP c, CIS_OUTCOME o WHERE c.OUT_ID = o.OUT_ID AND c.CRIT_ID=".$criteria,true);
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
    $query = executeQuery("DELETE FROM CIS_OUTCOME_CRITERIA_MAP WHERE RELATIONSHIP_ID=".$id,false);
    if($query){
        exit();
    }else{
        header("HTTP/1.1 500 Internal Server Error");
        exit();
    }
}
?>