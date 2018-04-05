<?php
	$c_semester = $_POST['semester'];
	$c_course_num = $_POST['courseNumber'];
	$c_section = $_POST['section'];
	include 'oracleQuery.php';
	$query = executeQuery("INSERT INTO CIS_CLASS VALUES('".$c_semester."', ".$c_course_num.", ".$c_section.")",false);
	if($query){
    exit();
  }else{
    header("HTTP/1.1 500 Internal Server Error");
    exit();
  }
?>
