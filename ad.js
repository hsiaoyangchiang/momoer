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
            "a":"https://media.giphy.com/media/KhAWTLQgSQD8BXw1Dp/giphy.gif",
            "b":"https://media.giphy.com/media/D05iVTqs2qb2otgvol/giphy.gif",
            "c":"https://media.giphy.com/media/gcvtjNgvq19Z0UIfK0/giphy.gif",
            d:"https://media.giphy.com/media/5P5gfiiwS3j1u5yYOQ/giphy.gif"
        },{
            "a":"12a",
            "b":"12b",
            "c":"12c",
            d:"12d"
        },{
            "a":"https://media.giphy.com/media/WOFTdYwhsOvnmIeKXT/giphy.gif",
            "b":"https://media.giphy.com/media/7s1jN5iTg8NbUe1oNy/giphy.gif",
            "c":"https://media.giphy.com/media/TDztk48cjcCwNc2shp/giphy.gif",
            d:"https://media.giphy.com/media/rFuVdKoELZqmIISu8y/giphy.gif"
        },{
            "a":"https://media.giphy.com/media/ZGiW18jWdsFFYQq1zS/giphy.gif",
            "b":"https://media.giphy.com/media/tjxiusbBJCehWmUssp/giphy.gif",
            "c":"https://media.giphy.com/media/3oLQHG8GB3XFplyjSj/giphy.gif",
            d:"https://media.giphy.com/media/t0dArF99d0s2h8fiXy/giphy.gif"
        },{
            "a":"15a",
            "b":"15b",
            "c":"15c",
            d:"15d"
        },{
            "a":"https://media.giphy.com/media/yUMTSU98fPe4Jal46s/giphy.gif",
            "b":"https://media.giphy.com/media/yUMTSU98fPe4Jal46s/giphy.gif",
            "c":"https://media.giphy.com/media/yUMTSU98fPe4Jal46s/giphy.gif",
            d:"https://media.giphy.com/media/liSEyYfR281hFtDGK7/giphy.gif"
        },{
            "a":"17a",
            "b":"17b",
            "c":"17c",
            d:"17d"
        },{
            "a":"18a",
            "b":"18b",
            "c":"18c",
            d:"18d"
        },{
            "a":"https://media.giphy.com/media/i4Jk1n4xpLSP8mbQSZ/giphy.gif",
            "b":"https://media.giphy.com/media/qqQm2wg06J34WNvCRd/giphy.gif",
            "c":"https://media.giphy.com/media/B5ZOnrJmtkqpiWcnL4/giphy.gif",
            d:"https://media.giphy.com/media/nsi5O6O2iqpRFZ3KZv/giphy.gif"
        }
    ],
    [ // gs=2
        [ //left
            {
                "a":"https://media.giphy.com/media/anq55IAPhqhRZgrMME/giphy.gif",
                "b":"https://media.giphy.com/media/QQvnlEAVSLOG5AvlYL/giphy.gif",
                "c":"https://media.giphy.com/media/anq55IAPhqhRZgrMME/giphy.gif",
                d:"https://media.giphy.com/media/QQvnlEAVSLOG5AvlYL/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/a0Gc9Ku2nwKDZQ0NI2/giphy.gif",
                "b":"https://media.giphy.com/media/sPLeFqEteL30bfdYcA/giphy.gif",
                "c":"https://media.giphy.com/media/EOEhifUjjozQsRrTYr/giphy.gif",
                d:"https://media.giphy.com/media/14DTLRI3GimnEoCSlu/giphy.gif"
            },{
                "a":"assets/ads/simulate-ad-change/2-1-a-l.png",
                "b":"23bl",
                "c":"23cl",
                d:""
            },{
                "a":"a",
                "b":"b",
                "c":"c",
                d:""
            },{
                "a":"https://media.giphy.com/media/dC5Jp5C8dEDd9tCwO6/giphy.gif",
                "b":"https://media.giphy.com/media/RfQExilOXtxQizNjE8/giphy.gif",
                "c":"https://media.giphy.com/media/EOEhifUjjozQsRrTYr/giphy.gif",
                d:"https://media.giphy.com/media/aBd3tLlXirHQjBVC8D/giphy.gif"
            },{
                "a":"a",
                "b":"b",
                "c":"c",
                d:""
            },{
                "a":"https://media.giphy.com/media/R7hQVr34OFtric2Xnu/giphy.gif",
                "b":"https://media.giphy.com/media/R7hQVr34OFtric2Xnu/giphy.gif",
                "c":"https://media.giphy.com/media/R7hQVr34OFtric2Xnu/giphy.gif",
                d:"https://media.giphy.com/media/R7hQVr34OFtric2Xnu/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/3v0bh1YK0tj5Pkx4bf/giphy.gif",
                "b":"https://media.giphy.com/media/N0UFs7tHD4RHuJiVsR/giphy.gif",
                "c":"https://media.giphy.com/media/Yx5U3Mo8XDIs9sqoLY/giphy.gif",
                d:"https://media.giphy.com/media/b2dvRIndSgZI79D28u/giphy.gif"
            },{
                "a":"a",
                "b":"b",
                "c":"c",
                d:""
            }
        ],[ //right
            {
                "a":"https://media.giphy.com/media/Kh2zttX7Oz5VXebKWn/giphy.gif",
                "b":"https://media.giphy.com/media/BCoLuTaIqo25Cmi6AI/giphy.gif",
                "c":"https://media.giphy.com/media/Kh2zttX7Oz5VXebKWn/giphy.gif",
                d:"https://media.giphy.com/media/BCoLuTaIqo25Cmi6AI/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/bs7O9ipQtwqm6M5bgb/giphy.gif",
                "b":"https://media.giphy.com/media/GticnGkqCNuvA8Yb9z/giphy.gif",
                "c":"https://media.giphy.com/media/nak3cMKhtJYNPtxTH1/giphy.gif",
                d:"https://media.giphy.com/media/78jhkpT5KuZ8xQlSSM/giphy.gif"
            },{
                "a":"assets/ads/simulate-ad-change/2-1-a-r.png",
                "b":"23br",
                "c":"23cr",
                d:""
            },{
                "a":"a",
                "b":"b",
                "c":"c",
                d:""
            },{
                "a":"https://media.giphy.com/media/GbU4DlMpjBiUqnXV9q/giphy.gif",
                "b":"https://media.giphy.com/media/2DKWltAlXhQd4QW72T/giphy.gif",
                "c":"https://media.giphy.com/media/nak3cMKhtJYNPtxTH1/giphy.gif",
                d:"https://media.giphy.com/media/ak9fbR5b9EJziT0upi/giphy.gif"
            },{
                "a":"a",
                "b":"b",
                "c":"c",
                d:""
            },{
                "a":"https://media.giphy.com/media/bvttqbDUpxngTm5kRy/giphy.gif",
                "b":"https://media.giphy.com/media/bvttqbDUpxngTm5kRy/giphy.gif",
                "c":"https://media.giphy.com/media/bvttqbDUpxngTm5kRy/giphy.gif",
                d:"https://media.giphy.com/media/bvttqbDUpxngTm5kRy/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/4b4ahINyCcs0U1pIVP/giphy.gif",
                "b":"https://media.giphy.com/media/5uT7u3GUIyqxbZgh8D/giphy.gif",
                "c":"https://media.giphy.com/media/llJcy7hoJzae7FbWN0/giphy.gif",
                d:"https://media.giphy.com/media/tVXbJhFnBdEEkk90dv/giphy.gif"
            },{
                "a":"a",
                "b":"b",
                "c":"c",
                d:""
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
        "d": {
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
        "d": {
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
        "d": {
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
        "d": {
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