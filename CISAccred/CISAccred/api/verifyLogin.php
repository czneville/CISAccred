<?php
	$username = $_POST['username'];
	$password = $_POST['password'];
  include 'oracleQuery.php';
	$query = executeQuery('select p_id, p_fname, p_lname, p_isadmin from cis_professor where p_username=\''.$username.'\' AND p_password=\''.$password.'\'');
  if(!isset($query[0])){
    header("HTTP/1.1 401 Unauthorized");
    //echo("{}");
    exit;
  }
  $p_id = $query[0]['P_ID'];
  $p_name = $query[0]["P_FNAME"]." ";
  $p_name = $p_name . $query[0]["P_LNAME"];
  $p_isadmin = $query[0]["P_ISADMIN"];
  $session_key = md5(random_bytes(25));
  $json_result["p_id"] = $p_id;
  $json_result["session_key"] = $session_key;
  $json_result["p_name"] = $p_name;
  $json_result["p_isadmin"] = $p_isadmin;
  executeQuery("INSERT INTO CIS_SESSION VALUES(".$p_id.", '".$session_key."', TO_DATE('".(new DateTime())->format('Y-m-d H-i-s')."', 'YYYY-MM-DD hh24:mi:ss'))", false);
  echo(json_encode($json_result));
?>