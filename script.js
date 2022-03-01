var modal_signup = document.getElementsByClassName("modal-signup")[0]
var btn_signup = document.getElementById("btn-signup")
var btn_close_signup = document.getElementById("close-signup")
var btn_submit_signup = document.getElementById("signup")

/* ad */
var ad_left = document.getElementById("ad-left")
var ad_right = document.getElementById("ad-right")
var ad_bottom = document.getElementById("ad-bottom")

var ad_left_src = ad_left.getAttribute("src")
var ad_right_src = ad_right.getAttribute("src")
var ad_bottom_src = ad_bottom.getAttribute("src")

var game_session = 1
var game_id = 0
var choice_id = ""

window.onload = function() {
    console.log("ad-left: "+ad_left_src)
    console.log("ad-right: "+ad_right_src)
    console.log("ad-bottom: "+ad_bottom_src)
    console.log("game session: "+game_session+", game_id: "+game_id+", choice_id: "+choice_id)
}


/* game */
var game = $(".game")
var game_title = game.find(">:last-child")

$(document).on("mouseenter", ".game", function() {
    $(this).find(">:last-child").css("display","block");
 });

game.mouseleave(() => {
    game_title.hide()
})

/*
var game_title = $(".game-title")
console.log(game_title)


game1.mouseenter(function() {
    console.log("mouse enter")
    game_title.style.display = "block"
})
*/

/* game */

for(let i=0; i<12; i++) {
    let game_clicked = document.getElementsByClassName("game")[i]
    
    game_clicked.onclick= function() {
        game_id = $(this).attr("id").split("-")[1]
        if (game_session == 0) {
            console.log("first time play game")
            modal_signup.style.display = "block"
        }
        else {
            location.href="game.php?game_id="+game_id
        }
    }
}

// btn_signup.addEventListener('click', function(){
//     console.log('HI'); 
//   }, false);


// btn_signup.onclick = function(){
//     console.log("open signup")
//     modal_signup.style.display = "block"
// }

btn_close_signup.onclick = function(){
    console.log("close signup")
    modal_signup.style.display = "none"
}

btn_submit_signup.onclick = function(){
    console.log("signup succesful!")
}

function playGame() {
    console.log("play")
    window.location.assign("game.html")
}