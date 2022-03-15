var iframe = $("iframe")
// var game_session = parseInt($("#game-session").text())
var game_id = parseInt(window.location.search.split("=")[1])
var game_sim_id = game_id

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
    "assets/game/10-wine-test/index.html"
];

// Game Session
var game_session = 1
//game_session 代表玩過遊戲的次數
//game_session 不來自amount
//第一次玩的時候, 因為askQuestion = 0, 不應該要跳問題. 此時game_session等0
//第二次玩的時候, 因為askQuestion = 1, 所以應該要跳問題. 此時game_session等於1

// Start
window.onload = function() {
    // variable askQuestion is declared at game.php
    console.log("askQuestion: "+askQuestion)
    alert("askQuestion: "+askQuestion)

    // Determine show Question or not
    if(askQuestion != 0 & game_id<=9) {
        // Get game session
        $.get("amount.php", function(data, status){
            // alert(data + "\nStatus: " + status)
            game_session = parseInt(data)+1
            alert("gs from php: "+game_session)
            console.log("game_session: "+game_session)
            localStorage.setItem("game_session", game_session) //這邊會設置game session
            showQuestion(game_session)
        }, "text")
    }
    else {
        modal_question.hide()
        hideOverlay()

        //Auto scroll to game
        // $('html,body').animate({
        //     scrollTop: $("iframe").offset().top
        // },1500);
    }
    // Load Game
    let game_src = arr_game_src[game_id-1]
    $("iframe").attr("src", game_src)

    // Log Player Status
    console.log("now game session: "+game_session)
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

function showQuestion(game_session) {
    modal_question.show()
    showOverlay()
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
            option_1.text(arr_question[game_session-1][1])
            option_2.text(arr_question[game_session-1][2])
            option_3.text(arr_question[game_session-1][3])
        }
    }
}


// Submit answer to database
function submitAns() {
    $.ajax({
        url: 'php/resetQ.php',
        success: function(data) {
            $('.result').html(data);
        }
    });
    if(game_session == 7) {
        //提交的不是select radio而是文字
    }
    else {
        // Save answer into local storage
        var selected_radio = $("input[name=option]:checked", '#form-question').val()
        alert("Selected Radio: "+selected_radio)
        localStorage.setItem("game_id", game_id)
        localStorage.setItem("selected_radio", selected_radio)

        // Submit answer + update game_session
        $.post("submit.php", {selected_radio: selected_radio}, function() {
            alert("run")
        })
            .done(function(data) {
                // alert("after amount: "+data)
            })
            .fail(function(xhr, status, error) {
                alert(xhr.responseText)
            })
    }
}

$("#send_my_data").click(function(){
    submitAns()
})


// Count ad_change
// 換廣告：調整local storage ad_change變數的地方
function setAdChange() {
    alert("function set ad change")
    if (typeof(localStorage.getItem("ad_change")) != "undefined" && localStorage.getItem("ad_change") !== null) {
        ad_change = parseInt(localStorage.getItem("ad_change"))
        alert("local storage取出的"+ad_change)
        ad_change = ad_change + 1
        localStorage.setItem("ad_change",ad_change)
        console.log("adchange game.js"+ad_change)
    }
    else {
        alert("no set ad change")
        // 註冊後local storage都還不曾新增過ad_change，將在第二次玩完遊戲後離開時新增該變數(第一次玩遊戲不跳問題，因此也不會需要換廣告)
        localStorage.setItem("ad_change",0)
    }
}


// After playing the Game
const modal_endgame = $(".modal-endgame")

function callParent(){
    // console.log("game has ended")
    modal_endgame.show()
    showOverlay()
}

function replay(){
    console.log("replay")
    modal_endgame.hide()
    hideOverlay()
    // localStorage.setItem("ad_change",1)
    setAdChange()
    window.location.reload()
    console.log("page reloaded")
    $.ajax({
        url: 'php/setQ.php',
        success: function(data) {
            $('.result').html(data);
        }
    });
}

function backtoMain(){
    console.log("back to main")
    modal_endgame.hide()
    hideOverlay()
    // localStorage.setItem("ad_change",0)
    setAdChange()
    window.location = "main.php"
    $.ajax({
        url: 'php/setQ.php',
        success: function(data) {
            $('.result').html(data);
        }
    });
}

$("img.img-logo-small").click(function() {
    // localStorage.setItem("ad_change",0)
    setAdChange()
})

// Show overlay and lock y-scroll when modal appears
const overlay = $("#overlay")

function showOverlay() {
    overlay.show()
    $("body").attr("overflow-y", "hidden")
}

function hideOverlay() {
    overlay.hide()
    $("body").attr("overflow-y", "visible")
}


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

