<?php
session_start();
include("../pdoInc.php");

// include("../php/ending.php");

// 加入離開時間
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
        <title>end</title>
        <link rel="stylesheet" href="end.css">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" charset="UTF-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>
    <body>
        <div id="div-end">
            <section class="hide hack-display-1">
                <div class="vertical-align vertical-text-1">
                    <h1>東</h1>
                    <h1>方</h1>
                    <h1>哈</h1>
                </div>
                <div class="vertical-align vertical-text-2">
                    <h1>哈</h1>
                    <h1>樂</h1>
                    <h1>園</h1>
                </div>
            </section>

            <section class="hide hack-display-2">
                <div>
                    <div class="stretch-text stretch-text-1 glitch-text">hey,</div>
                    <div class="stretch-text stretch-text-2 glitch-text">you're</div>
                    <div class="stretch-text stretch-text-3 glitch-text">uploaded</div>
                </div>

                <div class="user-data">
                    <span><?php echo $_SESSION['username']?></span>
                    <br>
                    <span>
                        <?php
                            echo "<script>console.log('time diff',".$time_diff.")</script>";
                            $min = $time_diff / 60;
                            $min = floor($min);
                            $sec = $time_diff % 60;
                            echo $min."m ".$sec."s";
                        ?>
                    </span>
                </div>
            </section>

            <div class="hide countdown-text">
                File be uploaded in <span id="hack-countdown">10</span>
            </div>
        </div>
        <img id="hack-face" src="" width="100%" height="100%">
        <canvas id="canvas">
            
        </canvas>
        <script src="end.js"></script>
    </body>
</html>

<?php
session_destroy();
?>