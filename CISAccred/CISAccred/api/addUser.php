<?php
	$p_id = $_POST['p_id'];
	$p_fname = $_POST['p_fname'];
	$p_lname = $_POST['p_lname'];
	$p_username = $_POST['p_username'];
	$p_password = $_POST['p_password'];
	$p_isadmin = $_POST['p_isadmin'];

  $sessionkey = $_POST['session_key'];
	include 'oracleQuery.php';
  include 'verifySessionKey.php';
  $session = verifySession($sessionkey);
  if(!$session){
    header("HTTP/1.1 500 Internal Server Error");
    echo("Invalid Session Key! Login again please!");
    exit();
  };
	$query = executeQuery("INSERT INTO CIS_PROFESSOR VALUES(".$p_id.", '".$p_fname."', '".$p_lname."', '".$p_username"', '".$p_password"', ".$p_isadmin")",false);
	/*
	* If query was select query, $query contains array of results.
	* Else query is true / false if successful.
	* If false, sends out 500 header.
	*/
	
	if($query){
    exit();
  }else{
    header("HTTP/1.1 500 Internal Server Error");
    exit();
  }
?>