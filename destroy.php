<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>æ±æ¹ååæ¨å</title>
    <link rel="icon" href="" sizes="16x16">
    <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="assets/webcam.min.js"></script>
        <!-- <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"> -->
</head>    

<body class="hack_page" style="background-color: black;">
    <div id="hacked-bg">
        <div id="my_camera"></div>
        <img id="hack-face" src="">
    <div>
           
    <div style="z-index: 11;" class="flex-vertical">
        <p class="leaderboard-cyan"><?php echo $_SESSION['username']?></p>
        <p class="leaderboard-margenta">Duration of playing games</p>
        <p class="leaderboard-green">File be uploaded in <span id="hack-countdown">10</span></p>
        <!-- <button id="gohack">Fire</button> -->
    </div>
    
        
    <script type="text/javascript" src="end.js"></script>
</body>
</html>
<?php
session_destroy();
echo '<meta http-equiv=REFRESH CONTENT=0;url=main.php>';
echo '<script>localStorage.clear();</script>'
?>
