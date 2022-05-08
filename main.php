<?php
    session_start();
    $game_id = "";
    include("pdoInc.php");

    if(isset($_SESSION["username"])){
        $username = $_SESSION["username"];
        $sql = "SELECT * from Game WHERE username = '$username'";
        $sth = $dbh->query($sql);
        while($row = $sth->fetch(PDO::FETCH_ASSOC)){
        $amount = $row['amount'];
        $test1 = $row['test1'];
        $test2 = $row['test2'];
          
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
    $sql = "UPDATE Game SET score = '$score'
    WHERE username='$username'";
    $stmt= $dbh->prepare($sql);
    if($stmt->execute()){
        // echo $score;
    }else{
        // echo"nooooo";
    }
    unset($stmt);
    }};
?>

<!DOCTYPE html>
<html>
    <head>
        <title>東方哈哈樂園</title>
        <link rel="icon" href="" sizes="16x16">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" charset="UTF-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="./assets/webcam.min.js"></script>
    </head>
    
    <body>
        <div class="leaderboard noselect cursor-default">
            <marquee>
                <span class="leaderboard-cyan">歡迎來到東方哈哈樂園 &#10024; &nbsp;&nbsp;</span>
                <span class="leaderboard-margenta">&#128081; 排行榜: <span id="rankings">王小明 600 &#9733; 王宏宏 450 &#9733; 楊明王 400 &#9733; 阿翔 350 &#9733; 小羊 200</span></span>
                <span class="leaderboard-green">&nbsp;&nbsp;全台數位內容首府 來電詢問2939-3091 #6227<span id="end">4</span></span>
            </marquee>
            <div>
                <button class="logout">登出</button>
            </div>
        </div>
        <div id="my-camera" style="display: none"></div>

        <div class="header">
            <img src="assets/img-logo.png" class="img-logo cursor-pointer">

            <!-- <div class="profile-blur"></div> -->
            <div class="profile">
                <img class="img-cat" src="assets/meow/cat-1.png">
                <div class="user-stats">
                    <p id="profile-username" class="green">Username</p>
                    <p class="green">EXP.<span class="exp-num">0</span> (<span class="player-title">摩天輪玩家</span>)</p>
                    <div class="exp-bar">
                        <div class="exp"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal-signup">
            <form class="form-signup" name="registerForm" method="post" action="signup.php">
                <h1>註 冊</h1>
                <div class="flex-horizontal">
                    <label class="label-signup" for="username">暱稱</label>
                    <!-- <label id="checkUsername"></label> -->
                    <input class="input-signup" type="text" id="username" name="username" placeholder="中文英文都可以歐"></input>
                </div>
                <br>
                <div class="flex-horizontal">
                    <label class="label-signup" for="password">密碼</label>
                    <input class="input-signup" type="password" id="password" name="password" placeholder="至少3個字元 英數都可歐"></input>
                </div>
                <br>
                <label class="label-signup" for="agree_toc">
                    <input class="checkbox-signup" type="checkbox" id="agree_toc" name="agree_toc"></input>
                    <img class="img-checkbox" src="assets/icon/img-checkbox-unchecked.png">
                    <span class="checkmark">我同意</span><span class="toc-link">使用條款</span>
                </label>
                <input type="text" name="first_game_id" style="display: none;"></input>
                <br>
                <button class="btn-large" type="submit" id="btn-signup" onclick="storeImg()">進入遊戲</button>
            </form>

            <div class="div-toc">
                <div class="flex-vertical">
                <h3>&#9734; 使 用 條 款 &#9734;</h3>
                <pre class="textarea-toc">
本服務條款（以下簡稱「本條款」）是就東方哈哈樂園（以下稱「本樂園」）以數位內容第十三屆畢業製作展名義所提供遊戲服務（以下簡稱「本服務」）的使用條件，由使用本服務之台灣用戶（依本樂園所定方式註冊之會員，以下簡稱「用戶」）與本樂園間訂定的條款。

<span>1. 定義</span>

本條款使用下列各項用語：

1.1. 「帳號」係指本樂園於用戶開始使用本服務時所發行之用以辨識用戶的文字列或其他標識。其中，本樂園基於用戶申請所設定的標識符稱為「用戶ID」。

1.2. 「遊戲內積分」係指可於遊戲後兌換本服務中有償提供之虛擬稱號。

1.3. 「個別使用條款」係指與本服務有關而有別於本條款，以「條款」、「準則」、「政策」等名稱由本樂園所分發或公布的書面，其中包含本樂園所擬定之遊戲管理規則。「遊戲管理規則」係指本樂園於遊戲內容資訊或常見問答中所公告或上傳對於限制或禁止使用遊戲之相關準則。

1.4. 「內容」係指文字、語音、音樂、圖片、影片、軟體、程式、代碼及其他資訊等內容。

1.5. 「本內容」係指可透過本服務連結的內容。

1.6. 「投稿內容」係指用戶回答問題、傳送、上傳至本服務的內容。

1.7. 「有償服務」係指於本服務中有償提供給用戶（包括兌換以有償方式提供的遊戲內貨幣）的服務或內容。

<span>2. 對於本條款的同意表示</span>

2.1. 用戶應遵照本條款規定使用本服務。用戶須有效且不可撤銷地同意本條款，方能使用本服務。以下內容視為本條款之一部分，與本條款具有相同之效力：一、由本樂園所為有關本服務之廣告或宣傳內容。二、計費制遊戲之收費計算方式及個別使用條款。

2.2. 如用戶為限制行為能力人，應須經過用戶之法定代理人同意，方能使用本服務。如用戶為無行為能力人，應由用戶之法定代理人代為同意，方能使用本服務。此外，如用戶為業者使用本服務時，亦請於該業者同意本條款後，再使用本服務。另外，若用戶為限制行為能力人或無行為能力人，除應符合前段之規定外，並應於用戶之法定代理人閱讀、瞭解並有效且不可撤銷地同意本條款之所有內容後，方得使用本服務，本條款之內容變更時亦同。

2.3若限制行為能力人未經其法定代理人同意或無行為能力人未由法定代理人代為付費購買遊戲內貨幣時，該法定代理人得依本樂園官方網站或本服務常見問答所公告之流程，備妥證明文件並提出申請退費。本樂園經確認後，退還用戶未使用之遊戲內貨幣費用。

2.4. 本服務一經用戶實際使用，將視為用戶已有效且不可撤銷地同意本條款。

2.5. 本服務有個別使用條款時，除本條款外，用戶亦應遵照個別使用條款規定使用本服務。

2.6. 本條款如有疑義時，應為有利於用戶之解釋。

<span>3. 本條款之變更</span>

除計費方式之變更依第6.5條之規定外，本樂園修改本條款或個別使用條款時，應於本遊戲官網首頁、遊戲登入頁面或購買頁面公告之，並依用戶登錄之通訊資料通知用戶。本樂園未依前項進行公告及通知者，本條款或個別使用條款之變更無效。用戶於前段通知到達後十五日內，如：一、用戶未為反對之表示者，本樂園依本條款或個別使用條款變更後之內容繼續提供本服務。二、用戶為反對之表示者，依用戶終止本條款之方式處理。

<span>4. 帳號密碼之使用</span>

4.1.用戶得自主回答問題並生成用戶ID，才可取得本服務之遊玩權限。

4.2.本服務的帳號，專屬於用戶個人。用戶於本服務的所有使用權，均不得轉讓、出借予第三人或使第三人繼承。

4.3. 符合前項規定時，用戶所生成的ID不會因玩家的意志而由所存滅。

4.4. 自帳號刪除時起，本樂園將依舊保有用戶資訊的所有使用權，不論任何理由均不為消滅。

4.5. 帳號密碼之使用

4.6.本服務的帳號，專屬於用戶個人。用戶於本服務的所有使用權，均不得轉讓、出借予第三人或使第三人繼承。

4.7. 帳號密碼若遭非法使用，本樂園不負通知與處理之責。

<span>5. 隱私權</span>

5.1. 本服務相關之個人資料由東方哈哈樂園管理。

5.2. 本樂園將使用用戶的隱私資訊作為廣告投放分析用途。

5.3. 本樂園依照東方哈哈樂園資訊使用協定及相關法律，妥善處理及保護用戶的隱私資料與個人資料。

5.4. 本樂園將會以佛系的方式管理自用戶處蒐集的資料，並對安全管理採取寬鬆的措施。

5.5. 本樂員將會擷取用戶之頭像做為加強遊戲體驗用途。

<span>6. 服務的提供</span>

6.1. 此服務的僅於05/10~05/14提供給第13th數位內容與科技學士學程畢業製作做遊戲營運使用。

6.2. 本樂園得按年齡、用戶有無完成身份確認作業、用戶有無註冊資料及其他本樂園判斷為必要的條件，將本服務的全部或部分提供給符合上揭條件的用戶。

6.3. 本樂園判斷有必要時，得在不事先通知用戶的情形下隨時變更本遊戲服務的全部或部分內容。

6.4. 關於有償服務部分，將無法因用戶取消而退款、退還遊戲內貨幣，或其他償還。但法令規定有必要者，則不在此限。

6.5. 計費方式：

6.5.本服務之收費計算方式為：遊戲本體免費遊玩，用戶所提供之資訊即為獲利來源。

6.6.本樂園應於本樂園遊戲首頁、遊戲登入頁面或問題頁面上載明以下事項：

一、不依遊戲軟體分級管理辦法規定標示遊戲分級級別及禁止或適合使用之年齡層。

二、進行本服務之最低軟硬體需求為連線功能的筆記型電腦。

三、有提供安全裝置者，其免費或付費資訊。

<span>7. 無緊急通報功能</span>

本服務並未搭載能向警察機關、海岸巡防機關、消防機關或其他機關等發出緊急通報的功能。

<span>8. 廣告刊登</span>

本樂園得根據用戶提供資訊，在遊戲伺服器中刊登來自本樂園或第三人的客製化廣告。

<span>9. 業務合作夥伴服務</span>

本服務內可能包含其他與本樂園有業務合作的業者所提供的服務或內容。該等服務或內容所應負責任，概由提供服務或內容的業者負擔。此外，提供服務或內容的業者所規定的使用條款及其他條件，可能適用於該等服務或內容。

<span>10. 內容</span>

10.1. 本樂園所提供的本內容授予用戶使用權，此使用權不得轉讓及再授權，且具有非獨占性，並僅限於使用本服務。

10.2. 如用戶使用的本內容另有規定使用費、使用期間等使用條件時，即應遵照該等使用條件。即使本服務介面上有顯示「購買」、「販賣」等文字，本樂園對客戶提供的本內容相關智慧財產權及其他權利亦不因此移轉給用戶，對用戶僅有授予上述第10.1項的使用權。

10.3. 用戶不得超出本服務所訂定的使用樣態而使用(包括重製、傳送、轉載、更動等行為)本內容。

10.4. 請用戶自行儲存投稿內容的備份。本樂園並無義務儲存投稿內容的備份。

10.5. 本服務可能具備多數用戶可進行投稿、修改、刪除等編輯的功能。於此情形下，用戶同意其他用戶可編輯該用戶自行投稿的內容。

10.6. 用戶對投稿內容所應有的權利照常維持不變，本樂園並未取得相關權利。但投稿內容屬於對其他不在好友名單內的用戶亦會公開的內容，用戶以無償、無限期、不限地點的方式，授權本樂園將該投稿內容用於服務或促銷活動的權利（包括於認有必要且適當的範圍內，本樂園得加以省略等變更的權利。另包括本樂園將相關使用權再授權給與本樂園有業務合作的第三人的權利）。

10.7. 本樂園需確認有無違反法令或本條款規定等情形時，得對投稿內容的內涵進行確認。但此不代表本樂園有義務進行該等確認。

10.8. 本樂園認為用戶投稿內容違反相關法令或本條款規定或有違反之虞時，或有其他業務上需求時，得在不事先通知用戶的情形下，以刪除投稿內容等方式限制本服務中投稿內容的使用。

<span>11. 連線品質</span>

11.1. 本樂園已額外花費預算添購預付卡以維持本服務相關系統之連線品質。但若還是發生連線不穩情形，此實屬不可歸責於本樂園之事由，敬請海涵。

<span>12. 本樂園及用戶責任</span>

12.1.本樂園應依本條款之規定負有於提供本服務時，維護其自身電腦系統，符合當時科技或專業水準可合理期待之安全性。

12.2.電腦系統或電磁紀錄受到破壞，或電腦系統運作異常時，本樂園應於採取合理之措施後儘速予以回復。

12.3.本樂園違反前二項規定或因遊戲程式漏洞致生用戶損害時，應依用戶受損害情形，負損害賠償責任。但本樂園能證明其無過失者，得減輕其賠償責任。

12.4.用戶因共用帳號、委託他人付費購買遊戲內貨幣衍生與第三人間之糾紛，本樂園得不予協助處理。

<span>13. 本條款之解除與終止</span>

本樂園將於5/14展覽結束時停止服務，屆時所蒐集之用戶隱私資訊皆會自動清除。

<span>14. 聯絡方式</span>

14.1. 用戶欲向本樂園聯絡本遊戲服務相關事項，請以實體前往數位藝術中心向第七組展覽人員反應。
                </pre>
                <button id="toc-back" class="btn-small">回上頁</button>
                </div>
            </div>
        </div>

        <div class="main-area">
            <div class="ad-vertical cursor-pointer">
                <img id="ad-left" class="img-ad" src="https://media.giphy.com/media/Sdu0SlDMhlOlqHuoqH/giphy.gif">
            </div>
            <div class="game-grid-container">
                <div id="game-1" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/blue dots.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">圈藍點點</div>
                </div>
                <div id="game-2" class="game cursor-pointer"><img class="img-game-thumbnail" src="assets/game thumbnail/flip-card.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">翻牌遊戲</div>
                </div>
                <div id="game-3" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/coli.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">專注遊戲</div>
                </div>
                <div id="game-4" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/asteriods.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">Asteriods</div>
                </div>
                <div id="game-5" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/maze.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">平衡迷宮</div>
                </div>
                <div id="game-6" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/pacman.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">復古小精靈</div>
                </div>
                <div id="game-7" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/tower.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">疊高塔</div>
                </div>
                <div id="game-8" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/digger.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">挖地洞</div>
                </div>
                <div id="game-9" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/duck.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">射鴨</div>
                </div>
                <div id="game-10" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/test-1.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">Labu Labu小酒館</div>
                </div>
                <div id="game-11" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/test-2.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">精靈の算命小屋</div>
                </div>
                <div id="game-12" class="game cursor-pointer">
                    <img class="img-game-thumbnail" src="assets/game thumbnail/flash.png">
                    <div id="game-title" class="game-title noselect cursor-pointer">波波歷險記</div>
                </div>
            </div>
            <div class="ad-vertical cursor-pointer">
                <img id="ad-right" class="img-ad" src="https://media.giphy.com/media/2RpeMI2nbNHEQiv9PN/giphy.gif">
            </div>
        </div>
        <div class="ad-horizontal cursor-pointer">
            <img id="ad-bottom" class="img-ad" src="https://media.giphy.com/media/JQEOpb8fncJPC485bA/giphy.gif">
        </div>
        <div id="overlay"></div>
    </body>

    <script src="ad.js"></script>
    <script src="script.js"></script>
    

</html>