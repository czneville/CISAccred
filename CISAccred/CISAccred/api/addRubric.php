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

    if($verb === "add"){
        $am = $_POST['assessment_method'];
        $name = $_POST['name'];
        $maxId = executeQuery("SELECT MAX(R_ID) FROM CIS_RUBRIC", true)[0]["MAX(R_ID)"];
	    if(!isset($maxId)){$maxId=1000;}else{$maxId++;}
        $query = executeQuery("INSERT INTO CIS_RUBRIC VALUES(".$maxId.",'".$name."','".$am."',1)",false);
        if($query){
        exit();    
        }else{
        header("HTTP/1.1 500 Internal Server Error");
        exit();
        }
    }
    if($verb === "modify"){
        $am = $_POST['assessment_method'];
        $name = $_POST['name'];
        $id = $_POST['id'];
        $query = executeQuery("UPDATE CIS_RUBRIC SET R_NAME='".$name."', R_ASSESSMENT_METH='".$am."' WHERE R_ID=".$id,false);
        if($query){
            exit();    
        }else{
            header("HTTP/1.1 500 Internal Server Error");
            exit();
        }
    }
    if($verb == "delete"){
	    $c_id = $_POST['id'];
	    $query = executeQuery("UPDATE CIS_RUBRIC SET R_ISACTIVE = 0 WHERE R_ID =".$c_id,false);
	    if($query){
          exit();
        }else{
          header("HTTP/1.1 500 Internal Server Error");
          exit();
        }
    }
?>