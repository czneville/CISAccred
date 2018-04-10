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
	  $outcome_name = $_POST['outcome_name'];
	  $outcome_desc = $_POST['outcome_desc'];
    $maxId = executeQuery("SELECT MAX(OUT_ID) FROM CIS_OUTCOME", true)[0]["MAX(OUT_ID)"];
	  if(!isset($maxId)){$maxId=1000;}else{$maxId++;}
	  $query = executeQuery("INSERT INTO CIS_OUTCOME VALUES(".$maxId.",'".$outcome_name."', '".$outcome_desc."', 1)",false);
	  if($query){
      exit();
    }else{
      header("HTTP/1.1 500 Internal Server Error");
      exit();
    }
  }
  
  if($verb == "delete"){
	  $c_id = $_POST['id'];
	  $query = executeQuery("UPDATE CIS_OUTCOME SET OUT_ISACTIVE = 0 WHERE OUT_ID =".$c_id,false);
	  if($query){
      exit();
    }else{
      header("HTTP/1.1 500 Internal Server Error");
      exit();
    }
  }
  
  if($verb == "modify"){
    $out_id = $_POST['id'];
	  $outcome_name = $_POST['outcome_name'];
	  $outcome_desc = $_POST['outcome_desc'];
	  $query = executeQuery("UPDATE CIS_OUTCOME SET OUT_NAME='".$outcome_name."', OUT_DESC='".$outcome_desc."' WHERE OUT_ID=".$out_id,false);
	  if($query){
      exit();
    }else{
      header("HTTP/1.1 500 Internal Server Error");
      exit();
    }
  }
?>