<?php
session_start();
include("pdoInc.php");

// if (!isset($_POST['username'])) {
//     exit;
// }

$username = "panpan";
// $_POST['username'];

$sql = "SELECT username from Game WHERE username = '$username'";
$sth = $dbh->query($sql);
if($row = $sth->fetch(PDO::FETCH_ASSOC)){
        echo "used before";
        echo $row['username'];
}else{
    echo "no record";
}




?>