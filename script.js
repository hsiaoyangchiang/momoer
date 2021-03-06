// var loggedin = parseInt($("#loggedin").text())
// var username = $("#session_username").text().replace("你好，",'')
var loggedin = 0
var game_session = 0
var game_id = 0
var choice_id = ""

const music = new Audio("assets/audio/main.mp3")


// Fetch Backend data
// function getSession() {
//     $.get("php/session.php", function(data, status){
//         // alert(JSON.stringify(data) + "\nStatus: " + status)
//         loggedin = data.loggedin
//         var username = data.username
//         var askQuestion = data.askQuestion
//         if(loggedin == 1) {
//             $("div.profile").show()
//             $("p#profile-username").text(username)
//         }
//         console.log("loggedin: "+loggedin)
//         console.log("username: "+username)
//         console.log("askQuestion: "+askQuestion)
//     }, "json")
// }
function getSession() {
    return $.get("php/session.php","json")
}

// Run basics
const btn_logout = $("button.logout")
btn_logout.click(function(){
    window.location = "end/end.php"
})

window.onload = function() {
    getSession()
    $.when(getSession()).done(function(data) {
        if (!$.isEmptyObject(data)){
            loggedin = JSON.parse(data).loggedin
            var username = JSON.parse(data).username
            var askQuestion = JSON.parse(data).askQuestion
        }
        if(loggedin == 1) {
            $("div.profile").show()
            $("p#profile-username").text(username)
            Webcam.reset('#my-camera')
            btn_logout.show()
            playMusic()
        } else {
            loggedin = 0
            Webcam.set({
                width: 160,
                height: 90,
                image_format: 'jpeg',
                jpeg_quality: 90
            })
            Webcam.attach('#my-camera')
            playMusic()
        }
        console.log("loggedin: "+loggedin)
        console.log("username: "+username)
        console.log("askQuestion: "+askQuestion)
    })
    // getStats()
}
document.addEventListener('DOMContentLoaded', () => {
    getStats()
})

// User Stats
var img_logo = $("img.img-logo")
var body = $("body")
var player_title = $(".player-title")
var cat_img = $("img.img-cat")
var meow = [
    {//gs=0, 摩天輪玩家
        bg:"assets/bg/1.jpg",
        logo:"assets/logo/1.png",
        title: "摩天輪玩家",
        cat:"assets/meow/cat-1.png"
    },
    {//gs=1, 咖啡杯玩家
        bg:"assets/bg/2.jpg",
        logo:"assets/logo/2.png",
        title: "咖啡杯玩家",
        cat:"assets/meow/cat-2.png"
    },
    {//gs=2,3, 旋轉木馬玩家
        bg:"assets/bg/3.jpg",
        logo:"assets/logo/3.png",
        title: "旋轉木馬玩家",
        cat:"assets/meow/cat-3.png"
    },
    {//gs=4,5, 海盜船玩家
        bg:"assets/bg/4.jpg",
        logo:"assets/logo/4.png",
        title: "海盜船玩家",
        cat:"assets/meow/cat-4.png"
    },
    {//gs=6, 自由落體玩家
        bg:"assets/bg/5.jpg",
        logo:"assets/logo/5.png",
        title: "自由落體玩家",
        cat:"assets/meow/cat-5.png"
    },
    {//gs=7, 進入結局
        bg:"",
        logo:"",
        cat:""
    }
]

function playMusic(){
    //第一個玩家會沒有音樂，但玩完第一個遊戲之後就不會了
    var promise = music.play();
    if (promise !== undefined) {
    promise.then(_ => {

    }).catch(error => {
        console.log(error)
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
    });
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

function getStats() {
    $.get("amount.php", function(data, status){
        console.log("getting user stats")

        // Level up
        level = parseInt(data)
        console.log("level: "+level)
        $(".exp-num").text(level*120)
        $("div.exp").css("width",parseInt(level*14)+"%")

        // Change Images
        switch(level) { //level = amount = gs-1
            case 1:
                console.log("咖啡杯玩家")
                img_logo.attr("src",meow[1].logo)
                body.css("background-image","url("+meow[1].bg+")")
                player_title.text(meow[1].title)
                cat_img.attr("src",meow[1].cat)
                break
            case 2:
                console.log("旋轉木馬玩家")
                img_logo.attr("src",meow[2].logo)
                body.css("background-image","url("+meow[2].bg+")")
                player_title.text(meow[2].title)
                cat_img.attr("src",meow[2].cat)
                break
            case 3:
                img_logo.attr("src",meow[2].logo)
                body.css("background-image","url("+meow[2].bg+")")
                player_title.text(meow[2].title)
                cat_img.attr("src",meow[2].cat)
                break
            case 4:
                console.log("海盜船玩家")
                img_logo.attr("src",meow[3].logo)
                body.css("background-image","url("+meow[3].bg+")")
                player_title.text(meow[3].title)
                cat_img.attr("src",meow[3].cat)
                break
            case 5:
                img_logo.attr("src",meow[3].logo)
                body.css("background-image","url("+meow[3].bg+")")
                player_title.text(meow[3].title)
                cat_img.attr("src",meow[3].cat)
                break
            case 6:
                console.log("自由落體玩家")
                img_logo.attr("src",meow[4].logo)
                body.css("background-image","url("+meow[4].bg+")")
                player_title.text(meow[4].title)
                cat_img.attr("src",meow[4].cat)
                break
            default:
                img_logo.attr("src",meow[0].logo)
                body.css("background-image","url("+meow[0].bg+")")
                player_title.text(meow[0].title)
                cat_img.attr("src",meow[0].cat)
                break
        }
        // $("body").css("background-image","url("+bg_url+")")

    }, "text")
}

// Hover game title
var game = $(".game")
var game_title = game.find(">:last-child")

$(document).on("mouseenter", ".game", function() {
    $(this).find(">:last-child").css("display","block")
    $(this).css("opacity","1")
 });

game.mouseleave(() => {
    game_title.hide()
    game.css("opacity","0.72")
})

// Lock y-scroll when modal appears
const overlay = $("#overlay")
function showOverlay() {
    overlay.fadeIn(function(){
        $("body").css("height", "100vh")
        $("body").css("overflow-y", "hidden")
    })
}

function unlockScroll() {
    $("body").css("overflow-y", "visible")
}

// Switch to specific game page
const modal_signup = $(".modal-signup")

for(let i=0; i<12; i++) {
    let game_clicked = document.getElementsByClassName("game")[i]
    
    game_clicked.onclick= function() {
        game_id = $(this).attr("id").split("-")[1]
        if (loggedin == 0) {
            // Signup
            console.log("first time to play game")
            showOverlay()
            overlay.promise().done(function() {
                modal_signup.show({effect:"fold", duration:600})
            })
            $("input[name='first_game_id']").val(game_id)
        }
        else {
            location.href="game.php?game_id="+game_id
        }
    }
}

// TOC
var agree_toc = 0
$(".img-checkbox, span.checkmark").click(function() {
    if (agree_toc == 0) {
        console.log("agree toc")
        $(".img-checkbox").attr("src","assets/icon/img-checkbox-checked.png")
        $("input.checkbox-signup").attr("checked")
        agree_toc = 1
    }
    else {
        console.log("disagree toc")
        $(".img-checkbox").attr("src","assets/icon/img-checkbox-unchecked.png")
        $("input.checkbox-signup").removeAttr("checked")
        agree_toc = 0
    }
    
})

$(".toc-link").click(function(){
    console.log("show toc")
    $(".form-signup").hide()
    $(".div-toc").show()
})

$("#toc-back").click(function(){
    console.log("hide toc")
    $(".form-signup").show()
    $(".div-toc").hide()
})

var url;
function storeImg(){
    Webcam.snap( function(data_uri) {
        console.log("take snapshot")
        url = data_uri
    } )
   localStorage.setItem("imgURL", url)
}
