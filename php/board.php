<?php
session_start();
include("../pdoInc.php");

$return_arr = array();
$sql = "SELECT * from Game ORDER BY score DESC LIMIT 3";
$sth = $dbh->query($sql);
while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    $row_array['username'] = $row['username'];
    $row_array['score'] = $row['score'];

    array_push($return_arr,$row_array);    
};
$return_arr = json_encode($return_arr); 
echo $return_arr;
unset($sth);



?>