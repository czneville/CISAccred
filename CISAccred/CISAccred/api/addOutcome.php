<?php
	$out_name = $_POST['out_name'];
	$out_desc = $_POST['out_desc'];
	$sessionkey = $_POST['session_key'];
	include 'oracleQuery.php';
	include 'verifySessionKey.php';
	$session = verifySession($sessionkey);
	if(!$session){
		header("HTTP/1.1 500 Internal Server Error");
		echo("Invalid Session Key! Login again please!");
		exit();
	};
	$maxId = executeQuery("SELECT MAX(OUT_ID) FROM CIS_OUTCOME", true)[0]["MAX(OUT_ID)"];
	if(!isset($maxId)){$maxId=1000;}else{$maxId++;}
	$query = executeQuery("INSERT INTO CIS_OUTCOME VALUES(".$maxId.", '".$out_name."', '".$out_desc."')",false);
	if($query){
		exit();
	}else{
		header("HTTP/1.1 500 Internal Server Error");
		exit();
    }
?>
