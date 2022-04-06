// var loggedin = parseInt($("#loggedin").text())
// var username = $("#session_username").text().replace("你好，",'')
var loggedin = 0
var game_session = 0
var game_id = 0
var choice_id = ""

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
        } else {
            loggedin = 0
        }
        console.log("loggedin: "+loggedin)
        console.log("username: "+username)
        console.log("askQuestion: "+askQuestion)
    })
    getStats()
}

// User Stats
var img_logo = $("img.img-logo")
var body = $("body")
var player_title = $(".player-title")
var meow = [
    {//gs=0, 摩天輪玩家
        bg:"assets/bg/1.jpg",
        logo:"assets/logo/1.png",
        title: "摩天輪玩家",
        cat:""
    },
    {//gs=1, 咖啡杯玩家
        bg:"assets/bg/2.jpg",
        logo:"assets/logo/2.png",
        title: "咖啡杯玩家",
        cat:""
    },
    {//gs=2,3, 旋轉木馬玩家
        bg:"assets/bg/3.jpg",
        logo:"assets/logo/3.png",
        title: "旋轉木馬玩家",
        cat:""
    },
    {//gs=4,5, 海盜船玩家
        bg:"assets/bg/4.jpg",
        logo:"assets/logo/4.png",
        title: "海盜船玩家",
        cat:""
    },
    {//gs=6, 自由落體玩家
        bg:"assets/bg/5.jpg",
        logo:"assets/logo/5.png",
        title: "自由落體玩家",
        cat:""
    },
    {//gs=7, 進入結局
        bg:"",
        logo:"",
        cat:""
    }
]

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
                break
            case 2:
                console.log("旋轉木馬玩家")
                img_logo.attr("src",meow[2].logo)
                body.css("background-image","url("+meow[2].bg+")")
                player_title.text(meow[2].title)
                break
            case 3:
                img_logo.attr("src",meow[2].logo)
                body.css("background-image","url("+meow[2].bg+")")
                player_title.text(meow[2].title)
                break
            case 4:
                console.log("海盜船玩家")
                img_logo.attr("src",meow[3].logo)
                body.css("background-image","url("+meow[3].bg+")")
                player_title.text(meow[3].title)
                break
            case 5:
                img_logo.attr("src",meow[3].logo)
                body.css("background-image","url("+meow[3].bg+")")
                player_title.text(meow[3].title)
                break
            case 6:
                console.log("自由落體玩家")
                img_logo.attr("src",meow[4].logo)
                body.css("background-image","url("+meow[4].bg+")")
                player_title.text(meow[4].title)
                break
            default:
                img_logo.attr("src",meow[0].logo)
                body.css("background-image","url("+meow[0].bg+")")
                player_title.text(meow[0].title)
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
function lockScroll() {
    // alert("lock scroll")
    console.log("lock scroll")
    $("body").attr("overflow-y", "hidden")
}

function unlockScroll() {
    $("body").attr("overflow-y", "visible")
}

// Switch to specific game page
const modal_signup = $(".modal-signup")
const overlay = $("#overlay")

for(let i=0; i<12; i++) {
    let game_clicked = document.getElementsByClassName("game")[i]
    
    game_clicked.onclick= function() {
        game_id = $(this).attr("id").split("-")[1]
        if (loggedin == 0) {
            // Signup
            console.log("first time to play game")
            overlay.show()
            modal_signup.show()
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
