﻿<?php
	include 'oracleQuery.php';
	include 'verifySessionKey.php';
	$verb = $_POST["verb"];
	$sessionkey = $_POST['session_key'];
	$session = verifySession($sessionkey);
	if(!$session)
	{
	    header("HTTP/1.1 500 Internal Server Error");
	    echo("Invalid Session Key! Login again please!");
	    exit();
	};
  
	if($verb == "add")
	{
		$eval_name = $_POST['name'];

		$maxId = executeQuery("SELECT MAX(EVAL_ID) FROM CIS_EVALUATOR", true)[0]["MAX(EVAL_ID)"];
		if(!isset($maxId))
		{
		$maxId=1000;
		}
		else
		{
		$maxId++;
		}
		
		$query = executeQuery("INSERT INTO CIS_EVALUATOR VALUES(".$maxId.", '".$eval_name."', 1)", false);
		
		if($query)
		{
			exit();
		}
		else
		{
			header("HTTP/1.1 500 Internal Server Error");
			exit();
		}
	}

	if($verb == "modify")
	{
		$eval_id = $_POST['id'];
		$eval_name = $_POST['name'];
		
		$query = executeQuery("UPDATE CIS_EVALUATOR SET EVAL_NAME='".$eval_name."' WHERE EVAL_ID=".$eval_id,false);
						
		if($query)
		{
			exit();
		}
		else
		{
			header("HTTP/1.1 500 Internal Server Error");
			exit();
		}
	}

	if($verb == "delete")
	{
		$eval_id = $_POST['id'];
		
		$query = executeQuery("UPDATE CIS_EVALUATOR SET EVAL_ISACTIVE = 0 WHERE EVAL_ID = ".$eval_id,false);

		if($query)
		{
			exit();
		}
		else
		{
			header("HTTP/1.1 500 Internal Server Error");
			exit();
		}
	}
?>