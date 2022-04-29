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
                    <input class="input-signup" type="password" id="password" name="password" placeholder="至少3個字 只能用數字歐"></input>
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
本服務條款（以下簡稱「本條款」）是就XXX（以下稱「本公司」）以XXX名義所提供遊戲服務（以下簡稱「本服務」）的使用條件，由使用本服務之台灣用戶（依本公司所定方式註冊之會員，以下簡稱「用戶」）與本公司間訂定的條款。

**1. 定義**

本條款使用下列各項用語：

1.1. 「帳號」係指本公司於用戶開始使用本服務時所發行之用以辨識用戶的文字列或其他標識。其中，本公司基於用戶申請所設定的標識符稱為「用戶ID」。

1.2. 「遊戲內積分」係指可於遊戲後兌換本服務中有償提供之虛擬稱號。

1.3. 「個別使用條款」係指與本服務有關而有別於本條款，以「條款」、「準則」、「政策」等名稱由本公司所分發或公布的書面，其中包含本公司所擬定之遊戲管理規則。「遊戲管理規則」係指本公司於遊戲內容資訊或常見問答中所公告或上傳對於限制或禁止使用遊戲之相關準則。

1.4. 「內容」係指文字、語音、音樂、圖片、影片、軟體、程式、代碼及其他資訊等內容。

1.5. 「本內容」係指可透過本服務連結的內容。

1.6. 「投稿內容」係指用戶回答問題、傳送、上傳至本服務的內容。

1.7. 「有償服務」係指於本服務中有償提供給用戶（包括兌換以有償方式提供的遊戲內貨幣）的服務或內容。

**2. 對於本條款的同意表示**

2.1. 用戶應遵照本條款規定使用本服務。用戶須有效且不可撤銷地同意本條款，方能使用本服務。以下內容視為本條款之一部分，與本條款具有相同之效力：一、由本公司所為有關本服務之廣告或宣傳內容。二、計費制遊戲之收費計算方式及個別使用條款。

2.2. 如用戶為限制行為能力人，應須經過用戶之法定代理人同意，方能使用本服務。如用戶為無行為能力人，應由用戶之法定代理人代為同意，方能使用本服務。此外，如用戶為業者使用本服務時，亦請於該業者同意本條款後，再使用本服務。另外，若用戶為限制行為能力人或無行為能力人，除應符合前段之規定外，並應於用戶之法定代理人閱讀、瞭解並有效且不可撤銷地同意本條款之所有內容後，方得使用本服務，本條款之內容變更時亦同。

2.3若限制行為能力人未經其法定代理人同意或無行為能力人未由法定代理人代為付費購買遊戲內貨幣時，該法定代理人得依本公司官方網站或本服務常見問答所公告之流程，備妥證明文件並提出申請退費。本公司經確認後，退還用戶未使用之遊戲內貨幣費用。

2.4. 本服務一經用戶實際使用，將視為用戶已有效且不可撤銷地同意本條款。

2.5. 本服務有個別使用條款時，除本條款外，用戶亦應遵照個別使用條款規定使用本服務。

2.6. 本條款如有疑義時，應為有利於用戶之解釋。

**3. 本條款之變更**

除計費方式之變更依第6.5條之規定外，本公司修改本條款或個別使用條款時，應於本遊戲官網首頁、遊戲登入頁面或購買頁面公告之，並依用戶登錄之通訊資料通知用戶。本公司未依前項進行公告及通知者，本條款或個別使用條款之變更無效。用戶於前段通知到達後十五日內，如：一、用戶未為反對之表示者，本公司依本條款或個別使用條款變更後之內容繼續提供本服務。二、用戶為反對之表示者，依用戶終止本條款之方式處理。

**4. 帳號密碼之使用**

4.1.用戶得自主回答問題並生成用戶ID，才可取得本服務之遊玩權限。

4.2.本服務的帳號，專屬於用戶個人。用戶於本服務的所有使用權，均不得轉讓、出借予第三人或使第三人繼承。

4.3. 符合前項規定時，用戶所生成的ID不會因玩家的意志而由所存滅。

4.4. 自帳號刪除時起，本公司將依舊保有用戶資訊的所有使用權，不論任何理由均不為消滅。

4.5. 帳號密碼之使用

4.6.本服務的帳號，專屬於用戶個人。用戶於本服務的所有使用權，均不得轉讓、出借予第三人或使第三人繼承。

4.7. 帳號密碼若遭非法使用，本公司不負通知與處理之責。

4.8.1. 任一方如發現用戶之帳號或密碼被非法使用時，應立即通知對方並由本公司進行查證。經本公司確認有前述情事後，得暫停該組帳號或密碼之使用權，更換帳號或密碼予用戶，立即限制第三人就本服務之使用權利，並將相關處理方式揭載於本服務相關遊戲管理規則。

4.8.2. 本公司應於暫時限制遊戲使用權利之時起，即刻以官網公告、簡訊、電子郵件、推播或其他雙方約定之方式通知前項之第三人提出說明。如該第三人未於接獲通知時起七日內提出說明，本公司應直接回復遭不當移轉之電磁紀錄予用戶，如不能回復時可採其他雙方同意之相當補償方式，並於回復後解除對第三人之限制。但如本公司有提供免費安全裝置（如防盜卡、電話鎖等）而用戶不使用或有其他可歸責於用戶之事由，本公司不負回復或補償責任。

4.8.3. 前二項所述之第三人不同意本公司前項之處理時，用戶得依報案程序，循司法途徑處理。

4.8.4. 本公司依第4.8.1.條規定限制用戶或第三人之使用權時，在限制使用期間內，本公司不得向用戶或第三人收取費用。

4.8.5.用戶如有申告不實之情形致生本公司或第三人權利受損時，應負一切法律責任。

**5. 隱私權**

5.1. 本服務相關之個人資料由XXX管理。

5.2. 本公司將使用用戶的隱私資訊作為廣告投放分析用途。

5.3. 本公司依照XXX遊戲資訊使用協定及相關法律，妥善處理及保護用戶的隱私資料與個人資料。

5.4. 本公司將會以佛系的方式管理自用戶處蒐集的資料，並對安全管理採取寬鬆的措施。

**6. 服務的提供**

6.1. 此服務的僅於xx/xx~xx/xx提供給第13th數位內容與科技學士學程畢業製作做正式營運使用。

6.2. 本公司得按年齡、用戶有無完成身份確認作業、用戶有無註冊資料及其他本公司判斷為必要的條件，將本服務的全部或部分提供給符合上揭條件的用戶。

6.3. 本公司判斷有必要時，得在不事先通知用戶的情形下隨時變更本遊戲服務的全部或部分內容。

6.4. 關於有償服務部分，將無法因用戶取消而退款、退還遊戲內貨幣，或其他償還。但法令規定有必要者，則不在此限。

6.5. 計費方式：

6.5.本服務之收費計算方式為：遊戲本體免費下載，用戶所提供之資訊即為獲利來源。

6.6.本公司應於本公司遊戲首頁、遊戲登入頁面或問題頁面上載明以下事項：

一、不依遊戲軟體分級管理辦法規定標示遊戲分級級別及禁止或適合使用之年齡層。

二、進行本服務之最低軟硬體需求為連線功能的筆記型電腦。

三、有提供安全裝置者，其免費或付費資訊。

**7. 無緊急通報功能**

本服務並未搭載能向警察機關、海岸巡防機關、消防機關或其他機關等發出緊急通報的功能。

**8. 廣告刊登**

本公司得根據用戶提供資訊，在遊戲伺服器中刊登來自本公司或第三人的客製化廣告。

**9. 業務合作夥伴服務**

本服務內可能包含其他與本公司有業務合作的業者所提供的服務或內容。該等服務或內容所應負責任，概由提供服務或內容的業者負擔。此外，提供服務或內容的業者所規定的使用條款及其他條件，可能適用於該等服務或內容。

**10. 內容**

10.1. 本公司就本公司所提供的本內容授予用戶使用權，此使用權不得轉讓及再授權，且具有非獨占性，並僅限於使用本服務。

10.2. 如用戶使用的本內容另有規定使用費、使用期間等使用條件時，即應遵照該等使用條件。即使本服務介面上有顯示「購買」、「販賣」等文字，本公司對客戶提供的本內容相關智慧財產權及其他權利亦不因此移轉給用戶，對用戶僅有授予上述第10.1項的使用權。

10.3. 用戶不得超出本服務所訂定的使用樣態而使用(包括重製、傳送、轉載、更動等行為)本內容。

10.4. 請用戶自行儲存投稿內容的備份。本公司並無義務儲存投稿內容的備份。

10.5. 本服務可能具備多數用戶可進行投稿、修改、刪除等編輯的功能。於此情形下，用戶同意其他用戶可編輯該用戶自行投稿的內容。

10.6. 用戶對投稿內容所應有的權利照常維持不變，本公司並未取得相關權利。但投稿內容屬於對其他不在好友名單內的用戶亦會公開的內容，用戶以無償、無限期、不限地點的方式，授權本公司將該投稿內容用於服務或促銷活動的權利（包括於認有必要且適當的範圍內，本公司得加以省略等變更的權利。另包括本公司將相關使用權再授權給與本公司有業務合作的第三人的權利）。

10.7. 本公司需確認有無違反法令或本條款規定等情形時，得對投稿內容的內涵進行確認。但此不代表本公司有義務進行該等確認。

10.8. 本公司認為用戶投稿內容違反相關法令或本條款規定或有違反之虞時，或有其他業務上需求時，得在不事先通知用戶的情形下，以刪除投稿內容等方式限制本服務中投稿內容的使用。

**11. 遊戲管理規則**

為規範遊戲進行之方式，本公司應訂立合理公平之遊戲管理規則，用戶應遵守本公司公告之遊戲管理規則。

此外，遊戲管理規則之變更應依本條款第3條之程序為之。

遊戲管理規則有下列情形之一者，其規定無效：

一、牴觸本條款之規定。

二、剝奪或限制用戶之契約上權利。但本公司依第14.2條之規定處理者，不在此限。

**12. 禁止事項**

用戶於使用本服務時不得從事下列所述行為：

13.1. 違反法令、法院判決、裁定或命令或具有法令拘束力的行政措施的行為。

13.2. 恐有危害公共秩序或善良風俗的行為。

13.3. 侵害本公司或第三人的著作權、商標權、專利權等智慧財產權、名譽權、隱私權、其他法令或契約規定權利的行為。

13.4. 投稿或傳送內容有過度暴力的表現、性暗示過度露骨的表現、涉及人種、國籍、信仰、性別、社會地位、家世等有關歧視的表現、引誘或助長自殺、自傷行為或濫用藥物的表現、其他有反社會情節使人感到不愉快的表現的行為。

13.5. 偽裝成本公司或第三人的行為或故意散布不實資訊的行為。

13.6. 傳送同一或類似訊息給不特定多數用戶的行為（經本公司同意者除外）、其他本公司判斷為垃圾訊息的行為。

13.7. 藉由本公司規定以外的方式，以本內容的使用權兌換現金、財物或其他經濟利益的行為。

13.8. 以行銷、宣傳、廣告、招攬或其他營利為目的的行為（經本公司同意者除外）、以性行為或猥褻行為為目的的行為、以與未曾謀面的異性認識或交往為目的的行為、以騷擾或毀謗中傷其他用戶為目的的行為、其他基於與本服務訂定的使用目的不同之目的使用本服務的行為。

13.9. 對反社會勢力提供利益或其他協助的行為。

13.10.勸誘參與宗教活動或宗教團體的行為。

13.11.不當蒐集、公開或提供他人的個人資料、註冊資料、使用記錄資料等的行為。

13.12. 干擾本服務的伺服器或網路系統的行為、利用BOT、作弊工具、其他技術性手段不當操作服務的行為、故意利用本服務漏洞的行為、以刷機或越獄等方式改變終端 設備後連結本服務的行為、超出必要限度重複同一問題等對本公司提出不當洽詢或要求的行為、其他妨礙本公司經營本服務或其他用戶使用本服務，並製造干擾的行 為。

13.13.支援或助長符合前述第13.1.條至第13.12條任一行為的行為。

13.14.其他本公司判斷為不適當的行為。

**13. 用戶責任及權利**

14.1.用戶應自行承擔責任使用本服務，對於在本服務所從事的所有行為及其結果應自行負擔一切責任。

14.2. 違反本條款及遊戲管理規則之處理

14.2.1.除本條款另有規定外，有事實足證用戶於使用本服務中違反本條款或其他遊戲管理規則時，本公司應於本公司官網首頁、遊戲登入頁面或購買頁面中公告，並依用戶登錄之通訊資料通知用戶。

14.2.2.用戶第一次違反時，本公司應通知用戶於一定期間內改善。經本公司通知改善而未改善者，本公司得依遊戲管理規則，按其情節輕重限制用戶之遊戲使用權利。如用戶因同一事由再次違反遊戲管理規則或禁止事項時，本公司得立即依遊戲管理規則限制用戶進行遊戲之權利。

14.2.3.本公司依遊戲管理規則限制用戶進行遊戲之權利，每次不得超過7日。

14.3. 申訴權利

14.3.1.用戶不滿意本公司提供之連線品質、遊戲管理、費用計費、其他相關之服務品質，或對本公司之處置不服時，得於收到通知之翌日起七日內以電子郵件方式提出申訴，本公司應於接獲申訴後，於15日內回覆處理之結果。

14.3.2.本公司應於本公司官網或遊戲管理規則中明訂服務專線、電子郵件等相關聯絡資訊與二十四小時申訴管道。

14.3.3用戶反映第三人利用外掛程式或其他影響遊戲公平性之申訴，依第14.3.1條規定辦理。

14.3.4.如因用戶惡意向本公司申訴，或用戶惡意指示其他第三人向本公司申訴，致本公司直接或間接蒙受任何損害時，用戶應依照本公司要求立即賠償本公司所受之損害。

**15. 本公司的免責**

15.1. 除本公司依本條款第17條所應負之責任外，不論明示或默示，本公司均未保證本服務（包括本內容）不具有事實瑕疵或法律瑕疵（包括安全性、可靠性、正確性、完整性、有效性、特定目的的適用性、安全等相關缺陷、錯誤或程式錯誤、權利侵害等）。本公司對用戶並無清除該等瑕疵後再提供本服務的義務。

15.2. 除本條款另有約定外，因本服務而對用戶所造成的所有損害，本公司將不負任何責任。但本公司與用戶間的本服務相關契約（包括本條款）為消費者契約法規定的消費者契約時，則不適用此免責規定。

**16. 連線品質**

16.1. 本公司為維護本服務相關系統及軟硬體設備而預先規劃暫停本服務之全部或一部時，應於七日前於本公司官網首頁、遊戲登入頁面或購買頁面公告。但因臨時性、急迫性或不可歸責於本公司之事由者，不在此限。

16.2. 因可歸責本公司之事由，致用戶不能連線使用本服務時，本公司應立即更正或修復。對於用戶於無法使用期間遭扣除遊戲內貨幣、遊戲費用或遊戲內商品，本公司應予返還，無法返還時則應提供其他合理之補償。

**17. 本公司及用戶責任**

17.1.本公司應依本條款之規定負有於提供本服務時，維護其自身電腦系統，符合當時科技或專業水準可合理期待之安全性。

17.2.電腦系統或電磁紀錄受到破壞，或電腦系統運作異常時，本公司應於採取合理之措施後儘速予以回復。

17.3.本公司違反前二項規定或因遊戲程式漏洞致生用戶損害時，應依用戶受損害情形，負損害賠償責任。但本公司能證明其無過失者，得減輕其賠償責任。

17.4.本公司電腦系統發生第17.2條所稱情況時，於完成修復並正常運作之前，本公司不得向用戶收取費用。

17.5.用戶因共用帳號、委託他人付費購買遊戲內貨幣衍生與第三人間之糾紛，本公司得不予協助處理。

**18. 本條款之解除與終止**

18.1.用戶得於開始遊戲後七日內，以書面告知本公司解除本條款，停止本服務之使用，用戶無需說明理由及負擔任何費用。但本公司已提供用戶事先檢視後始下載者，不在此限。

18.2.前項情形，用戶得就未使用之付費購買遊戲內貨幣向本公司請求退費。

18.3.用戶得隨時通知本公司終止本條款。如本條款經終止，本公司得同時終止本服務。

18.4.因用戶逾一年期間內未登入使用本服務而終止本條款者，本公司應於預定終止前十五日，通知用戶登入，但用戶如屆期仍未登入使用者，則本公司得終止用戶使用本服務。

18.5.用戶有下列重大情事之一者，本公司依用戶登錄之通訊資料通知用戶後，得立即終止本條款並終止用戶繼續使用本遊戲：

一、利用任何系統或工具對本公司電腦系統之惡意攻擊或破壞。

二、以利用外掛程式、病毒程式、遊戲程式漏洞或其他違反遊戲常態設定或公平合理之方式進行遊戲。

三、以冒名、詐騙或其他虛偽不正等方式付費購買遊戲內貨幣或遊戲內商品。

四、因同一事由違反本條款或遊戲管理規則達三次以上，經依第14.2條通知改善而未改善者。

五、經司法機關查獲從事任何不法之行為。

18.6.本公司對第18.5條事實認定產生錯誤或無法舉證時，本公司應對用戶之損害負賠償責任。但本公司已盡合理查證義務者，不在此限。

18.7.本條款終止時，本公司應於收到用戶之退款要求並於用戶完成本公司所要求之個人資料驗證程序後三十日內，以匯款、信用卡、匯票或掛號寄發支票等本公司自行擇一之方式退還用戶未使用之付費購買之遊戲內貨幣。惟，如用戶未提交本公司指定之適當的個人資料驗證文件，則用戶之退款要求將無效。

18.8.因本公司停止本遊戲服務之營運而終止本條款者，應於終止前三十日公告於遊戲網站首頁、遊戲登入頁面或購買頁面，並依用戶登錄之通訊資料通知用戶。若本公司未依前項期間公告並通知，除應退還用戶未使用之付費購買遊戲內貨幣且不得扣除必要成本外，並應提供其他合理之補償。

**19. 聯絡方式**

19.1. 本公司向用戶聯絡本服務相關事項，得於本公司經營網站內的適當處公布或其他本公司判斷為適當的方式進行。包括但不限於用戶同意本公司依用戶登錄之通訊資料為通知送達。前段登錄通訊資料若有變更，用戶應即以書面通知本公司。本公司應依變更後之通訊資料為送達。本公司依用戶登錄之通訊資料所為之通知發出後，以書面通知到達用戶，或電子郵件進入用戶之電子郵件伺服器中，推定為已送達。因用戶之故意或過失致本公司無法為送達者，本公司對用戶因無法送達所致之損害不負賠償責任。除本條款另有約定外，本公司於站內的適當處公布本服務相關事項或以其他適當方式進行時，於用戶使用本服務時，即視為已通知用戶。

19.2. 用戶向本公司聯絡本服務相關事項，請以本公司經營網站內的適當處所設置的問題反應表傳送或依本公司指定方式進行。
                </pre>
                <button id="toc-back" class="btn-small">回上頁</button>
                </div>
            </div>
        </div>

        <div class="main-area">
            <div class="ad-vertical cursor-pointer">
                <img id="ad-left" class="img-ad" src="assets/ads/simulate-ad-change/ad-left.png">
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
                <img id="ad-right" class="img-ad" src="assets/ads/simulate-ad-change/ad-right.png">
            </div>
        </div>
        <div class="ad-horizontal cursor-pointer">
            <img id="ad-bottom" class="img-ad" src="assets/ads/simulate-ad-change/ad-bottom.png">
        </div>
        <div id="overlay"></div>
    </body>

    <script src="ad.js"></script>
    <script src="script.js"></script>
    

</html>