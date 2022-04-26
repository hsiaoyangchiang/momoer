const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const documentWidth = $(document).width()
const documentHeight = $(document).height()

canvas.style.width = documentWidth+"px"
canvas.style.height = documentHeight+"px"
canvas.width = documentWidth
canvas.height = documentHeight

const div_end = $("div#div-end")
const hack_section1 = $("section.hack-display-1")
const hack_section2 = $("section.hack-display-2")
const div_countdown = $("div.countdown-text")
const glitchElements = document.getElementsByClassName("glitch-text")

let rectSize = 60
let column = Math.round(documentWidth/rectSize)
let row = Math.round(documentHeight/rectSize)
let totalBlock = column*row

// console.log("total block ",column,row,totalBlock)

var blockArr = []
function drawGrid() {
    var posX = 0
    var posY = 0
    for(let i=0; i<row; i++) {
        posY = i * rectSize
        for(let j=0; j<column; j++) {
            posX = j * rectSize
            // ctx.strokeRect(posX, posY, rectSize, rectSize)
            var block = {
                "posX": posX,
                "posY": posY
            }
            blockArr.push(block)
        }
    }
}

// console.log(blockArr)

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //含頭不含尾
}

function drawRect(x,y) {
    ctx.fillStyle = "#000"
    ctx.fillRect(x, y, rectSize, rectSize)
}

let centerX = Math.round(column/2) //no.12 block
let centerY = Math.round(row/2) //no.6 block

function pixelBlackOut() {
    return new Promise((resolve, reject) => {
        var filledBlock = 1
        var i = setInterval(function(){
            var x = getRandomInt(0, blockArr.length)
            drawRect(blockArr[x].posX,blockArr[x].posY)
            blockArr.splice(x, 1)
            filledBlock++
            // console.log(filledBlock)
            if(filledBlock > totalBlock) {
                clearInterval(i)
                resolve("blacked out")
                // alert("done")
            }
        }, 2)
    })
}

let maskSize = 10
let maskColumn = Math.round(documentWidth/maskSize)
let maskRow = Math.floor(documentHeight/maskSize) //因為下面需要留黑的格數，因此不需要進位（不要求填滿）
let totalMask = maskColumn*maskRow
// console.log("total mask ",maskColumn,maskRow,totalMask)
var maskArr = []

let maskTop = Math.floor(documentHeight/20)+20
let maskRandomRows = maskRow-maskTop
// console.log("random rows",maskRandomRows)
// console.log("Top, Bottom ",maskTop,maskRandomRows)

function maskRect(x,y) {
    ctx.clearRect(x, y, maskSize, maskSize)
}

function randomMask() {
    return new Promise((resolve, reject) => {
        var maskBlockRow = 0
        var randomBlockNum = 1
        var randomBlockArr = []
        var i = setInterval(function(){
            //隨機取一行中的幾個block來清除，清除的數量根據 maskBlockRow
            var arr = []

            //決定清除的隨機數量
            var times = 5 - Math.round(maskBlockRow/5) //倍率
            // randomBlockNum = Math.floor((getRandomInt(1,5) * times * maskColumn)/10)
            randomBlockNum = Math.exp(-1*maskBlockRow)*maskColumn*10
            if(randomBlockNum >= (documentWidth/2)) {
                randomBlockNum = randomBlockNum*(getRandomInt(1,5)/10)
            } else if(randomBlockNum < 100){
                randomBlockNum = randomBlockNum*getRandomInt(1,5)*3
            }
            // console.log(randomBlockNum)

            //根據隨機數量，清除格子
            //current row = maskTop+maskBlockRow
            for(var j=0; j<randomBlockNum; j++) {
                var posX = getRandomInt(0,maskColumn+1)*10 //0~144間取一格要清除的
                arr.push(posX)
                maskRect(posX,(maskTop+maskBlockRow)*10)
            }
            randomBlockArr.push(randomBlockNum)
            // console.log("randomBlockNum ",randomBlockNum)
            // console.log(arr)
            maskBlockRow++
            if(maskBlockRow > maskRandomRows) {
                clearInterval(i)
                // alert("done")
                resolve("randomBlockNum ",randomBlockArr)
            }
        }, 60)
    })
}

function clearLine() {
    return new Promise((resolve, reject) => {
        var posY = 0
        var i = setInterval(function(){
            ctx.clearRect(0, posY, documentWidth, maskSize)
            posY += maskSize
            if(posY > maskTop*maskSize) {
                clearInterval(i)
                resolve("mask done")
            }
        }, 80)
    })
}

function showFace() {
    var img_url = localStorage.getItem('imgURL')
    $("img#hack-face").show()
    $("img#hack-face").attr("src",img_url)
    // $("img#hack-face").attr("src","image.jpg")
}

// Play the logout screen
drawGrid()
pixelBlackOut().then((resolve) => {
    console.log(resolve)
    showFace()
    hack_section1.fadeIn()

    setTimeout(function() {
        //Print out image
        setTimeout(function() {
            hack_section2.show()
            for(i=0;i<glitchElements.length;i++) {
                glitch(i,(i+2)*10)
            }
        },0)
        clearLine().then((resolve) => {
            console.log(resolve)
            randomMask().then((resolve) => {
                console.log(resolve)

                setTimeout(function(){
                    div_countdown.show()
                    let hack_time = 9
                    const hackCountdown = setInterval(() => {
                        $("span#hack-countdown").text(hack_time)
                        hack_time -= 1
                    }, 1000)
                    
                    setTimeout(function() {
                        // div_end.hide()
                        console.log("times up")
                        localStorage.clear()
                        clearInterval(hackCountdown)
                        ctx.fillStyle = "#000"
                        ctx.fillRect(0,0,documentWidth,documentHeight)
                        window.location = "../main.php"
                        alert("請移動至下個區域")
                    },10000)
                },1000)
            })
        })
    },1000)
})


//Glitch text
const chars = ["☺","Σ","×","Π","#","-","_","¯","→","↓","↑","←","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let originalTextArray = ["hey,","you're","uploaded"] //Original text

function randomCharGlitch(array) {
    for(i=0; i<array.length; i++) {
        array[i] = chars[getRandomInt(0,chars.length)]
    }
    return array
}

function glitch(i,sec) {
    let count = 1
    const glitchInterval = setInterval(function() {
        var glitchTextArr = randomCharGlitch(glitchElements[i].innerText.split(""))
    
        //將glitch文字換進html中
        glitchText = glitchTextArr.join("")
        
        glitchElements[i].innerText = glitchText
        count++
        if(count == sec) {
            // console.log("done")
            clearInterval(glitchInterval)
            glitchElements[i].innerText = originalTextArray[i]
        }
    },60)
}

function typeWriter(i,speed) {
    if (i < dataLength) {
      document.getElementById("demo").innerHTML += data.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
}

function ajax_username(){
    return $.ajax({
        url:"../php/session.php",
        success: function(data) {
            // var username = JSON.parse(data).username
            var username = "LiliBunny"
            callback(username)
        }
    })
}
function ajax_duration(){
    return $.ajax({
        url:"../php/ending.php",
        success: function(data) {
            // var duration = data
            var duration = 60
            callback(duration)
        }
    })
}
function callback(response) {
    username = response
    console.log("username:",username)
}

Promise.all([ajax_username()]).then(() => {
    callback(response)
}).catch(() => {
})

// typeWriter(0,50)