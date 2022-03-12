// var loggedin = parseInt($("#loggedin").text())
// var username = $("#session_username").text().replace("你好，",'')
var loggedin = 0
var game_session = 0
var game_id = 0
var choice_id = ""

// Fetch Backend data
function getSession() {
    $.get("php/session.php", function(data, status){
        // alert(JSON.stringify(data) + "\nStatus: " + status)
        loggedin = data.loggedin
        var username = data.username
        var askQuestion = data.askQuestion
        console.log("loggedin: "+loggedin)
        console.log("username: "+username)
        console.log("askQuestion: "+askQuestion)
    }, "json")
}

// Run basics
window.onload = function() {
    getSession()
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

// Lock y-scroll when modal appears
function lockScroll() {
    $("body").attr("overflow-y", "hidden")
}

function unlockScroll() {
    $("body").attr("overflow-y", "visible")
}