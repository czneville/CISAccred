<?php
	include 'oracleQuery.php';
	include 'verifySessionKey.php';
	$verb = $_POST["verb"];
	$sessionkey = $_POST['session_key'];
	$session = verifySession($sessionkey);
	if(!$session){
		header("HTTP/1.1 500 Internal Server Error");
		echo("Invalid Session Key! Login again please!");
		exit();
	};
  
	if($verb == "add"){
		$c_course_num = $_POST['courseNumber'];
		$c_title = $_POST['title'];
		$maxId = executeQuery("SELECT MAX(C_ID) FROM CIS_CLASS", true)[0]["MAX(C_ID)"];
		if(!isset($maxId)){$maxId=1000;}else{$maxId++;}
		$query = executeQuery("INSERT INTO CIS_CLASS VALUES(".$maxId.",".$c_course_num.", '".$c_title."', 1)",false);
		if($query){
		exit();
		}else{
		header("HTTP/1.1 500 Internal Server Error");
		exit();
		}
	}

	if($verb == "delete"){
		$c_id = $_POST['id'];
		$query = executeQuery("UPDATE CIS_CLASS SET C_ISACTIVE = 0 WHERE C_ID =".$c_id,false);
		if($query){
		exit();
		}else{
		header("HTTP/1.1 500 Internal Server Error");
		exit();
		}
	}
  
	if($verb == "modify"){
		$c_id = $_POST['id'];
		$c_course_num = $_POST['courseNumber'];
		$c_title = $_POST['title'];
		$query = executeQuery("UPDATE CIS_CLASS SET C_COURSE_NUM=".$c_course_num.", C_COURSE_TITLE='".$c_title."' WHERE C_ID=".$c_id,false);
		if($query){
		exit();
		}else{
		header("HTTP/1.1 500 Internal Server Error");
		exit();
		}
	}
?>


<?php
	$p_id = $_POST['p_id'];
	$p_fname = $_POST['p_fname'];
	$p_lname = $_POST['p_lname'];
	$p_username = $_POST['p_username'];
	$p_password = $_POST['p_password'];
	$p_isadmin = $_POST['p_isadmin'];

  $sessionkey = $_POST['session_key'];
	include 'oracleQuery.php';
  include 'verifySessionKey.php';
  $session = verifySession($sessionkey);
  if(!$session){
    header("HTTP/1.1 500 Internal Server Error");
    echo("Invalid Session Key! Login again please!");
    exit();
  };
	$query = executeQuery("INSERT INTO CIS_PROFESSOR VALUES(".$p_id.", '".$p_fname."', '".$p_lname."', '".$p_username"', '".$p_password"', ".$p_isadmin")",false);
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