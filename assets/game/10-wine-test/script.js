function changeSection() {
    var currentSection = $("body").find("section").css("display", "block").attr("id")
    // console.log(currentSection)

    switch(currentSection) {
        case "menu":
            console.log("move to instructions page")
            $("#menu").hide()
            $("#instuctions").show()
            break;
        case "instructions":
            console.log("move to test page")
            $("#instuctions").hide()
            break;
    }

}

$("button.start").click(function() {
    $("#menu").hide()
    $("#instuctions").show()
})
$("button.beginTest").click(function() {
    $("#instuctions").hide()
    $("#question-1").show()
})

var selected_value = 0
var arr_selected = []

$("button.answer").click(function() {
    if (selected_value != 0) {
        $("section").find(`[value="${selected_value}"]`).removeClass("active")
    }
    selected_value = $(this).attr("value")
    $(this).addClass("active")
    $("button.orange.deactivate").removeClass("deactivate")
    console.log("Selected: "+selected_value)
})

$("button.next").click(function() {
    if (selected_value != 0) {
        arr_selected.push(parseInt(selected_value))
        selected_value = 0
        // console.log("selected"+arr_selected)
        // console.log("sv"+selected_value)
        $("button.orange.deactivate").addClass("deactivate")
        switch(arr_selected.length) {
            case 1:
                $("#question-1").hide()
                $("#question-2").show()
                break
            case 2:
                $("#question-2").hide()
                $("#question-3").show()
                break
            case 3:
                $("#question-3").hide()
                $("#question-4").show()
                break
            case 4:
                $("#question-4").hide()
                $("#question-5").show()
                break
        }
    }
})

var cocktail = [
    {
        name:"柯夢波丹 Cosmopolitan",
        language:"願者上勾，後果自負。",
        short:"粉粉嫩嫩的顏色，看起來夢幻、適合新手，其實酒精濃度不低，算是Sour系的調酒。",
        description:"你表面溫和有禮，實際內心嗆辣戲很多。懂的創造自身的優勢，又不會給人愛現的感覺，外人通常覺得你是個相處起來舒服的人。在感情中，和對方相處到一定程度，才會慢慢的開始展現真正的自己，容易是驚喜包（或是驚嚇包）。很會在關係中創造新鮮感。",
        imgURL:"assets/1.png"
    },
    {
        name:"琴通寧 Gin Tonic",
        language:"看似平平無奇，沒我你卻不行。",
        short:"相當經典的 1+1 調酒，材料簡單，但是一杯可以很居家、也可以很專業的調酒。",
        description:"計畫在你的人生中佔很重要的部分，包括感情。比起轟轟烈烈、曇花一現的戀愛，你更在意細水長流、知根知底的陪伴。或許你在關係中比較比較不會耍花樣、玩浪漫，但在你身邊的人總是能感覺到濃濃的安全感。比起出去玩，大部分時間更喜歡和喜歡的人窩在家裡享受靜謐的兩人時光。",
        imgURL:"assets/2.png"
    },
    {
        name:"藍色夏威夷 Blue Hawaii",
        language:"哪裡有鳳梨，哪裡就有夏威夷，讓我和你形影不離。",
        short:"是一杯相當熱帶感的調酒，它的誕生地是在夏威夷的度假村中，因為加入了藍柑橘酒而得名。",
        description:"你的情感熱烈，心中大火熊熊燃燒，外表也毫不掩飾。雙方表達、展現熱情對你來說是必須，你享受戀愛中的酸酸甜甜，最喜歡對方的各種浪漫動作。只要一陷入愛河通常難以自拔，容易眼睛充滿粉紅泡泡濾鏡，不願意回到現實之中，也容易錯過感情中的red flag。",
        imgURL:"assets/3.png"
    },
    {
        name:"自由古巴 Cuba Libre",
        language:"你的引力抓不住我",
        short:"就是鼎鼎大名的Rum and Coke，是很好入門的調酒。相傳這杯調酒就是在古巴獨立戰爭這段時間所發明的。",
        description:"你享受生活中的刺激與變化，在感情中，你比較在意和對方相處起來的Chemistry，不會想太多、也不太在意繁瑣的小細節，覺得感覺對就好。但同時，只要相處感覺一變，通常對方就很難再抓住你，關係會被你以迅雷不及掩耳的速度結束。你覺得照顧好自己是最重要的，不一定要戀愛自己也能過的瀟灑自在，戀愛對你來說是錦上添花，卻不是必須。看似帥氣、能切割得很清楚，其實有時候是自己的保護機制，怕失控、失去自我，而不願投注所有感情。",
        imgURL:"assets/4.png"
    },
    {
        name:"野格炸彈 Jägerbomb",
        language:"愛到斷片，醒來再見",
        short:"野格是相當常用來喝 shot 的藥草酒，強烈的藥草味讓他評價很兩極。酒精濃度高達35%，加上能量飲，容易讓人不覺得醉而喝過底線，等到後勁一上來直接斷片。",
        description:"你從不掩飾自己，別人喜歡也好不喜歡也好，對你都不重要。你不在乎天長地久，只在乎曾經擁有，屬於只追求刺激的人，常常在試探自己冒險的底線。感情對你來說也是，你享受一時的刺激，卻不見得願意付出多於的努力經營關係。對你來說沒有什麼事比自己開心來得重要。",
        imgURL:"assets/5.png"
    },
]

$("button.end").click(function() {
    // console.log("show result")
    var score = parseInt(arr_selected.join(""))
    // console.log(score)

    var result = {
        1111:0,
        1112:1,
        1113:0,
        1114:4,
        1121:1,
        1122:1,
        1123:1,
        1124:1,
        1131:0,
        1132:1,
        1133:1,
        1134:1,
        1141:1,
        1142:1,
        1143:1,
        1144:1,
        1211:2,
        1212:2,
        1213:0,
        1214:4,
        1221:2,
        1222:1,
        1223:0,
        1224:1,
        1231:0,
        1232:1,
        1233:1,
        1234:1,
        1241:1,
        1242:1,
        1243:1,
        1244:1,
        1311:2,
        1312:2,
        1313:0,
        1314:2,
        1321:1,
        1322:1,
        1323:0,
        1324:2,
        1331:2,
        1332:0,
        1333:0,
        1334:2,
        1341:1,
        1342:1,
        1343:1,
        1344:1,
        1411:2,
        1412:3,
        1413:3,
        1414:4,
        1421:2,
        1422:2,
        1423:2,
        1424:2,
        1431:2,
        1432:3,
        1433:3,
        1434:2,
        1441:2,
        1442:3,
        1443:3,
        1444:3,
        2111:2,
        2112:3,
        2113:0,
        2114:2,
        2121:1,
        2122:0,
        2123:0,
        2124:2,
        2131:0,
        2132:0,
        2133:0,
        2134:2,
        2141:0,
        2142:0,
        2143:0,
        2144:3,
        2211:2,
        2212:1,
        2213:3,
        2214:2,
        2221:1,
        2222:0,
        2223:0,
        2224:2,
        2231:0,
        2232:0,
        2233:0,
        2234:2,
        2241:0,
        2242:0,
        2243:0,
        2244:3,
        2311:3,
        2312:3,
        2313:3,
        2314:2,
        2321:2,
        2322:0,
        2323:0,
        2324:3,
        2331:2,
        2332:3,
        2333:0,
        2334:2,
        2341:0,
        2342:0,
        2343:0,
        2344:2,
        2411:3,
        2412:3,
        2413:3,
        2414:4,
        2421:2,
        2422:2,
        2423:3,
        2424:3,
        2431:2,
        2432:3,
        2433:0,
        2434:4,
        2441:2,
        2442:3,
        2443:3,
        2444:4,
        3111:3,
        3112:3,
        3113:0,
        3114:4,
        3121:0,
        3122:3,
        3123:0,
        3124:3,
        3131:2,
        3132:2,
        3133:0,
        3134:2,
        3141:2,
        3142:3,
        3143:2,
        3144:4,
        3211:3,
        3212:3,
        3213:0,
        3214:4,
        3221:2,
        3222:3,
        3223:0,
        3224:2,
        3231:2,
        3232:2,
        3233:0,
        3234:2,
        3241:2,
        3242:3,
        3243:2,
        3244:2,
        3311:3,
        3312:3,
        3313:0,
        3314:4,
        3321:2,
        3322:3,
        3323:3,
        3324:3,
        3331:2,
        3332:3,
        3333:3,
        3334:4,
        3341:2,
        3342:3,
        3343:2,
        3344:3,
        3411:3,
        3412:3,
        3413:2,
        3414:4,
        3421:3,
        3422:3,
        3423:3,
        3424:3,
        3431:2,
        3432:3,
        3433:3,
        3434:4,
        3441:3,
        3442:3,
        3443:3,
        3444:4,
        4111:0,
        4112:0,
        4113:0,
        4114:4,
        4121:2,
        4122:0,
        4123:0,
        4124:2,
        4131:0,
        4132:0,
        4133:0,
        4134:2,
        4141:0,
        4142:1,
        4143:0,
        4144:2,
        4211:0,
        4212:0,
        4213:0,
        4214:4,
        4221:2,
        4222:0,
        4223:0,
        4224:2,
        4231:0,
        4232:0,
        4233:0,
        4234:2,
        4241:0,
        4242:1,
        4243:0,
        4244:2,
        4311:2,
        4312:3,
        4313:0,
        4314:4,
        4321:3,
        4322:3,
        4323:0,
        4324:4,
        4331:3,
        4332:2,
        4333:0,
        4334:3,
        4341:0,
        4342:1,
        4343:0,
        4344:4,
        4411:2,
        4412:3,
        4413:2,
        4414:4,
        4421:3,
        4422:3,
        4423:3,
        4424:4,
        4431:3,
        4432:2,
        4433:2,
        4434:3,
        4441:3,
        4442:3,
        4443:3,
        4444:4
    }
    // console.log(result[score])
    resultType = result[score]
    $(".question").hide()
    $("#result").show()

    $("#name").text(cocktail[resultType]["name"])
    $("#language").text(cocktail[resultType]["language"])
    $("#short").text(cocktail[resultType]["short"])
    $("#description").text(cocktail[resultType]["description"])
    $("img.cocktail").attr("src",cocktail[resultType]["imgURL"])
})

$("button.leave").click(function() {
    parent.window.location = "../../../main.php"
    let gamePlayed1 = true
    $.post("../../../php/submit-test.php",
    {
        gamePlayed1: gamePlayed1,
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