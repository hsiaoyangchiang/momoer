const file_location = "assets/ads/simulate-ad-change/"
const fileType = ".png"
var ad_left = $("#ad-left")
var ad_right = $("#ad-right")
var ad_bottom = $("#ad-bottom")
var game_session = 0 //game session預設為0，將會在第一次回答問題後submit時取代為1

function changeAd(game_session) {
    alert("change ad")
    // game_session = localStorage.getItem("game_session") //執行function前已經取出了，因此將值放入function的變數
    var game_id = localStorage.getItem("game_id")
    var selected_radio = localStorage.getItem("selected_radio") 
    // alert(game_session)

    //以下內容暫時不需要修改
    switch(parseInt(game_session)) {
        case 1:
            alert("case 1")
            ad_bottom.attr("src",file_location+"1-"+game_id+"-"+selected_radio+fileType)
            break
        case 2:
            alert("case 2")
            ad_left.attr("src",file_location+"2-"+game_id+"-"+selected_radio+"-l"+fileType)
            ad_right.attr("src",file_location+"2-"+game_id+"-"+selected_radio+"-r"+fileType)
            break
        case 3:
            alert("case 3up")
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
alert("game session: "+game_session)
alert("ad change: "+ad_change)

if (ad_change >= game_session) {
    changeAd(game_session)
    // localStorage.setItem("ad_change",ad_change)
}
else {
    // ad_change = ad_change - 1
}
