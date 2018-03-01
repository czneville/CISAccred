<!DOCTYPE html>

<script src="scripts/angular.js"></script>
<script src="scripts/angular-route.min.js"></script>
<script src="scripts/routing-scripts.js"></script>


<link href="css/cissacred.css" rel="stylesheet" />

<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body ng-app="">

    <form id="login">
        Username: <input type="text" ng-model="firstname">
        Password: <input type="password" ng-model="password">
    </form>
    <h1>You entered: {{firstname}} and {{password}}</h1>

</body>
</html>

<?php
	$username = $_GET['username'];
	$password = $_GET['password'];
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
  
  /*
  
  TODO: ADD SESSION KEY TO DB
  
  */

  echo(json_encode($json_result));
	oci_close($db_conn);
?>
