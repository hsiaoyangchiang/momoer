<?php
session_start();
include("pdoInc.php");

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

<!DOCTYPE html>
<html>
<head>
    <title>東方哈哈學院</title>
    <link rel="icon" href="" sizes="16x16">
    <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="assets/webcam.min.js"></script>
        <!-- <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"> -->
</head>    

<body class="hack_page" style="background-color: black;">
    <div id="hacked-bg">
        <div id="my-camera"></div>
        <img id="hack-face" src="" width="100%" height="100%">
    </div>
           
    <div id="hack-info" class="flex-vertical">
        <p class="leaderboard-cyan"><?php echo $_SESSION['username']?></p>
        <p class="leaderboard-margenta">
            <?php
                $min = $time_diff / 60;
                $sec = $time_diff % 60;
                echo $min."分".$sec."秒";
            ?>
        </p>
        <p class="leaderboard-green">File be uploaded in <span id="hack-countdown">10</span></p>
        <br>
        <button id="gohack" onclick="hack()">Fire</button>
    </div>
    
    
        
    <script type="text/javascript" src="end.js"></script>
</body>
</html>

<?php
session_destroy();
?>