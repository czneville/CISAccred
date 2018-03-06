<?php
	include 'oracleQuery.php';
	$session_key = $_POST['session_key'];
	//clear old sessions first
	executeQuery("DELETE FROM CIS_SESSION c WHERE c.S_DATE <= TRUNC(SYSDATE)-1", false);
	$query = "SELECT p.P_ID, p.P_ISADMIN, p.P_NAME FROM CIS_PROFESSOR p, CIS_SESSION s WHERE p.P_ID = s.P_ID AND s.S_SESSION_KEY = '".$session_key."'";
	$query_result = executeQuery($query);
	if(!$query_result){
		echo("{}");
		exit();
	}
	$query_result=$query_result[0];
	$json_result["p_id"] = $query_result["P_ID"];
	$json_result["p_isadmin"] = $query_result["P_ISADMIN"];
	echo(json_encode($json_result));

?>