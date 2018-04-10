<?php
    $sessionkey = $_POST['session_key'];
	$isActive = $_POST['isActive'];
	include 'oracleQuery.php';
	include 'verifySessionKey.php';
	$session = verifySession($sessionkey);
	if(!$session){
		header("HTTP/1.1 500 Internal Server Error");
		echo("Invalid Session Key! Login again please!");
		exit();
	};
	if($isActive == "1"){
	$query = executeQuery("SELECT * FROM CIS_OUTCOME WHERE OUT_ISACTIVE = 1");
	}else{
	$query = executeQuery("SELECT * FROM CIS_OUTCOME");
	}
	if($query){
		echo(json_encode($query));
		exit();
	}else{
		echo("{}");
		exit();
	}
?>