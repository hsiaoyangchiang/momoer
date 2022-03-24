const file_location = "assets/ads/simulate-ad-change/"
const fileType = ".png"
var ad_left = $("#ad-left")
var ad_right = $("#ad-right")
var ad_bottom = $("#ad-bottom")
var game_session = 0 //game session預設為0，將會在第一次回答問題後submit時取代為1
var a = "a"
var b = "a"
var c = "a"

var ad_src = [ // gs - game_id - selected_radio
    [ // gs=1
        {
            "a":"assets/ads/simulate-ad-change/1-1-a.png",
            "b":"b",
            "c":"c"
        },{
            "a":"a",
            "b":"b",
            "c":"c"
        },{
            "a":"a",
            "b":"b",
            "c":"c"
        },{
            "a":"a",
            "b":"b",
            "c":"c"
        },{
            "a":"a",
            "b":"b",
            "c":"c"
        },{
            "a":"a",
            "b":"b",
            "c":"c"
        },{
            "a":"a",
            "b":"b",
            "c":"c"
        },{
            "a":"a",
            "b":"b",
            "c":"c"
        },{
            "a":"a",
            "b":"b",
            "c":"c"
        }
    ],
    [ // gs=2
        [ //left
            {
                "a":"assets/ads/simulate-ad-change/2-1-a-l.png",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },
        , //right
            {
                "a":"assets/ads/simulate-ad-change/2-1-a-r.png",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            }
        ]
    ],{ // gs=3
        "a": {
            "left":"assets/ads/simulate-ad-change/3-a-l.png",
            "right":"assets/ads/simulate-ad-change/3-a-r.png",
            "bottom":"assets/ads/simulate-ad-change/3-a.png"
            },
        "b": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
        "c": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
    },{ // gs=4
        "a": {
            "left":"assets/ads/simulate-ad-change/4-a-l.png",
            "right":"assets/ads/simulate-ad-change/4-a-r.png",
            "bottom":"assets/ads/simulate-ad-change/4-a.png"
            },
        "b": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
        "c": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
    },{ // gs=5
        "a": {
            "left":"assets/ads/simulate-ad-change/5-a-l.png",
            "right":"assets/ads/simulate-ad-change/5-a-r.png",
            "bottom":"assets/ads/simulate-ad-change/5-a.png"
            },
        "b": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
        "c": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
    },{ // gs=6
        "a": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
        "b": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
        "c": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
    },{ // gs=7
        "a": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
        "b": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
        "c": {
            "left":"changeme",
            "right":"changeme",
            "bottom":"changeme"
            },
    }
]

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
                // ad_bottom.attr("src",file_location+"1-"+game_id+"-"+selected_radio+fileType)

                ad_bottom.attr("src",ad_src[0][game_id-1][selected_radio])
                localStorage.setItem("Q1_gameID",game_id)
                localStorage.setItem("Q1_radio",selected_radio)
                // localStorage.setItem("Q1_choice","["+game_id-1+"]."+selected_radio)
            }
            else {
                // var Q1_choice = localStorage.getItem("Q1_choice")
                // ad_bottom.attr("src",file_location+"1-"+Q1_choice+fileType)

                var Q1_gameID = localStorage.getItem("Q1_gameID")
                var Q1_radio = localStorage.getItem("Q1_radio")
                ad_bottom.attr("src",ad_src[0][Q1_gameID-1][Q1_radio])
            }
            break
        case 2:
            // alert("case 2")
            //bottom換成case 1 的
            // var Q1_choice = localStorage.getItem("Q1_choice")
            // ad_bottom.attr("src",file_location+"1-"+Q1_choice+fileType)

            var Q1_gameID = localStorage.getItem("Q1_gameID")
            var Q1_radio = localStorage.getItem("Q1_radio")
            ad_bottom.attr("src",ad_src[0][Q1_gameID-1][Q1_radio])

            //判斷是第一次換還是第二次
            if (localStorage.getItem("Q2") == null) {
                // ad_left.attr("src",file_location+"2-"+game_id+"-"+selected_radio+"-l"+fileType)
                // ad_right.attr("src",file_location+"2-"+game_id+"-"+selected_radio+"-r"+fileType)

                ad_left.attr("src",ad_src[1][game_id-1][0][selected_radio]) //ad_src[gs][gID][0=left].a;
                ad_right.attr("src",ad_src[1][game_id-1][1][selected_radio]) //bug
                localStorage.setItem("Q2",1)
                localStorage.setItem("Q2_game_id",game_id)
            }
            else {
                var Q2_game_id = parseInt(localStorage.getItem("Q2_game_id"))
                ad_left.attr("src",ad_src[1][Q2_game_id-1][0][selected_radio])
                ad_right.attr("src",ad_src[1][Q2_game_id-1][1][selected_radio])

                // ad_left.attr("src",file_location+"2-"+Q2_game_id+"-"+selected_radio+"-l"+fileType)
                // ad_right.attr("src",file_location+"2-"+Q2_game_id+"-"+selected_radio+"-r"+fileType)
            }
            break
        case 3: case 4: case 5: case 6:
            // alert("case 3up")
            // ad_left.attr("src",file_location+game_session+"-"+selected_radio+"-l"+fileType)
            // ad_right.attr("src",file_location+game_session+"-"+selected_radio+"-r"+fileType)
            // ad_bottom.attr("src",file_location+game_session+"-"+selected_radio+fileType)

            ad_left.attr("src",ad_src[game_session-1][selected_radio].left)
            ad_right.attr("src",ad_src[game_session-1][selected_radio].right)
            ad_bottom.attr("src",ad_src[game_session-1][selected_radio].bottom)
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
