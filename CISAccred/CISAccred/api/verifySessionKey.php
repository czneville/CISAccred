<?php

  function verifySession($key){
	  //clear old sessions first
	  executeQuery("DELETE FROM CIS_SESSION c WHERE c.S_DATE <= TRUNC(SYSDATE)-1", false);
	  $query = "SELECT p.P_ID, p.P_ISADMIN FROM CIS_PROFESSOR p, CIS_SESSION s WHERE p.P_ID = s.P_ID AND s.S_SESSION_KEY = '".$key."'";
	  $query_result = executeQuery($query);
	  if(!$query_result){
      return(false);
	  }
	  $query_result=$query_result[0];
	  $result["p_id"] = $query_result["P_ID"];
	  $result["p_isadmin"] = $query_result["P_ISADMIN"];
	  return($result);
  };
?>