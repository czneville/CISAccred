<?php
	include 'oracleQuery.php';
	include 'verifySessionKey.php';

	$p_id = $_POST['id'];
	$old = $_POST['old'];
	$new = $_POST['new'];
	$sessionkey = $_POST['session_key'];
	$session = verifySession($sessionkey);

	if(!$session)
	{
		header("HTTP/1.1 500 Internal Server Error");
		echo("Invalid Session Key! Login again please!");
		exit();
	};

	$query = executeQuery("UPDATE CIS_PROFESSOR SET P_PASSWORD ='".$new."' WHERE P_PASSWORD = '".$old."' AND P_ID =".$p_id,false);
	 
	if ($query)
	{
		exit();
	}
	else 
	{
		header("HTTP/1.1 500 Internal Server Error");
		exit();
	}

?>