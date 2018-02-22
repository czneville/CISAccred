<?php
	$db_conn = oci_connect("cisaccred","cisaccred", "//orion.calu.edu/orcl");
	if (!$db_conn) {
		$m = oci_error();
		echo $m['message'], "\n";
		exit;
	}
	else {
		print "Connected to Oracle!";
	}
	$query = 'select table_name from user_tables';
	$stid = oci_parse($db_conn, $query);
	$r=oci_execute($stid);
	print("<table border=1>");
	while($row = oci_fetch_array($stid)){
		print("<tr>");
		foreach($row as $item){
			echo("<td>".$item."</td>");
		}
		print("</tr>");
	}
	print("</table>");
	oci_close($db_conn);
?>