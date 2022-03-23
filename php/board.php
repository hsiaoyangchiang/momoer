<?php
session_start();
include("../pdoInc.php");

$sql = "SELECT * from Game ORDER BY score DESC LIMIT 3";
$sth = $dbh->query($sql);
while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    $arr = array($row['username'], $row['score']);
    $arr = json_encode($arr);
    echo $arr;
};






?>