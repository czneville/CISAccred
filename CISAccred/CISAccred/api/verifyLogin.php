<?php
	$username = $_POST['username'];
	$password = $_POST['password'];
  include 'oracleQuery.php';
	$query = executeQuery('select p_id from cis_professor where p_username=\''.$username.'\' AND p_password=\''.$password.'\'');
	$p_id = $query[0]['P_ID'];
  if(!isset($p_id)){
    echo("{}");
    exit;
  }
  $session_key = uniqid();
  $json_result["p_id"] = $p_id;
  $json_result["session_key"] = $session_key;
  executeQuery('INSERT INTO CIS_SESSION VALUES('.$p_id.', \''.$session_key.'\', TO_DATE(\''.(new DateTime())->format('Y-m-d H-i-s').'\', \'YYYY-MM-DD hh24:mi:ss\'))', false);
  echo(json_encode($json_result));
?>