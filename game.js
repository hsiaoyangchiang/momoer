var iframe = $("iframe")
var game_session = parseInt($("#game-session").text())
var game_id = parseInt(window.location.search.split("=")[1])
var game_sim_id = game_id
const overlay = $("#overlay")

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
    "assets/game/9-DuckHunt-JS-master/dist/index.html" //點擊重玩
];


// Start
window.onload = function() {
    // Show Question
    if(game_session != 0 & game_id<=9) {
        showQuestion()
    }
    else {
        modal_question.hide()
    }

    // Load Game
    let game_src = arr_game_src[game_id-1]
    $("iframe").attr("src", game_src)

    // Log Player Status
    console.log("game session: "+game_session)
    console.log("game id: "+game_id)
}


// Question Modal
const modal_question = $(".modal-question")
const question_radio = $(".question-radio")
const question_saq = $(".question-saq")
const question = $("label#question")
const option_1 = $("label#option-1")
const option_2 = $("label#option-2")
const option_3 = $("label#option-3")

// 問題編號: game_session - game_id
var arr_question = [ //問題集放這裡
    [["q1-1","option 1","option 2","option 3"],
    ["q1-2","option 1","option 2","option 3"],
    ["q1-3","option 1","option 2","option 3"],
    ["q1-4","option 1","option 2","option 3"],
    ["q1-5","option 1","option 2","option 3"],
    ["q1-6","option 1","option 2","option 3"],
    ["q1-7","option 1","option 2","option 3"],
    ["q1-8","option 1","option 2","option 3"],
    ["q1-9","option 1","option 2","option 3"]],
    [["q2-1","option 1","option 2","option 3"],
    ["q2-2","option 1","option 2","option 3"],
    ["q2-3","option 1","option 2","option 3"],
    ["q2-4","option 1","option 2","option 3"],
    ["q2-5","option 1","option 2","option 3"],
    ["q2-6","option 1","option 2","option 3"],
    ["q2-7","option 1","option 2","option 3"],
    ["q2-8","option 1","option 2","option 3"],
    ["q2-9","option 1","option 2","option 3"]],
    ["q3","option 1","option 2","option 3"],
    ["q4","option 1","option 2","option 3"],
    ["q5","option 1","option 2","option 3"],
    ["q6","option 1","option 2","option 3"],
    ["q7","option 1","option 2","option 3"],
    ["q8","option 1","option 2","option 3"],
    ["q9","option 1","option 2","option 3"],
];

function showQuestion() {
    modal_question.show()
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
        }
        else {
            question.text(arr_question[game_session-1][0])
            option_2.text(arr_question[game_session-1][1])
            option_2.text(arr_question[game_session-1][2])
            option_3.text(arr_question[game_session-1][3])
        }
    }
}

// Submit answer to database
$("#send_my_data").click(function(){
    submitAns()
})

function submitAns() {
    if(game_session == 7) {
        //提交的不是select radio而是文字
    }
    else {
        var selected_radio = $("input[name=option]:checked", '#form-question').val()
        alert("Selected Radio: "+selected_radio)
        $.post("submit.php", {selected_radio: selected_radio}).done(function(data) {
            alert("Data Loaded: "+data)
        })
    }
    
}


// After playing the Game
const modal_endgame = $(".modal-endgame")

function callParent(){
    console.log("game has ended")
    modal_endgame.show()
    overlay.show()
}

function replay(){
    console.log("replay")
    modal_endgame.hide()
    overlay.hide()
    window.location.reload()
    console.log("page reloaded")
}

function backtoMain(){
    console.log("back to main")
    modal_endgame.hide()
    overlay.hide()
    window.location = "main.html"
}



// Change Ads
var ad_left = $("#ad-left")
var ad_right = $("#ad-right")
var ad_bottom = $("#ad-bottom")





// Simulate change ads
const btn_submit = $("#send_my_data")
const sim_btn_change = $("#sim-change")

// //下一階段會調整換廣告的觸發時間，並不是submit問題後馬上換
// sim_btn_change.click(function() {
//     changeAd() 
// })
// btn_submit.click(function() {
//     changeAd()
// })


// Backend Panel Simulator
function displayGame(i) {
    let game_src = arr_game_src[i]
    $("iframe").attr("src", game_src)
}

var backend_panel_display = 0
const backend_panel = $("#backend-panel")
document.addEventListener('keydown', logKey);

function logKey(e) { //按b時開啟/關閉後端模擬控制面板
    if (e.code == "KeyB") {
        console.log("b is pressed")
        if (backend_panel_display == 0) {
            backend_panel.show()
            backend_panel_display = 1
        }
        else {
            backend_panel.hide()
            backend_panel_display = 0
        }
    }
}

const sim_btn_run = $("#sim-run")

sim_btn_run.click(function() { //run後端模擬
    console.log("run backend simulation")
    game_session = $("#game-session").val()
    game_sim_id = $("#game-id").val()

    $("#current-game-session").html(game_session)
    console.log("game session: "+game_session)
    console.log("game sim id: "+game_sim_id)
    displayGame(game_sim_id-1)
    showQuestion()
})

