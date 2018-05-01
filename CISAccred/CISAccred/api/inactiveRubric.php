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

	if($verb == "get") 
	{

		if($isActive == "0")
		{
			$query = executeQuery("SELECT * FROM CIS_RUBRIC WHERE R_ISACTIVE = 0 ORDER BY R_ID ASC");
		}
		else
		{
			$query = executeQuery("SELECT * FROM CIS_RUBRIC ORDER BY R_ID ASC");
		}

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
?>