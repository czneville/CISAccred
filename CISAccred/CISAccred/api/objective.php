<?php
	$sessionkey = $_POST['session_key'];
	$isActive = $_POST['isActive'];
	$verb = $_POST["verb"];

	include 'oracleQuery.php';
	include 'verifySessionKey.php';
	
	$session = verifySession($sessionkey);
	
	if(!$session)
	{
		header("HTTP/1.1 500 Internal Server Error");
		echo("Invalid Session Key! Login again please!");
		exit();
	};

	if ($verb == "active")
	{
	
	}
	
	if ($verb == "inactive")
	{
	
	}
	
	if ($verb == "add")
	{
	
	}

	if ($verb == "modify")
	{
	
	}

	if ($verb == "delete")
	{
	
	}

	if ($verb == "restore")
	{
	
	}
	

?>