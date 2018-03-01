<?php
	$username = $_POST['username'];
	$password = $_POST['password'];
	$db_conn = oci_connect("cisaccred","cisaccred", "//orion.calu.edu/orcl");
	if (!$db_conn) {
    echo('{}');
		exit;
	}
	$query = 'select p_id from cis_professor where p_username=\''.$username.'\' AND p_password=\''.$password.'\'';
	$stid = oci_parse($db_conn, $query);
	$r=oci_execute($stid);
	$p_id = oci_fetch_array($stid)["P_ID"];
  if(!isset($p_id)){
    echo("{}");
    exit;
  }
  $session_key = uniqid();
  $json_result["p_id"] = $p_id;
  $json_result["session_key"] = $session_key;
  
  
  $save_session_key = 'INSERT INTO CIS_SESSION VALUES('.$p_id.', \''.$session_key.'\', TO_DATE(\''.(new DateTime())->format('Y-m-d H-i-s').'\', \'YYYY-MM-DD hh24:mi:ss\'))';
  $store_session = oci_parse($db_conn, $save_session_key);
  $r=oci_execute($store_session);
  if(!$r){
    echo("{}");
    exit();
  }
  echo(json_encode($json_result));
	oci_close($db_conn);
?>