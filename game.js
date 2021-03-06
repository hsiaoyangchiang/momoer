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

const music1 =  new Audio("assets/audio/game1.mp3")
const music2 = new Audio("assets/audio/game2.mp3")
const music3 = new Audio("assets/audio/game3.mp3")
const music4 = new Audio("assets/audio/game4.mp3")
const music5 = new Audio("assets/audio/game5.mp3")
const music6 = new Audio("assets/audio/game6.mp3")
const music7 = new Audio("assets/audio/game7.mp3")
const music8 = new Audio("assets/audio/test1.mp3")
const music9 = new Audio("assets/audio/test2.mp3")
const music10 = new Audio("assets/audio/test1.mp3")
const music11 = new Audio("assets/audio/test2.mp3")

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
                // showIntro()
                playMusic(askQuestion)
            }
            else if(askQuestion == 0 & game_id<=9){
                showOverlay()
                showIntro()
            }
            else {
                description.hide()
                playMusic(askQuestion)
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
var arr_question = [
    [
        ['這是一款需要靈機應變的遊戲，請問你的反應速度跟下列哪種動物一樣？','螳螂','貓頭鷹','藍鯨','樹懶'],
        ['撲克牌遊戲可以進行分類區分，你會最會擅長的為哪一類？','反應類','記憶類','益智類','運氣類'],
        ['這個遊戲會考驗你的好眼力，請問你是為什麼近視的？','認真讀書當學霸','追太多劇','躲在被子裡看漫畫','都是 DNA 的錯'],
        ['這個太空遊戲考驗你的方向掌控技巧。請問你最想成為哪方面的控制高手：','情緒控制','聲音控制','時間管控','食慾控制'],
        ['台北市的巷弄跟迷宮一樣，請問你在台北市被 google map 的導航騙過幾次？','從來沒被騙過','偶爾一兩次','有時候會被騙','總是被騙QQ'],
        ['如果你有一個小精靈，你覺得他會：','帶來財運','守護愛情','保佑健康','搗蛋作怪'],
        ['這是一款建築高塔的遊戲，請問你最喜歡什麼塔？','巴黎鐵塔','古夫金字塔','比薩斜塔','神魔之塔'],
        ['如果你在家後院挖到寶藏，你希望它是？','價值千萬的木乃伊','可以回到過去的玉鐲子','可以瞬間移動的裹腳布','可以聽到別人心中想法的耳耙子'],
        ['假如你下輩子會是一隻鳥，你希望老天爺把你變成：','公雞','天鵝','孔雀','烏鴉']
    ],
    [
        ['你知道貓咪都喜歡追逐發光的點點，請問你是貓派還是狗派？','貓貓','狗狗','披著狗皮的貓','披著貓皮的狗'],
        ['翻牌遊戲以政大附近的貓貓做為題材設計，請問你最希望政大附近再開一間什麼店？','火鍋吃到飽','臭豆腐店','酒吧','服飾店'],
        ['請問你對什麼東西的顏色最沒有偏好？','毛巾','雨傘','餐具','便利貼'],
        ['當你在宇宙中，你最不希望遇到甚麼東西？','蟲洞','幽浮','外星人','隕石'],
        ['你覺得哪種不平衡感讓你最難忍受','組員簡報畫面圖文比不平衡','新耳機左右聲道音量不平衡','結束酒精路跑走路不平衡','心裡不平衡'],
        ['小精靈誕生至今已經 42 歲了！請問你覺得在你 42 歲時...','跟伴侶養了一隻變色龍','在南極探險滿 5 年','財富自由頭好壯壯','地球已經毀滅了'],
        ['這是個小朋友也能上手的遊戲，你小時候最喜歡跟朋友玩什麼遊戲？','紅綠燈','躲避球','123木頭人','溜滑梯'],
        ['玩 Digger 需要動點腦力。請問你覺得下面哪件事最費腦力？','想下學期課要選什麼','想畢業要做什麼','想男女朋友在氣什麼','想午餐要吃什麼'],
        ['最喜歡的鴨子料理','薑母鴨','烤鴨','鴨賞','東山鴨頭']
    ],
    ['你每個月拿多少的零用錢？','5000 以下','5000 - 10000','10000 - 20000','20000 以上'],
    ['你交往過幾個對象？','0 個','1-2 個','3-5 個','6 個以上'],
    ['你認為最快樂的時光是在什麼時期？','國中','高中','大學','未來，我目前都不快樂'],
    ['你覺得你最不滿意的是身上的哪個部位？','額頭','鼻子','眼睛','臉型'],
    ['什麼是你想要做，但一直沒有時間/機會做的事情？']
]

//遊戲說明跟玩法
var arr_intro = [
    ['此為反應遊戲，盡你所能勾勒消除所有的藍色點點吧，來爭取積分吧！','透過滑鼠游移來進行勾勒消除。'],
    ['在限定機會中，透過記憶翻出相同圖案的牌來進行配對消除！', '透過滑鼠點擊來進行翻牌。'],
    ['同色的中央消除球只能抵銷同色的外來物，若中央消除球遇上不同色的外來物，中央消除球即會被摧毀，你就會輸！透過專注在切換來獲取高分吧！','透過滑鼠點擊切換中央消除球顏色。'],
    ['身為太空中的小飛船，在浩瀚的宇宙中充斥著你要盡可能的透過駕駛及發射飛彈不讓自己被宇宙版塊摧毀！', '透過方向鍵左右來順/逆時鐘調整前進方向，方向鍵上下來加速前進。'],
    ['讓分散於不同角落的球相遇並最終抵達指定區域。','透過滑鼠游移方向決定傾斜角度。'],
    ['作為小精靈最怕的就是遇上幽靈，每一關的你總共擁有4條命，在限定的的時間內盡可能的得高分吧！', '空白鍵 Space 暫停或繼續遊戲，上下左右控制小精靈移動方向。'],
    ['疊高塔的秘訣在於層層密合相疊，看你最高能疊幾層。', '透過滑鼠點擊來往上加蓋。'],
    ['吃掉所有黃金小心落石並走到終點。', '使用方向鍵來進行角色移動。'],
    ['經典的射擊遊戲，盡可能去射擊從田裡飛出的鳥類，去獲取高分吧！', '透過滑鼠點擊來射擊鳥類。']
]
const description = $("#description")
const intro = $("#intro");
const howToPlay = $("#howToPlay");

function showIntro(){
    description.show("fade",1000)
    console.log(intro)
    console.log(howToPlay)
    intro.text(arr_intro[game_id-1][0])
    howToPlay.text(arr_intro[game_id-1][1])
}

function playGame(){
    description.fadeOut()
    hideOverlay()
    if(game_id == 8 | game_id == 9){
        music.pause()
        console.log("game8, 9不要播")
    }
    else{
        music = eval("music"+game_id)
        music.play()
        music.addEventListener("ended", function(){
            music.currentTime = 0;
            console.log("ended"); 
            setTimeout(function(){
                music.play()
                console.log("再次播放")
            },1000)
        })
    }
}

function playMusic(askQuestion){
    music = eval("music"+game_id)
    var promise = music.play();
    if (promise !== undefined) {
    promise.then(_ => {
        if(askQuestion==1){
            if(game_id == 8 | game_id == 9){
                music.pause()
            }
            if(game_id == 10 | game_id ==11){
                music.play()
                console.log('心測要播')
                music.addEventListener("ended", function(){
                    music.currentTime = 0;
                    console.log("ended"); 
                    setTimeout(function(){
                        music.play()
                        console.log("再次播放")
                    },1000)
               });
            }
            else{
                music.pause()
                console.log('先不要播')
            }
        }else if(askQuestion==0){
            if(game_id == 8 | game_id == 9){
                music.pause()
            }else{
                music.play()
                console.log('播放')
                music.addEventListener("ended", function(){
                    music.currentTime = 0;
                    console.log("ended"); 
                    setTimeout(function(){
                        music.play()
                        console.log("再次播放")
                    },1000)
               });
            }
        }
    }).catch(error => {
        console.log(error)
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
    });
    }
}


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
                    // hideOverlay()
                    showIntro()
                    // if(game_id == 8 | game_id == 9){
                    //     music.pause()
                    //     console.log("game8, 9不要播")
                    // }
                    // else{
                    //     music = eval("music"+game_id)
                    //     music.play()
                    //     music.addEventListener("ended", function(){
                    //         music.currentTime = 0;
                    //         console.log("ended"); 
                    //         setTimeout(function(){
                    //             music.play()
                    //             console.log("再次播放")
                    //         },1000)
                    //     })
                    // }
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
    music = eval("music"+game_id)
    music.pause()
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
        test_ad_src.attr("src","https://media.giphy.com/media/bWouhHQ2KUSUX2zYHk/giphy.gif")
    }
    else {
        test_ad_src.attr("src","https://media.giphy.com/media/RSycGxs3VFzhZJAho0/giphy.gif")
    }
    setTimeout(function() {
        ad_test.animate({bottom:'0px'},1000)
    },1000)
    setTimeout(function() {
        ad_test.animate({bottom:'-433px'},1000)
    },11000)
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