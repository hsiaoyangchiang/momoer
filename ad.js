const file_location = "assets/ads/simulate-ad-change/"
const fileType = ".png"
var ad_left = $("#ad-left")
var ad_right = $("#ad-right")
var ad_bottom = $("#ad-bottom")
var game_session = 0 //game session預設為0，將會在第一次回答問題後submit時取代為1
var a = "a"
var b = "a"
var c = "a"

var ad_src = [ // {gs - game_id - selected_radio}
    [ // gs=1
        {
            "a":"11a",
            "b":"11b",
            "c":"11c"
        },{
            "a":"12a",
            "b":"12b",
            "c":"12c"
        },{
            "a":"assets/ads/simulate-ad-change/1-1-a.png",
            "b":"13b",
            "c":"13c"
        },{
            "a":"14a",
            "b":"14b",
            "c":"14c"
        },{
            "a":"15a",
            "b":"15b",
            "c":"15c"
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
                "a":"21a",
                "b":"21b",
                "c":"21c"
            },{
                "a":"22a",
                "b":"22b",
                "c":"22c"
            },{
                "a":"assets/ads/simulate-ad-change/2-1-a-l.png",
                "b":"23bl",
                "c":"23cl"
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
        ],[ //right
            {
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"a",
                "b":"b",
                "c":"c"
            },{
                "a":"assets/ads/simulate-ad-change/2-1-a-r.png",
                "b":"23br",
                "c":"23cr"
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
            "left":"6l",
            "right":"6r",
            "bottom":"6b"
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
    var ad = []

    //從ad.php取得要換的廣告為何
    $.ajax({
        url: 'php/ad.php',
        success: function(data) {
            // alert(data)
            console.log("ad pattern:"+data)
            ad = data
            // console.log(typeof(ad))

            switch(parseInt(game_session)) {
                case 1:
                    // alert("case 1")
                    var db_ad_bottom = ad.split("-")
                    var db_ad_bottom_gameID = parseInt(db_ad_bottom[0])
                    var db_ad_bottom_radio = db_ad_bottom[1]
                    // console.log("db_ad_bottom_gameID"+db_ad_bottom_gameID)
                    // console.log("db_ad_bottom_radio"+db_ad_bottom_radio)
        
                    ad_bottom.attr("src",ad_src[0][db_ad_bottom_gameID-1][db_ad_bottom_radio])
                    break
                case 2:
                    // alert("case 2")
                    var db_ad_bottom = ad.split(",")[0].split("-")
                    var db_ad_bottom_gameID = parseInt(db_ad_bottom[0])
                    var db_ad_bottom_radio = db_ad_bottom[1]
                    // console.log("db_ad_bottom_gameID"+db_ad_bottom_gameID)
                    // console.log("db_ad_bottom_radio"+db_ad_bottom_radio)
        
                    ad_bottom.attr("src",ad_src[0][db_ad_bottom_gameID-1][db_ad_bottom_radio])
        
                    var db_ad_side = ad.split(",")[1].split("-")
                    var db_ad_side_gameID = parseInt(db_ad_side[0])
                    var db_ad_side_radio = db_ad_side[1]
                    // console.log("db_ad_side_gameID"+db_ad_side_gameID)
                    // console.log("db_ad_side_radio"+db_ad_side_radio)
        
                    ad_left.attr("src",ad_src[1][0][db_ad_side_gameID-1][db_ad_side_radio])
                    ad_right.attr("src",ad_src[1][1][db_ad_side_gameID-1][db_ad_side_radio])
        
                    break
                case 3: case 4: case 5: case 6:
                    // alert("case 3up")
                    var db_ad_radio = ad
        
                    ad_left.attr("src",ad_src[game_session-1][db_ad_radio].left)
                    ad_right.attr("src",ad_src[game_session-1][db_ad_radio].right)
                    ad_bottom.attr("src",ad_src[game_session-1][db_ad_radio].bottom)
                    break
                default:
                    ad_left.attr("src","assets/ads/simulate-ad-change/ad-left.png")
                    ad_right.attr("src","assets/ads/simulate-ad-change/ad-right.png")
                    ad_bottom.attr("src","assets/ads/simulate-ad-change/ad-bottom.png")
            }
        }
    })
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

// Leaderboard
const leaderboard_end = $("marquee #end")
const leaderboard = $("marquee #rankings")

updateLeaderboard()
setInterval(function(){
    if(leaderboard_end.position().left <= $("marquee").offset().left) {
        // console.log("update leaderboard")
        updateLeaderboard()
    }
},100)

function updateLeaderboard() {
    var rankings = ""
    $.ajax({
        url:"php/board.php",
        success: function(data) {
            let parsed_data = JSON.parse(data)
            var len = parsed_data.length
            for (let i = 0; i < len ; i++) {
                var user_score = parsed_data[i].username + "\u00A0" + parsed_data[i].score + " ★" + "\t" //&#9733;
                rankings += user_score
            }
            // console.log(rankings)
            leaderboard.text(rankings)
        }
    })
}