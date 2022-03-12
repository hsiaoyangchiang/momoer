const file_location = "assets/ads/simulate-ad-change/"
const fileType = ".jpg"
var ad_left = $("#ad-left")
var ad_right = $("#ad-right")
var ad_bottom = $("#ad-bottom")
var game_session = 0

function changeAd() {
    alert("change ad")
    game_session = localStorage.getItem("game_session")
    var game_id = localStorage.getItem("game_id")
    var selected_radio = localStorage.getItem("selected_radio") 
    alert(game_session)

    switch(game_session) {
        case 1:
            alert("case 1")
            console.log(file_location+"1-"+game_id+"-"+selected_radio+fileType)
            ad_bottom.attr("src") = file_location+"1-"+game_id+"-"+selected_radio+fileType
            break
        case 2:
            alert("case 2")
            ad_left.attr("src") = file_location+"2-"+game_id+"-"+selected_radio+"-l"+fileType
            ad_right.attr("src") = file_location+"2-"+game_id+"-"+selected_radio+"-r"+fileType
            break
        case 3, 4, 5, 6:
            alert("case 3up")
            ad_left.attr("src") = file_location+game_session+"-"+selected_radio+"-l"+fileType
            ad_right.attr("src") = file_location+game_session+"-"+selected_radio+"-r"+fileType
            ad_bottom.attr("src") = file_location+game_session+"-"+selected_radio+fileType
            break
        default:
            console.log("default")
            break
    }
}
changeAd()