<?php
  function executeQuery($query, $isFetch=true){
      $DB_HANDLE = oci_connect("CISAccred","CISAccred","//orion.calu.edu/orcl");
      if(!$DB_HANDLE){
        return false;
      }
      $query_handle = oci_parse($DB_HANDLE, $query);
      $valid = oci_execute($query_handle);
      if((!$valid) || !($isFetch)){
        oci_close($DB_HANDLE);
        return $valid;
      }
      $result = array();
      $i =0;
      while($row=oci_fetch_array($query_handle)){
        $result[$i] = $row;
        $i++;
      }
      oci_close($DB_HANDLE);
      return $result;
  }
?>