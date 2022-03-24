const cover = $("section#cover")
const instructions = $("section#instructions")
const picture = $("section#picture")
const question_1 = $("section#question-1")
const question_6 = $("section#question-6")
const loading = $("section#loading")
const result = $("section#result")

var countdown_num = parseInt($("#countdown-div").text())
var timer = 3000

cover.click(function() {
    cover.hide()
    instructions.show()
    setInterval(function() {
        countdown_num -= 1
        $("#countdown-div").text(countdown_num)
    },1000)
    setTimeout(function() {
        instructions.hide()
        picture.show()
    },timer)
    setTimeout(function() {
        picture.hide()
        question_1.show()
    },timer+3000)
})

var question = 1
$(".option").click(function() {
    $("section#question-"+question).hide()
    question += 1
    $("section#question-"+question).show()
})
$(".choose-elf").click(function() {
    var choice = parseInt($(this).attr("id").split("-").pop())
    console.log(choice)
    question_6.hide()
    showResult(choice)
})

var type = [
    {
        "color":"#498574",
        "bg":"assets/bg-a.png",
        "name":"幽默精靈",
        "description":"* 腦袋中充滿特別的點子\n* 是團隊中的開心果\n* 很會化解緊張的氣氛\n* 自得其樂的專家\n* 喜歡特別、跟大家不同的東西"
    },{
        "color":"#E78175",
        "bg":"assets/bg-b.png",
        "name":"社交精靈",
        "description":"* 長袖善舞的代表\n* 在不同場合都能如魚得水\n* 有各種不同類型的朋友\n* 和你相處起來很舒服\n* 偶爾也享受獨處的時光"
    },{
        "color":"#EFA531",
        "bg":"assets/bg-c.png",
        "name":"創造精靈",
        "description":"* 會有靈感從莫名其妙的地方衝出來\n* 思維很跳躍，別人有時無法理解\n* 容易沈浸在自己的思緒當中\n* 一旦要把靈感實踐時會充滿幹勁\n* 常常是朋友尋求意見的對象"
    },{
        "color":"#374D28",
        "bg":"assets/bg-d.png",
        "name":"古怪精靈",
        "description":"* 充滿好奇心\n* 喜歡一些奇奇怪怪的東西\n* 常常做一些外人無法理解的事\n* 很享受在自己的世界中\n* 樂於冒險"
    },
]

function showResult(choice) {
    result.show()
    $("h3").text(type[choice].name)
    $("h3").css("color",type[choice].color)
    $("#result-bg").attr("src",type[choice].bg)
    $("p.result").text(type[choice].description)
    setTimeout(function(){
        $("div.scroll-down").fadeOut()
        $("div.result").fadeIn()
    },500);
}

$("button#leave-btn").click(function() {
    console.log("leave game")
    parent.window.location = "../../../main.php"
    let gamePlayed = true
    $.post("../../../php/submit-test.php",
    {
        gamePlayed: gamePlayed,
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status); //回傳回來的資料
    })
        .done(function(data) {
            alert("done :)")
        })
        .fail(function(xhr, status, error) {
            alert(xhr.responseText)
        })
})
