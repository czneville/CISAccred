<?php
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
		$p_id = $_POST['id'];
		$p_fname = $_POST['fname'];
		$p_lname = $_POST['lname'];
		$p_username = $_POST['username'];
		$p_password = $_POST['password'];
		$p_isadmin = $_POST['isadmin'];

		$query = executeQuery("INSERT INTO CIS_PROFESSOR VALUES(".$p_id.", '".$p_fname."', '".$p_lname."', '".$p_username."', '".$p_password."', ".$p_isadmin.", 1)", false);
		
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
		$p_id = $_POST['id'];
		$p_fname = $_POST['fname'];
		$p_lname = $_POST['lname'];
		$p_username = $_POST['username'];
		$p_password = $_POST['password'];
		$p_isadmin = $_POST['isadmin'];
		
		$query = executeQuery("UPDATE CIS_PROFESSOR SET P_FNAME='".$p_fname."', P_LNAME='".$p_lname."', P_USERNAME='".$p_username."', P_PASSWORD='".$p_password."', P_ISADMIN=".$p_isadmin." WHERE P_ID=".$p_id,false);
						
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
		$p_id = $_POST['id'];
		
		$query = executeQuery("UPDATE CIS_PROFESSOR SET P_ISACTIVE = 0 WHERE P_ID = ".$p_id,false);

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