<?php
session_start();
require_once"pdoInc.php";
error_reporting(E_ALL & ~E_NOTICE);

if($_SESSION['askQuestion'] == 0) {
    // echo "<script>alert('ask Question = 0')</script>";
    echo "<script>var askQuestion = 0</script>";
    $_SESSION['askQuestion'] = 1;
}else {
    // echo "要顯示問題";
    echo "<script>var askQuestion = 1</script>";
}


?>
<!DOCTYPE html>
<html>
    <head>
        <title>小遊戲區</title>
        <link rel="icon" href="" sizes="16x16">
        <link rel="stylesheet" href="style.css">
        <meta charset="UTF-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <!-- <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"> -->
    </head>

    <body>
        <div class="leaderboard noselect cursor-default">
            <marquee>
                <span class="leaderboard-cyan">歡迎來到東方哈哈樂園 &#10024; &nbsp;&nbsp;</span>
                <span class="leaderboard-margenta">&#128081; 王小明 600 &#9733; 王宏宏 450 &#9733; 楊明王 400 &#9733; 阿翔 350 &#9733; 小羊 200 &nbsp;&nbsp;</span>
                <span class="leaderboard-green">全台數位內容首府 來電詢問2939-3091</span>
            </marquee>
            <div id="btn-signup">
            <button><a href="signup.html">signup</button>
            <button><a href="login.html">login</button>
            </div>
        </div>

        <div class="header-game">
            <a href="main.php"><img src="assets/img-logo.png" class="img-logo-small cursor-pointer"></a>
        </div>

        <!-- <div id="backend-panel"> 模擬後端操作面板
            <h4 style="margin-bottom: 4px;">後端模擬面板</h4>
            <label for="game-session">Game Session:</label>
            <label><span id="current-game-session"></span></label>
            <select id="game-session" name="game-session">
                <option value="0">0</option>
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            <br>
            <label for="game-id">Game ID:</label>
            <select id="game-id" name="game-id">
                <option value="1">1號遊戲</option>
                <option value="2">2號遊戲</option>
                <option value="3">3號遊戲</option>
                <option value="4">4號遊戲</option>
                <option value="5">5號遊戲</option>
                <option value="6">6號遊戲</option>
                <option value="7">7號遊戲</option>
                <option value="8">8號遊戲</option>
                <option value="9">9號遊戲</option>
                <option value="10">心理測驗1</option>
                <option value="11">心理測驗2</option>
                <option value="12">flash不支援</option>
            </select>
            <br>
            <button id="sim-run" style="margin-top: 8px;">Run</button>
            <h5 style="font-weight: 400;">Press b to call/hide this panel<h5>
        </div> -->

        <div class="modal-question">
            <h3>&#9734;回答選項進入遊戲&#9734;</h3>
            <form method="post" id="form-question">
                <label id="question">冬天最適合吃鍋~ 你最喜歡的火鍋湯底是?</label>
                <br>
                <div class="question-radio">
                    <!-- 可以做成點擊選項直接提交 -->
                    <input type="radio" id="option-1" class="option" name="option" value="a">
                    <label id="option-1" for="option">昆布高湯鍋</label><br>
                    <input type="radio" id="option-2" class="option" name="option" value="b">
                    <label id="option-2" for="option">牛奶起司鍋</label><br>
                    <input type="radio" id="option-3" class="option" name="option" value="c">
                    <label id="option-3" for="option">麻辣鴛鴦鍋</label><br>
                </div>
                <div class="question-saq">
                    <input type="text" name="7" value="">
                </div>
                <!-- <button class="btn-medium" type="submit" id="end_my_data">開始遊戲</button> -->
                <input type="submit" id="send_my_data" class="btn-medium" value="開始遊戲">
                <!-- <button type="button" id="sim-change">Simulate Ad Change</button> 模擬submit，換廣告的效果 -->
            </form>
        </div>

        <div class="modal-endgame">
            <h2>WELLDONE ! ! !</h2>
            <p>EXP +500</p>
            <p>進化: 第二形態</p>
            <p>玩家升級: 小學徒</p>
            <br>
            <div class="flex-horizontal">
                <button id="replay" class="btn-medium" onclick="replay()" style="margin-right: 32px;">再玩一次</button>
                <button id="backtoMain" class="btn-medium" onclick="backtoMain()">回首頁</button>
            </div>
        </div>

        <div class="game-area">
            <div class="ad-vertical cursor-pointer">
                <img id="ad-left" class="img-ad" src="assets/ads/simulate-ad-change/ad-left.png">
            </div>
            
            <div class="game-frame">
                <iframe src="">
                </iframe>
            </div>
            <div class="ad-vertical cursor-pointer">
                <img id="ad-right" class="img-ad" src="assets/ads/simulate-ad-change/ad-right.png">
            </div>
        </div>

        <div class="ad-horizontal cursor-pointer">
            <img id="ad-bottom" class="img-ad" src="assets/ads/simulate-ad-change/ad-bottom.png">
        </div>
        <div id="overlay"></div>

        <script src="ad.js"></script>
        <script src="game.js"></script>

    </body>
</html>