var modal_signup = $(".modal-signup")
var btn_signup = $("#btn-signup")
var overlay = $("#overlay")

/* ad */
var ad_left = $("#ad-left")
var ad_right = $("#ad-right")
var ad_bottom = $("#ad-bottom")

var ad_left_src = ad_left.attr("src")
var ad_right_src = ad_right.attr("src")
var ad_bottom_src = ad_bottom.attr("src")

var loggedin = parseInt($("#loggedin").text())
var username = $("#session_username").text().replace("你好，",'')
var game_session = 0
var game_id = 0
var choice_id = ""

// Player Status
function showLoginStatus() {
    if(loggedin != 0) {
        console.log("loggedin: "+loggedin)
        // console.log("username: "+username)
        game_session = parseInt($("#game-session").text())
    }
    else {
        console.log("loggedin: "+loggedin)
    }
}

function showAdStatus() {
    console.log("ad-left: "+ad_left_src)
    console.log("ad-right: "+ad_right_src)
    console.log("ad-bottom: "+ad_bottom_src)
    console.log("game session: "+game_session+", game_id: "+game_id+", choice_id: "+choice_id)
}

window.onload = function() {
    showLoginStatus()
    showAdStatus()
}

// Hover game title
var game = $(".game")
var game_title = game.find(">:last-child")

$(document).on("mouseenter", ".game", function() {
    $(this).find(">:last-child").css("display","block");
 });

game.mouseleave(() => {
    game_title.hide()
})


// Switch to specific game page
for(let i=0; i<12; i++) {
    let game_clicked = document.getElementsByClassName("game")[i]
    
    game_clicked.onclick= function() {
        game_id = $(this).attr("id").split("-")[1]
        if (loggedin == 0) {
            // Signup
            console.log("first time play game")
            overlay.show()
            modal_signup.show()
            lockScroll()
        }
        else {
            location.href="game.php?game_id="+game_id
        }
    }
}

// TOC
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

function playGame() {
    console.log("play")
    window.location.assign("game.html")
}


// Lock y-scroll when modal appears
function lockScroll() {
    $("body").attr("overflow-y", "hidden")
}

function unlockScroll() {
    $("body").attr("overflow-y", "visible")
}