<?php
session_start();
include("../pdoInc.php");

if(isset($_SESSION["username"])){
    $username = $_SESSION["username"];
    $sql = "SELECT * from Game WHERE username = '$username'";
    $sth = $dbh->query($sql);
    while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    $amount = $row['amount'];
    $test1 = $row['test1'];
    $test2 = $row['test2'];
}};


echo "答題數：".$amount;

switch($amount){
    case 0: 
        $score = 0;
        break;
    case 1:
        $score = rand(3, 5);
        break;
    case 2:
        $score = rand(5, 10);
        break;
    case 3:
        $score = rand(15, 25);
        break;
    case 4:
        $score =rand(30, 45);
        break;
    case 5:
        $score = rand(50, 70);
        break;
    case 6:
        $score = rand(100,150);
        break;
    case 7:
        $score = rand(200, 300);
        break;
}


if($test1 == true){
    $score += 20;
}
if($test2 == true){
    $score +=10;
}
if($test1 && $test2 == true){
    $score += 20;
}

echo "得分：". $score;

$sql = "UPDATE Game SET score = '$score'
WHERE username='$username'";
$stmt= $dbh->prepare($sql);
$stmt->bindParam(":score", $score);
if($stmt->execute()){
    echo"成功加入分數";
}else{
    echo"nooooo";
}
unset($stmt);


?>