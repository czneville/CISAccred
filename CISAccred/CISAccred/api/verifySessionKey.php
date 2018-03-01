<?php
	include 'oracleQuery.php';
	var_dump(executeQuery("SELECT * FROM user_tables WHERE table_name='furby'"));
?>