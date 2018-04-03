<?php
	$c_semester = $)POST['c_semester'];
	$c_course_num = $)POST['c_course_num'];
	$c_section = $)POST['c_section'];
	include 'oracleQuery.php'
	$query = executeQuery('insert into c_class values ('.$c_semester.', .$c_course_num., .$c_section.) ');
	if(!isset($query[0]))
	{
		echo("{}");
		exit;
	}
?>
