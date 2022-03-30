<?php
session_start();
include("../pdoInc.php");

if(isset($_SESSION["username"])){
    $username = $_SESSION["username"];
    $sql = "SELECT * from Game WHERE username = '$username'";
    $sth = $dbh->query($sql);
    while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    $amount = $row['amount'];
    $Q1 = $row['Q1'];
    $Q2 = $row['Q2'];
    $Q3 = $row['Q3'];
    $Q4 = $row['Q4'];
    $Q5 = $row['Q5'];
    $Q6 = $row['Q6'];
    $Q7 = $row['Q7'];
}};

switch($amount){ //array(bottom ad, left/right ad)
    case 0: 
        $ad =  "0";
        break;
    case 1:
        $ad = $Q1;
        break;
    case 2:
        $ad = $Q1.",".$Q2;
        break;
    case 3:
        $ad = $Q3;
        break;
    case 4:
        $ad = $Q4;
        break;
    case 5:
        $ad = $Q5;
        break;
    case 6:
        $ad = $Q6;
        break;
    case 7:
        $ad = $Q7;
        break;
}

// $ad = json_encode($ad);
echo $ad;

?>
