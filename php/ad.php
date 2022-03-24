<?php
session_start();
include("../pdoInc.php");

if(isset($_SESSION["username"])){
    $username = $_SESSION["username"];
    $sql = "SELECT * from Game WHERE username = '$username'";
    $sth = $dbh->query($sql);
    while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    $amount = $row['amount'];
}};

switch($amount){
    case 0: 
        $ad =  array(0,0);
        break;
    case 1:
        $ad = array(1,0);
        break;
    case 2:
        $ad = array(1,2);
        break;
    case 3:
        $ad = array(3,3);
        break;
    case 4:
        $ad = array(4,4);
        break;
    case 5:
        $ad = array(5,5);
        break;
    case 6:
        $ad = array(6,6);
        break;
    case 7:
        $ad = array(7,7);
        break;
}

$ad = json_encode($ad);
echo $ad;

?>
