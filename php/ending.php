<?php
session_start();
include("../pdoInc.php");

//加入離開時間
if(isset($_SESSION['username'])){
    $username = $_SESSION['username'];
    $sql = "UPDATE Game SET departure=now() WHERE username='$username'";
    $stmt= $dbh->prepare($sql);
        if($stmt->execute()){
        }
        unset($stmt);
}

//取得離開時間與加入時間
$sql = "SELECT arrival, departure FROM Game WHERE username='$username'";
$sth = $dbh->query($sql);
while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    $arrival = $row['arrival'];
    $departure = $row['departure'];

    $time_diff = strtotime($departure) - strtotime($arrival);
    echo $time_diff;
};
unset($sth);

//相減得到停留網站時間
$sql = "UPDATE Game SET stayTime=TIMESTAMPDIFF(SECOND, '$arrival', '$departure') WHERE username = '$username'";
$stmt= $dbh->prepare($sql);
    if($stmt->execute()){
    // echo "時間差";
    }
unset($stmt);
?>