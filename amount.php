<?php
session_start();
include("pdoInc.php");

if(isset($_SESSION["username"])){
    $username = $_SESSION["username"];
    $sql = "SELECT * from Game WHERE username = '$username'";
    $sth = $dbh->query($sql);
    while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    echo $row['amount'];
}};
?>