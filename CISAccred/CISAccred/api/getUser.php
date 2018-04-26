<?php
    $sessionkey = $_POST['session_key'];
	
	include 'oracleQuery.php';
	include 'verifySessionKey.php';

	$session = verifySession($sessionkey);
	if(!$session)
	{
		header("HTTP/1.1 500 Internal Server Error");
		echo("Invalid Session Key! Login again please!");
		exit();
	};
	
	$query = executeQuery("SELECT * FROM CIS_PROFESSOR ORDER BY P_ID");
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
?>
