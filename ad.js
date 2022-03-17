const file_location = "assets/ads/simulate-ad-change/"
const fileType = ".png"
var ad_left = $("#ad-left")
var ad_right = $("#ad-right")
var ad_bottom = $("#ad-bottom")
var game_session = 0 //game session預設為0，將會在第一次回答問題後submit時取代為1

function changeAd(game_session) {
    // alert("change ad")
    // game_session = localStorage.getItem("game_session") //執行function前已經取出了，因此將值放入function的變數
    var game_id = localStorage.getItem("game_id")
    var selected_radio = localStorage.getItem("selected_radio")

    //以下內容暫時不需要修改
    switch(parseInt(game_session)) {
        case 1:
            // alert("case 1")
            if (localStorage.getItem("Q1_choice") == null) {
                ad_bottom.attr("src",file_location+"1-"+game_id+"-"+selected_radio+fileType)
                localStorage.setItem("Q1_choice",game_id+"-"+selected_radio)
            }
            else {
                var Q1_choice = localStorage.getItem("Q1_choice")
                ad_bottom.attr("src",file_location+"1-"+Q1_choice+fileType)
            }
            break
        case 2:
            alert("case 2")
            //bottom換成case 1 的
            var Q1_choice = localStorage.getItem("Q1_choice")
            ad_bottom.attr("src",file_location+"1-"+Q1_choice+fileType)

            //判斷是第一次換還是第二次
            if (localStorage.getItem("Q2") == null) {
                ad_left.attr("src",file_location+"2-"+game_id+"-"+selected_radio+"-l"+fileType)
                ad_right.attr("src",file_location+"2-"+game_id+"-"+selected_radio+"-r"+fileType)
                localStorage.setItem("Q2",1)
                localStorage.setItem("Q2_game_id",game_id)
            }
            else {
                var Q2_game_id = localStorage.getItem("Q2_game_id")
                ad_left.attr("src",file_location+"2-"+Q2_game_id+"-"+selected_radio+"-l"+fileType)
                ad_right.attr("src",file_location+"2-"+Q2_game_id+"-"+selected_radio+"-r"+fileType)
            }
            break
        case 3: case 4: case 5: case 6:
            // alert("case 3up")
            ad_left.attr("src",file_location+game_session+"-"+selected_radio+"-l"+fileType)
            ad_right.attr("src",file_location+game_session+"-"+selected_radio+"-r"+fileType)
            ad_bottom.attr("src",file_location+game_session+"-"+selected_radio+fileType)
            break
        default:
            ad_left.attr("src","assets/ads/simulate-ad-change/ad-left.png")
            ad_right.attr("src","assets/ads/simulate-ad-change/ad-right.png")
            ad_bottom.attr("src","assets/ads/simulate-ad-change/ad-bottom.png")
    }
}

var ad_change = localStorage.getItem("ad_change")

//若已有game_session, 則以localStorage取代
if (typeof(localStorage.getItem("game_session")) != "undefined") {
    game_session = localStorage.getItem("game_session")
}
// alert("game session: "+game_session)
// alert("ad change: "+ad_change)

if (ad_change >= game_session) { //換新的
    changeAd(game_session)
}
else { //換舊的
    changeAd(game_session-1) 
}
