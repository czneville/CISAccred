<?php
	$p_id = $_POST['id'];
	$p_fname = $_POST['firstName'];
	$p_lname = $_POST['lastName'];
	$p_username = $_POST['username'];
	$p_password = $_POST['password'];
	$p_isadmin = $_POST['isAdmin'];
	include 'oracleQuery.php';
	$query = executeQuery("INSERT INTO CIS_PROFESSOR VALUES('".$p_id."', ".$p_fname.", ".$p_lname.",".$p_username.", ".$p_password.",".$p_isadmin.")",false);
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