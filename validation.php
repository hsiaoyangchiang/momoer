<?php
session_start();
include("pdoInc.php");

if (!isset($_POST['username'])) {
    exit;
}

$username = $_POST['username'];

$sql = "SELECT username from Game WHERE username = '$username'";
$sth = $dbh->query($sql);
if($row = $sth->fetch(PDO::FETCH_ASSOC)){
        echo "1";
        echo $row['username'];
}else{
    echo "no record";
}

// 1:重複
// 0:未重複


?>