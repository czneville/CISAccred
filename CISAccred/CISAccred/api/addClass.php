﻿<?php
	$c_semester = $_POST['semester'];
	$c_course_num = $_POST['courseNumber'];
	$c_section = $_POST['section'];
	include 'oracleQuery.php';
	$query = executeQuery("INSERT INTO CIS_CLASS VALUES('".$c_semester."', ".$c_course_num.", ".$c_section.")",false);
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