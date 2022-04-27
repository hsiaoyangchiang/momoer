var iframe = $("iframe")
// var game_session = parseInt($("#game-session").text())
var game_id = parseInt(window.location.search.split("=")[1])
var game_sim_id = game_id
var askQ = 0


// Source of Game
var arr_game_src = [ //小遊戲連結
    "assets/game/1-Coil-master/index.html",
    "assets/game/2-flip-card-game-master/index.html",
    "assets/game/3-focus/dist/index.html",
    "assets/game/4-HTML5-Asteroids-master/index.html",
    "assets/game/5-MazeGame/dist/index.html",
    "assets/game/6-pacman-master/index.html",
    "assets/game/7-tower-blocks/dist/index.html",
    "assets/game/8-digger-main/index.html",
    "assets/game/9-DuckHunt-JS-master/dist/index.html", //點擊重玩
    "assets/game/10-wine-test/index.html",
    "assets/game/11-elf-test/index.html"
];

// Game Session
var game_session = 1
//game_session 代表玩過遊戲的次數
//game_session 是amount+1 (amount代表目前回答過的題數)
//第一次玩的時候, 因為askQuestion = 0, 不應該要跳問題. 此時game_session等0
//第二次玩的時候, 因為askQuestion = 1, 所以應該要跳問題. 此時game_session等於1

// Start
window.onload = function() {
    // get session value of askQuestion from askQ.php
    $.ajax({
        url: 'php/askQ.php',
        success: function(data) {
            console.log("askQuestion: "+data)
            var askQuestion = parseInt(data)
            if(askQuestion != 0 & game_id<=9) {
                askQ = askQuestion
                // Get game session
                $.get("amount.php", function(data, status){
                    // alert(data + "\nStatus: " + status)
                    game_session = parseInt(data)+1
                    // alert("gs from php: "+game_session)
                    console.log("game_session: "+game_session)
                    localStorage.setItem("game_session", game_session) //這邊會設置game session
                    
                    // changebg(game_session-1)
                    passAjax(game_session-1,changebg)
                    showQuestion(game_session)
                }, "text")
            }
            else {
                // changebg(parseInt(localStorage.getItem("game_session"))-1)
                passAjax(parseInt(localStorage.getItem("game_session"))-1,changebg)
                //Auto scroll to game
                // $('html,body').animate({
                //     scrollTop: $("iframe").offset().top
                // },1500);
            }
        }
    })

    // Load Game
    let game_src = arr_game_src[game_id-1]
    $("iframe").attr("src", game_src)
    if(game_id == 12) {
        setTimeout(() => {
            alert("Flash不支援")
            window.location = "main.php"
        }, 2000);
    }
}

function passAjax(data, callback){
    console.log("change bg",data)
    callback(data)
}


// Question Modal
const modal_question = $(".modal-question")
const question_radio = $(".question-radio")
const question_saq = $(".question-saq")
const question = $("label#question")
const option_1 = $("div#option-a")
const option_2 = $("div#option-b")
const option_3 = $("div#option-c")
const option_4 = $("div#option-d")

// 問題編號: game_session - game_id
var arr_question = [ //問題集放這裡
    [['這是一款需要靈機應變的遊戲，請問你的反應速度跟下列哪種動物一樣？','螳螂','貓頭鷹','藍鯨','樹懶'],
    ['貓咪問題','AAAAA','BBBBB','CCCCC','DDDDD'],
    ['這個遊戲會考驗你的好眼力，請問你是為什麼近視的？','認真讀書當學霸','追太多劇','躲在被子裡看漫畫','都是 DNA 的錯'],
    ['這個太空遊戲考驗你的方向掌控技巧。請問你最想成為哪方面的控制高手：','情緒控制','聲音控制','時間管控','食慾控制'],
    ['台北市的巷弄跟迷宮一樣，請問你在台北市被 google map 的導航騙過幾次？','從來沒被騙過','偶爾一兩次','有時候會被騙','總是被騙QQ'],
    ['如果你有一個小精靈，你覺得他會：','帶來財運','守護愛情','保佑健康','搗蛋作怪'],
    ['這是一款建築高塔的遊戲，請問你最喜歡什麼塔？','巴黎鐵塔','古夫金字塔','比薩斜塔','神魔之塔'],
    ['如果你在家後院挖到寶藏，你希望它是？','價值千萬的木乃伊','可以回到過去的玉鐲子','可以瞬間移動的裹腳布','可以聽到別人心中想法的耳耙子'],
    ['假如你下輩子會是一隻鳥，你希望老天爺把你變成：','公雞','天鵝','孔雀','烏鴉']],
    [['你知道貓咪都喜歡追逐發光的點點，請問你是貓派還是狗派？','貓貓','狗狗','披著狗皮的貓','披著貓皮的狗'],
    ['貓咪問題2','AAAAA','BBBBB','CCCCC','DDDDD'],
    ['請問你對什麼東西的顏色最沒有偏好？','毛巾','雨傘','餐具','政黨'],
    ['這個遊戲的太空船只能用左右鍵控制方向，請問你是左撇子還是右撇子？','左撇子','右撇子','XXXXXX','YYYYYY'],
    ['你覺得哪種不平衡感讓你最難忍受','組員簡報畫面圖文比不平衡','新耳機左右聲道音量不平衡','結束酒精路跑走路不平衡','心理不平衡'],
    ['小精靈誕生至今已經 42 歲了！請問你覺得在你 42 歲時...','跟伴侶養了一隻變色龍','在南極探險滿 5 年','成為小孩國小的家長會長','地球已經毀滅了'],
    ['這是個小朋友也能上手的遊戲，你小時候最喜歡看什麼卡通啊？','神奇寶貝','飛天小女警','家庭教師','烏龍派出所'],
    ['玩 Digger 需要動點腦力。請問你覺得下面哪件事最費腦力？','想下學期課要選什麼','想畢業要做什麼','想男女朋友在氣什麼','想午餐要吃什麼'],
    ['最喜歡的鴨子料理','薑母鴨','烤鴨','鴨賞','東山鴨頭']],
    ['你每個月拿多少的零用錢？','5000 以下','5000 - 10000','10000 - 20000','20000 以上'],
    ['你交往過幾個對象？','0 個','1-2 個','3-5 個','6 個以上'],
    ['你認為最快樂的時光是在什麼時期？','國中','高中','大學','未來，我目前都不快樂'],
    ['你覺得你最有自信的是身上的哪個部位？','額頭','鼻子','眼睛','手'],
    ['什麼是你想要做，但一直沒有時間/機會做的事情？']
];

function showQuestion(game_session) {
    showOverlay()
    overlay.promise().done(function() {
        modal_question.show("fold",1000)
    })
    
    if (game_session == 7) {
        question_radio.hide()
        question_saq.show()
        question.text(arr_question[game_session-1][0])
    }
    else {
        question_radio.show()
        question_saq.hide()

        if(game_session <=2) {
            question.text(arr_question[game_session-1][game_id-1][0]) //game_session=1時跳出問題，所以要-1
            option_1.text(arr_question[game_session-1][game_id-1][1]) //game_id 從1開始，所以要-1
            option_2.text(arr_question[game_session-1][game_id-1][2])
            option_3.text(arr_question[game_session-1][game_id-1][3])
            option_4.text(arr_question[game_session-1][game_id-1][4])
        }
        else {
            question.text(arr_question[game_session-1][0])
            option_1.text(arr_question[game_session-1][1])
            option_2.text(arr_question[game_session-1][2])
            option_3.text(arr_question[game_session-1][3])
            option_4.text(arr_question[game_session-1][4])
        }
    }
}


// Submit Answer
var selected_value = 0
var short_answer = ""

$("div.rect").click(function() {
    if (selected_value != 0) {
        $("div.question-radio").find(`[id="option-${selected_value}"]`).removeClass("active")
    }
    selected_value = $(this).attr("id").split("-").pop()
    console.log("Selected: "+selected_value)

    $(this).addClass("active")
    // $("input#send_my_data").removeClass("deactivate")
    $("button#send_my_data").removeClass("deactivate")
})

$("input[name=Q7]").click(function() {
    $("button#send_my_data").removeClass("deactivate")
})

$("button#send_my_data").click(function() {
    if (!$(this).hasClass("deactivate")) {
        // alert("active button")
        modal_question.hide({
            effect:"blind",
            direction:"down",
            duration:1000,
            complete: function () {
                $(this).parent().promise().done(function () {
                    hideOverlay()
                })
            }
        })
        if(game_session == 7) {
            short_answer = $("input[name=Q7]").val()
            // alert(short_answer)
            $.post("submit.php", 
            {
                short_answer: short_answer
            }, 
            function(data, status) {})
                .done(function(data) {
                    // alert("done")
                    window.location="end/end.php"
                })
                .fail(function(xhr, status, error) {
                    alert("系統暫時性問題，請洽詢工作人員")
                    console.log(xhr.responseTest)
                    alert(xhr.responseTest)
                })
        }
    }
})

function submit() {
    // alert("something is being submitted")
    // Submit answer + update game_session
    $.post("submit.php", 
    {
        selected_radio: selected_value,
        gameID: game_id
    }, 
    function(data, status) {})
    .done(function(data) {
    })
    .fail(function(xhr, status, error) {
        alert(xhr.responseTest)
    })
}

// Count ad_change
// 換廣告：調整local storage ad_change變數的地方
function setAdChange() {
    // alert("function set ad change")
    if (typeof(localStorage.getItem("ad_change")) != "undefined" && localStorage.getItem("ad_change") !== null) {
        ad_change = parseInt(localStorage.getItem("ad_change"))
        // alert("local storage取出的"+ad_change)
        ad_change = ad_change + 1
        localStorage.setItem("ad_change",ad_change)
        // console.log("adchange game.js"+ad_change)
    }
    else {
        // alert("no set ad change")
        // 註冊後local storage都還不曾新增過ad_change，將在第二次玩完遊戲後離開時新增該變數(第一次玩遊戲不跳問題，因此也不會需要換廣告)
        localStorage.setItem("ad_change",0)
    }
}


// After playing the Game
const modal_endgame = $(".modal-endgame")
var cat_level = $("#cat-level")
var player_level = $("#player-level")

function callParent(){
    // console.log("game has ended")
    showOverlay()
    overlay.promise().done(function() {
        modal_endgame.show({effect:"fold", duration:600})
    })

    if (localStorage.getItem("game_session") == null) {
        levelUp(0)
        // console.log("undefined gs")
    }
    else {
        levelUp(parseInt(localStorage.getItem("game_session")))
    }
}

function levelUp(level){
    switch(level) { //level=gs
        case 1:
            $(".hide-level").show()
            cat_level.text("二")
            player_level.text("咖啡杯玩家") 
            break
        case 2:
            cat_level.text("三")
            player_level.text("旋轉木馬玩家")
            break
        case 3:
            $(".hide-level").hide()
            break
        case 4:
            $(".hide-level").show()
            cat_level.text("四")
            player_level.text("海盜船玩家")
            break
        case 5:
            $(".hide-level").hide()
            break
        case 6:
            $(".hide-level").show()
            cat_level.text("五")
            player_level.text("自由落體玩家")
            break
        default:
            $(".hide-level").hide()
            break
    }
}

function replay(){
    // console.log("replay")
    modal_endgame.hide({ effect:"blind",direction:"down", duration:1000})
    hideOverlay()
    if (askQ != 0) {
        submit()
    }
    setAdChange()
    window.location.reload()
}

function backtoMain(){
    // console.log("back to main")
    modal_endgame.hide({ effect:"blind",direction:"down", duration:1000})
    hideOverlay()
    // localStorage.setItem("ad_change",0)
    if (askQ != 0) {
        submit()
    }
    setAdChange()
    window.location = "main.php"
}

// Show ad of personality-test
var test_ad_src = $("#test-ad-src")
var ad_test = $(".ad-test")
function loadTestAd(id) {
    if(id == 1) {
        test_ad_src.attr("src","assets/ads/simulate-ad-change/t1.png")
    }
    else {
        test_ad_src.attr("src","assets/ads/simulate-ad-change/t2.png")
    }
    setTimeout(function() {
        ad_test.animate({bottom:'0px'},1000)
    },2000)
    setTimeout(function() {
        ad_test.animate({bottom:'-264px'},1000)
    },12000)
}

// Show overlay and lock y-scroll when modal appears
const overlay = $("#overlay")

function showOverlay() {
    overlay.fadeIn(function(){
        $("body").css("height", "100vh")
        $("body").css("overflow-y", "hidden")
    })
}

function hideOverlay() {
    overlay.fadeOut(function(){
        $("body").css("height", "auto")
        $("body").css("overflow-y", "visible")
    })
}


// Change Background & Logo
var img_logo = $("img.img-logo-small")
var body = $("body")
var meow = [
    {//gs=0, 摩天輪玩家
        bg:"assets/bg/1.jpg",
        logo:"assets/logo/1.png"
    },
    {//gs=1, 咖啡杯玩家
        bg:"assets/bg/2.jpg",
        logo:"assets/logo/2.png"
    },
    {//gs=2,3, 旋轉木馬玩家
        bg:"assets/bg/3.jpg",
        logo:"assets/logo/3.png"
    },
    {//gs=4,5, 海盜船玩家
        bg:"assets/bg/4.jpg",
        logo:"assets/logo/4.png"
    },
    {//gs=6, 自由落體玩家
        bg:"assets/bg/5.jpg",
        logo:"assets/logo/5.png"
    },
    {//gs=7, 進入結局
        bg:"",
        logo:""
    }
]

function changebg(level) {
    // alert("change bg")
    switch(level) { //level = amount = gs-1
        case 1:
            // console.log("咖啡杯玩家")
            img_logo.attr("src",meow[1].logo)
            body.css("background-image","url("+meow[1].bg+")")
            break
        case 2:
            // console.log("旋轉木馬玩家")
            img_logo.attr("src",meow[2].logo)
            body.css("background-image","url("+meow[2].bg+")")
            break
        case 3:
            img_logo.attr("src",meow[2].logo)
            body.css("background-image","url("+meow[2].bg+")")
            break
        case 4:
            // console.log("海盜船玩家")
            img_logo.attr("src",meow[3].logo)
            body.css("background-image","url("+meow[3].bg+")")
            break
        case 5:
            img_logo.attr("src",meow[3].logo)
            body.css("background-image","url("+meow[3].bg+")")
            break
        case 6:
            // console.log("自由落體玩家")
            img_logo.attr("src",meow[4].logo)
            body.css("background-image","url("+meow[4].bg+")")
            break
        default:
            img_logo.attr("src",meow[0].logo)
            body.css("background-image","url("+meow[0].bg+")")
            break
    }
}

//Logout
const btn_logout = $(".logout")
btn_logout.click(function(){
    window.location = "end/end.php"
})