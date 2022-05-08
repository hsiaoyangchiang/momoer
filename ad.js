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
            "a":"https://media.giphy.com/media/F2sQ7dhdF5iVtm7NNC/giphy.gif",
            "b":"https://media.giphy.com/media/6FL8YdmAlW0AMkc1c9/giphy.gif",
            "c":"https://media.giphy.com/media/qM0X5XZcEYdBGw1BBF/giphy.gif",
            d:"https://media.giphy.com/media/oEVrjUDPZz1nlMqUAh/giphy.gif"
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
            "a":"https://media.giphy.com/media/PlxEFk6E76jD2x0pih/giphy.gif",
            "b":"https://media.giphy.com/media/PWnPW0BD7d9njOYSeU/giphy.gif",
            "c":"https://media.giphy.com/media/WDTBKet0H6hwtFrT9c/giphy.gif",
            d:"https://media.giphy.com/media/7FmZUmuXDYtrlXzRD2/giphy.gif"
        },{
            "a":"https://media.giphy.com/media/yUMTSU98fPe4Jal46s/giphy.gif",
            "b":"https://media.giphy.com/media/yUMTSU98fPe4Jal46s/giphy.gif",
            "c":"https://media.giphy.com/media/yUMTSU98fPe4Jal46s/giphy.gif",
            d:"https://media.giphy.com/media/liSEyYfR281hFtDGK7/giphy.gif"
        },{
            "a":"https://media.giphy.com/media/aBm6r4H8GCdCvRfB7e/giphy.gif",
            "b":"https://media.giphy.com/media/MRKJ0V7G5L3mCIKzoQ/giphy.gif",
            "c":"https://media.giphy.com/media/vY8Wk2LVzkMQnzA4GN/giphy.gif",
            d:"https://media.giphy.com/media/69Z8K4B4x2F6i9rMQJ/giphy.gif"
        },{
            "a":"https://media.giphy.com/media/f0nd0VTYsw8SYiXstV/giphy.gif",
            "b":"https://media.giphy.com/media/Ug5Cy028cUmcRl68eO/giphy.gif",
            "c":"https://media.giphy.com/media/oPyhoj0tDe3ux0gzdt/giphy.gif",
            d:"https://media.giphy.com/media/ievJ1stazRXh5CMXUw/giphy.gif"
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
                "a":"https://media.giphy.com/media/BZ87wEUtvwZZ3Swjmc/giphy.gif",
                "b":"https://media.giphy.com/media/JebQyLCpcdAkovnnOe/giphy.gif",
                "c":"https://media.giphy.com/media/0vD5TB79exTdswXpdb/giphy.gif",
                d:"https://media.giphy.com/media/WWIOIoFws4YJQkw5jR/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/x2y9NbqRlKPVtEiQI3/giphy.gif",
                "b":"https://media.giphy.com/media/LMheIzS50umYuZRCqU/giphy.gif",
                "c":"https://media.giphy.com/media/JutzNo8zYn9DyW73zc/giphy.gif",
                d:"https://media.giphy.com/media/1PPHMhfWjaGHYaPu5y/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/dC5Jp5C8dEDd9tCwO6/giphy.gif",
                "b":"https://media.giphy.com/media/RfQExilOXtxQizNjE8/giphy.gif",
                "c":"https://media.giphy.com/media/EOEhifUjjozQsRrTYr/giphy.gif",
                d:"https://media.giphy.com/media/aBd3tLlXirHQjBVC8D/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/UExcd6QtYUYiW3h469/giphy.gif",
                "b":"https://media.giphy.com/media/WnCibE6Gx8Jlj0GSLF/giphy.gif",
                "c":"https://media.giphy.com/media/SmH5qpIv10jLwgg0Yf/giphy.gif",
                d:"https://media.giphy.com/media/0nyaKnf9QixZ4nDzp5/giphy.gif"
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
                "a":"https://media.giphy.com/media/vQbnjGcG4Me81OY5wG/giphy.gif",
                "b":"https://media.giphy.com/media/SJBbP3gkkjf0vJP3P0/giphy.gif",
                "c":"https://media.giphy.com/media/X7KDDplozGX6cqGNcE/giphy.gif",
                d:"https://media.giphy.com/media/2HpsDjQdhGQLABwqtz/giphy.gif"
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
                "a":"https://media.giphy.com/media/BZ87wEUtvwZZ3Swjmc/giphy.gif",
                "b":"https://media.giphy.com/media/JebQyLCpcdAkovnnOe/giphy.gif",
                "c":"https://media.giphy.com/media/0vD5TB79exTdswXpdb/giphy.gif",
                d:"https://media.giphy.com/media/WWIOIoFws4YJQkw5jR/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/x2y9NbqRlKPVtEiQI3/giphy.gif",
                "b":"https://media.giphy.com/media/LMheIzS50umYuZRCqU/giphy.gif",
                "c":"https://media.giphy.com/media/JutzNo8zYn9DyW73zc/giphy.gif",
                d:"https://media.giphy.com/media/1PPHMhfWjaGHYaPu5y/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/GbU4DlMpjBiUqnXV9q/giphy.gif",
                "b":"https://media.giphy.com/media/2DKWltAlXhQd4QW72T/giphy.gif",
                "c":"https://media.giphy.com/media/nak3cMKhtJYNPtxTH1/giphy.gif",
                d:"https://media.giphy.com/media/ak9fbR5b9EJziT0upi/giphy.gif"
            },{
                "a":"https://media.giphy.com/media/UExcd6QtYUYiW3h469/giphy.gif",
                "b":"https://media.giphy.com/media/WnCibE6Gx8Jlj0GSLF/giphy.gif",
                "c":"https://media.giphy.com/media/SmH5qpIv10jLwgg0Yf/giphy.gif",
                d:"https://media.giphy.com/media/0nyaKnf9QixZ4nDzp5/giphy.gif"
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
                "a":"https://media.giphy.com/media/vQbnjGcG4Me81OY5wG/giphy.gif",
                "b":"https://media.giphy.com/media/SJBbP3gkkjf0vJP3P0/giphy.gif",
                "c":"https://media.giphy.com/media/X7KDDplozGX6cqGNcE/giphy.gif",
                d:"https://media.giphy.com/media/2HpsDjQdhGQLABwqtz/giphy.gif"
            }
        ]
    ],{ // gs=3
        "a": {
            "left":"https://media.giphy.com/media/BOVqTwVJwpjzpn9Rar/giphy.gif",
            "right":"https://media0.giphy.com/media/YRFG90ARkForo230Oq/giphy.gif?cid=790b7611692437e1dd29131679c589acabf33d45908b68c0&rid=giphy.gif&ct=g",
            "bottom":"https://media.giphy.com/media/ydbJqss0VorusimKvS/giphy.gif"
            },
        "b": {
            "left":"https://media.giphy.com/media/BOVqTwVJwpjzpn9Rar/giphy.gif",
            "right":"https://media0.giphy.com/media/YRFG90ARkForo230Oq/giphy.gif?cid=790b7611692437e1dd29131679c589acabf33d45908b68c0&rid=giphy.gif&ct=g",
            "bottom":"https://media.giphy.com/media/ydbJqss0VorusimKvS/giphy.gif"
            },
        "c": {
            "left":"https://media0.giphy.com/media/wdePsXlzwH1gH7CUiW/giphy.gif?cid=790b76114f22ff65f8cddd1b662522a11f7f9b5ce29e1d10&rid=giphy.gif&ct=g",
            "right":"https://media4.giphy.com/media/Kv6IvVX6bfRiuMEkhX/giphy.gif?cid=790b7611af49cda5a49ff729cbe6b56c89903245e2910b7a&rid=giphy.gif&ct=g",
            "bottom":"https://media.giphy.com/media/ydbJqss0VorusimKvS/giphy.gif"
            },
        "d": {
            "left":"https://media0.giphy.com/media/wdePsXlzwH1gH7CUiW/giphy.gif?cid=790b76114f22ff65f8cddd1b662522a11f7f9b5ce29e1d10&rid=giphy.gif&ct=g",
            "right":"https://media4.giphy.com/media/Kv6IvVX6bfRiuMEkhX/giphy.gif?cid=790b7611af49cda5a49ff729cbe6b56c89903245e2910b7a&rid=giphy.gif&ct=g",
            "bottom":"https://media.giphy.com/media/ydbJqss0VorusimKvS/giphy.gif"
            },
    },{ // gs=4
        "a": {
            "left":"https://media.giphy.com/media/aNm5pOhdaxNVS5RrLD/giphy.gif",
            "right":"https://media.giphy.com/media/aNm5pOhdaxNVS5RrLD/giphy.gif",
            "bottom":"https://media.giphy.com/media/I0iC2fQptubxPJjoRQ/giphy.gif"
            },
        "b": {
            "left":"https://media.giphy.com/media/lzppIRDs0vQYVGcgMk/giphy.gif",
            "right":"https://media.giphy.com/media/lzppIRDs0vQYVGcgMk/giphy.gif",
            "bottom":"https://media.giphy.com/media/I0iC2fQptubxPJjoRQ/giphy.gif"
            },
        "c": {
            "left":"https://media.giphy.com/media/UyhhdII6qH0pdHPXJl/giphy.gif",
            "right":"https://media.giphy.com/media/UyhhdII6qH0pdHPXJl/giphy.gif",
            "bottom":"https://media.giphy.com/media/I0iC2fQptubxPJjoRQ/giphy.gif"
            },
        "d": {
            "left":"https://media.giphy.com/media/ez7VDaacxDMzWjgIAC/giphy.gif",
            "right":"https://media.giphy.com/media/ez7VDaacxDMzWjgIAC/giphy.gif",
            "bottom":"https://media.giphy.com/media/I0iC2fQptubxPJjoRQ/giphy.gif"
            },
    },{ // gs=5
        "a": {
            "left":"https://media1.giphy.com/media/UrK2FTpkmXm8YadLlM/giphy.gif?cid=790b7611b78b047a3e1804977c909671747912754867cd68&rid=giphy.gif&ct=g",
            "right":"https://media2.giphy.com/media/zN1xMdHsJVHpldz7fx/giphy.gif?cid=790b7611bc834e40f7c5ebed4a6828eb8e637794023f67fd&rid=giphy.gif&ct=g",
            "bottom":"https://media.giphy.com/media/yh2Ds1cqScXoCdhc2s/giphy.gif"
            },
        "b": {
            "left":"https://media4.giphy.com/media/DJAjxbPR2oHUr2kwbD/giphy.gif?cid=790b7611f3a84f04dd0ccca7f956ffb10409128f5f78b8c2&rid=giphy.gif&ct=g",
            "right":"https://media2.giphy.com/media/zN1xMdHsJVHpldz7fx/giphy.gif?cid=790b7611bc834e40f7c5ebed4a6828eb8e637794023f67fd&rid=giphy.gif&ct=g",
            "bottom":"https://media.giphy.com/media/QflFwGQhmlKi1j4QAe/giphy.gif"
            },
        "c": {
            "left":"https://media2.giphy.com/media/cooPRrVy4GEBHBTXZl/giphy.gif?cid=790b761191d8790b467af5b4a2928a1d92876d91b60fb2c4&rid=giphy.gif&ct=g",
            "right":"https://media2.giphy.com/media/zN1xMdHsJVHpldz7fx/giphy.gif?cid=790b7611bc834e40f7c5ebed4a6828eb8e637794023f67fd&rid=giphy.gif&ct=g",
            "bottom":"https://media.giphy.com/media/koaiSJl1pXhIrlKqWL/giphy.gif"
            },
        "d": {
            "left":"https://media1.giphy.com/media/x80wu7Td3kNlAc2h3s/giphy.gif?cid=790b76116a5f01fa179706bcb57217608b936bc2502ea33b&rid=giphy.gif&ct=g",
            "right":"https://media2.giphy.com/media/m1Pa8m24S8CWchPTQR/giphy.gif?cid=790b76113255ad2688e9b49be873ca251f03ec8828c26a41&rid=giphy.gif&ct=g",
            "bottom":"https://media.giphy.com/media/wMzCRuKCSrunOVb2OJ/giphy.gif"
            },
    },{ // gs=6
        "a": {
            "left":"https://media.giphy.com/media/V7rNnyS09zCQpyybAm/giphy.gif",
            "right":"https://media.giphy.com/media/gFflbxeDvQDoBHqvKo/giphy.gif",
            "bottom":"https://media.giphy.com/media/SJbOuLSIwTnG2bYsFm/giphy.gif"
            },
        "b": {
            "left":"https://media.giphy.com/media/OK2Q6t3XvVBhlZnc6v/giphy.gif",
            "right":"https://media.giphy.com/media/gFflbxeDvQDoBHqvKo/giphy.gif",
            "bottom":"https://media.giphy.com/media/zwZLf2i98XntrP5jFC/giphy.gif"
            },
        "c": {
            "left":"https://media.giphy.com/media/1CPaiAvHHPSTFkNcsR/giphy.gif",
            "right":"https://media.giphy.com/media/gFflbxeDvQDoBHqvKo/giphy.gif",
            "bottom":"https://media.giphy.com/media/Elnu3xO4V1boyCFMgG/giphy.gif"
            },
        "d": {
            "left":"https://media.giphy.com/media/dlljT5oi6WTasVotzr/giphy.gif",
            "right":"https://media.giphy.com/media/gFflbxeDvQDoBHqvKo/giphy.gif",
            "bottom":"https://media.giphy.com/media/yXrkL5IosBey6ajB9r/giphy.gif"
            }
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
                    ad_left.attr("src","https://media.giphy.com/media/Sdu0SlDMhlOlqHuoqH/giphy.gif")
                    ad_right.attr("src","https://media.giphy.com/media/2RpeMI2nbNHEQiv9PN/giphy.gif")
                    ad_bottom.attr("src","https://media.giphy.com/media/JQEOpb8fncJPC485bA/giphy.gif")
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