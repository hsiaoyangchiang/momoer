window.onload = function() {
	// typeWriter()
	// reloadData()
}

//SECTION - A | TypeWriter
var i = 0
var speed = 50
var data
var dataLength

const terminal_data = document.getElementById("data")
const terminal_ad_pref = document.getElementById("ad-pref")
const documentHeight = $(document).height()
var overflow = 0

window.setInterval(function() {
	var offset_p = terminal_data.offsetTop + terminal_data.offsetHeight
	if(offset_p > (documentHeight-100)) {
		scrollUp()
	}
}, 1)
  
function scrollUp(){
	$('p#data').animate({top:"-=1.1px"}, 34, scrollUp)
}

function getData(){
	return $.ajax({
		url:"../php/data.php",
		success: function(data) {
			len = JSON.parse(data).length
			var arr_user = []
			for(let i = 0; i<len; i++){
				var user = new Object()
				user.id = JSON.parse(data)[i].id
				user.username = JSON.parse(data)[i].username
				user.pwd  = JSON.parse(data)[i].pwd
				user.q1  = JSON.parse(data)[i].q1
				user.q2  = JSON.parse(data)[i].q2
				user.q3  = JSON.parse(data)[i].q3
				user.q4  = JSON.parse(data)[i].q4
				user.q5  = JSON.parse(data)[i].q5
				user.q6  = JSON.parse(data)[i].q6
				user.q7  = JSON.parse(data)[i].q7
				user.amount  = JSON.parse(data)[i].amount

				arr_user.push(user)
			}
			passData(arr_user)
		}
	})
}
var placeholder_question = [
	["ReactionSpeed","PokerType","NearSightedReason","WantedControlPower","LostInTaipei","IfOwnElf","FavTower","WantedTreasure","NextLifeBird"],
	["DogOrCat","MostWishedStore","LeastPreferredColor","A","CantStandInbalance","AtAge42","FavCartoon","HardestThing","FavDuckCuisine"]
]
var placeholder_text = [ //gs-gid-option
    [{ //GS=1
		a:"螳螂",
		b:"貓頭鷹",
		c:"藍鯨",
		d:"樹懶"
	},{
		a:"德州撲克線上手遊",
		b:"拼圖手遊",
		c:"桌遊暢玩",
		d:"Casino線上手遊"
	},{
		a:"認真讀書當學霸",
		b:"追太多劇",
		c:"躲在被子裡看漫畫",
		d:"都是 DNA 的錯"
	},{
		a:"情緒控制",
		b:"聲音控制",
		c:"時間管控",
		d:"食慾控制"
	},{
		a:"從來沒被騙過",
		b:"偶爾一兩次",
		c:"有時候會被騙",
		d:"總是被騙QQ"
	},{
		a:"帶來財運",
		b:"守護愛情",
		c:"保佑健康",
		d:"搗蛋作怪"
	},{
		a:"巴黎鐵塔",
		b:"古夫金字塔",
		c:"比薩斜塔",
		d:"神魔之塔"
	},{
		a:"價值千萬的木乃伊",
		b:"可以回到過去的玉鐲子",
		c:"可以瞬間移動的裹腳布",
		d:"可以聽到別人心中想法的耳耙子"
	},{
		a:"公雞",
		b:"天鵝",
		c:"孔雀",
		d:"烏鴉"
	}
	],[{ //GS=2
		a:"貓貓",
		b:"狗狗",
		c:"披著狗皮的貓",
		d:"披著貓皮的狗"
	},{
		a:"火鍋吃到飽",
		b:"臭豆腐店",
		c:"酒吧",
		d:"服飾店"
	},{
		a:"毛巾",
		b:"雨傘",
		c:"餐具",
		d:"便利貼"
	},{
		a:"蟲洞",
		b:"幽浮",
		c:"外星人",
		d:"隕石"
	},{
		a:"組員簡報畫面圖文比不平衡",
		b:"新耳機左右聲道音量不平衡",
		c:"結束酒精路跑走路不平衡",
		d:"心理不平衡"
	},{
		a:"跟伴侶養了一隻變色龍",
		b:"在南極探險滿 5 年",
		c:"財富自由頭好壯壯",
		d:"地球已經毀滅了"
	},{
		a:"神奇寶貝",
		b:"飛天小女警",
		c:"家庭教師",
		d:"烏龍派出所"
	},{
		a:"想下學期課要選什麼",
		b:"想畢業要做什麼",
		c:"想男女朋友在氣什麼",
		d:"想午餐要吃什麼"
	},{
		a:"薑母鴨",
		b:"烤鴨",
		c:"鴨賞",
		d:"東山鴨頭"
	}],
	{ //GS=3
		a:"5000 以下",
		b:"5000 - 10000",
		c:"10000 - 20000",
		d:"20000 以上"
	},{ //GS=4
		a:"0 個",
		b:"1-2 個",
		c:"3-5 個",
		d:"6 個以上"
	},{ //GS=5
		a:"國中",
		b:"高中",
		c:"大學",
		d:"未來，我目前都不快樂"
	},{ //GS=6
		a:"額頭",
		b:"鼻子",
		c:"眼睛",
		d:"臉型"
	}
]

function passData(response) {
    var array = response;
	var arrLength = array.length
	var formatted_totaldata = ""

	for(let i = 0; i < arrLength; i++){
		var answer = [["NULL",null],["NULL",null],null,null,null,null]
		for(let j = 1; j<7; j++) {
			var data_q = eval(`array[i].q${j}`)
			if(data_q != null) {
				var option = ""
				var game_id = ""
				if(j<=2) {
					option = data_q.split("-").pop()
					game_id = parseInt(data_q.split("-")[0])
					// console.log(eval(`placeholder_text[${j-1}][${game_id}].${option}`))
					var question = eval(`placeholder_question[${j-1}][${game_id-1}]`)
					var ans = eval(`placeholder_text[${j-1}][${game_id-1}]['${option}']`)
					answer[j-1][0] = question
					answer[j-1][1] = ans
				} else {
					option = data_q
					var ans = eval(`placeholder_text[${j-1}].${option}`)
					answer[j-1] = ans
				}
			} else {
				break
			}
		}

		var formatted_data = 
		`let\xa0user-${array[i].id}\xa0=\xa0{
		\xa0\xa0Name: "${array[i].username}",
		\xa0\xa0Password: "${array[i].pwd}",
		\xa0\xa0${answer[0][0]}: "${answer[0][1]}",
		\xa0\xa0${answer[1][0]}: "${answer[1][1]}",
		\xa0\xa0Allowance: "${answer[2]}",
		\xa0\xa0NumberOfPeopleDated: "${answer[3]}",
		\xa0\xa0HappiestTimeInLife: "${answer[4]}",
		\xa0\xa0BestBodyPart: "${answer[5]}",
		\xa0\xa0BucketList: "${array[i].q7}"
		}\r\r`
		formatted_totaldata += formatted_data
	}

	// terminal_data.innerText = formatted_totaldata

	data = formatted_totaldata
	dataLength = data.length
	// terminal_data.innerText = array
	typeWriter()
}

Promise.all([getData()]).then(() => {
}).catch(() => {
})

var record = 0
var word = []
var ad_keyword = [
	"螳螂","貓頭鷹","藍鯨","樹懶","反應類","記憶類","益智類","運氣類","認真讀書當學霸","追太多劇","躲在被子裡看漫畫","都是 DNA 的錯","情緒控制","聲音控制","時間管控","食慾控制","從來沒被騙過","偶爾一兩次","有時候會被騙","總是被騙QQ","帶來財運","守護愛情","保佑健康","搗蛋作怪","巴黎鐵塔","古夫金字塔","比薩斜塔","東京鐵塔","價值千萬的木乃伊","可以回到過去的玉鐲子","可以瞬間移動的裹腳布","可以聽到別人心中想法的耳耙子","公雞","天鵝","孔雀","烏鴉","貓貓","狗狗","披著狗皮的貓","披著貓皮的狗","火鍋吃到飽","臭豆腐店","酒吧","服飾店","毛巾","雨傘","餐具","便利貼","蟲洞","幽浮","外星人","隕石","組員簡報畫面圖文比不平衡","新耳機左右聲道音量不平衡","結束酒精路跑走路不平衡","心理不平衡","跟伴侶養了一隻變色龍","在南極探險滿 5 年","財富自由頭好壯壯","地球已經毀滅了","神奇寶貝","飛天小女警","家庭教師","烏龍派出所","想下學期課要選什麼","想畢業要做什麼","想男女朋友在氣什麼","想午餐要吃什麼","薑母鴨","烤鴨","鴨賞","東山鴨頭","5000 以下","5000 - 10000","10000 - 20000","20000 以上","0 個","1-2 個","3-5 個","6 個以上","國中","高中","大學","未來，我目前都不快樂","額頭","鼻子","眼睛","臉型"
]
var ad_name = [
	"動物語錄-螳螂","動物語錄-貓頭鷹","動物語錄-鯨魚","動物語錄-樹懶",
	"德州撲克線上手遊","拼圖手遊","桌遊暢玩","Casino線上手遊",
	"顧成績葉黃素","追劇葉黃素","漫畫葉黃素","近視葉黃素",
	"情緒管理","唱跳工作坊","時間管理app","飲食管理課",
	"東方智慧導航","東方智慧導航","東方智慧導航","東方智慧導航",
	"開運寶石","開運寶石","開運寶石","派對整人專家",
	'巴黎鐵塔','古夫金字塔','比薩斜塔','東京鐵塔',
	'寶藏獵人','時光旅行','瞬間移動','語音助理',
	"公雞鬧鐘","旅遊套裝行程","孔雀石飾品","全黑服飾配件",

	["貓貓星球","貓皇御膳"],["毛小孩生日派對","狗狗星球"],["貓貓星球","貓皇御膳"],["毛小孩生日派對","狗狗星球"],
	["火鍋吃到飽","不油膩火鍋"],["米其林臭豆腐","舅媽臭豆腐"],["酒吧送shot","台北酒精馬拉松"],["大學生服飾","大學生服飾2"],
	['涼感毛巾','涼感毛巾'],['防風雨傘','防風雨傘'],['質感餐具','質感餐具'],['超黏便利貼','超黏便利貼'],
	['蟲洞奇航手遊','蟲洞奇航手遊'],['高速幽浮手遊','高速幽浮手遊'],['外星有人電影','外星有人電影'],['星際迷航手遊','星際迷航手遊'],
	["完美簡報課","簡報模板庫"],["超抗噪耳機","潮流耳機"],["酒吧送shot","台北酒精馬拉松"],["解煩躁活動","心理心靈書籍"],
	['認養代替購買','認養代替購買'],['極限挑戰-移居南極','極限挑戰-移居南極'],['氣化效應','氣化效應'],['40保險更加值','40保險更加值',],
	["遊樂園懷舊套票","艾瑪茲遊樂園"],["遊樂園懷舊套票","艾瑪茲遊樂園"],["遊樂園懷舊套票","艾瑪茲遊樂園"],["遊樂園懷舊套票","艾瑪茲遊樂園"],
	["成功學必修課","pi型人才必修課"],["畢業生職涯諮詢","新鮮人面試大補帖"],["創意約會活動","魔女占卜"],["美味便當外送","義式餐廳聚餐"],
	['薑母鴨','薑母鴨'],['烤鴨','烤鴨'],['鴨賞快炒','鴨賞快炒'],['東山鴨頭','東山鴨頭'],

	['222人才網','打工求職網','小金額投資'],['222人才網','打工求職網','小金額投資'],['222人才網','申辦信用卡','週年慶特賣'],['222人才網','申辦信用卡','週年慶特賣'],
	['交友配對','婚友社','婚友社'],['交友配對','婚友社','婚友社'],['交友配對','婚友社','婚友社'],['交友配對','婚友社','婚友社'],
	['國中畢旅摩天輪','懷舊玩具市集','同學會新玩法'],['高中熱音社','最佳國中票選','同學會新玩法'],['Disco大學夜店','最佳高中票選','同學會新玩法'],['個性酒吧','最佳大學票選','畢業照拍攝'],
	['額頭除皺拉提術','醫美療程','醫美療程'],['三段隆鼻術','醫美療程','醫美療程'],['無痕提眼瞼術','醫美療程','醫美療程'],['水嫩煥膚療程','醫美療程','醫美療程']
]

function typeWriter() {
    if (i < dataLength) {
		terminal_data.innerText += data.charAt(i)

		if(record == 1) {
			word.push(data.charAt(i))
			// console.log('2')
		}

		if(data.charAt(i) == "\"") {
			if(record == 0) {
				record = 1
			} else {
				var string = word.splice(0,word.length-1).join("")
				changeAd(string)
				word = []
				record = 0
			}
		}
    	i++
    	setTimeout(typeWriter, speed)
    }
	else {
		window.location.reload();
		return
	}
}

function changeAd(string) {
	var index = ad_keyword.indexOf(string)
	if (index != -1) {
		if (index < 36) {
			//Game Session 1, Game ID 1~9
			showAd(ad_name[index])
		} else {
			//Game Session 2~7, Game ID 1~9
			var times = 0
			const runShowAd = setInterval(function(){
				showAd(ad_name[index][times])
				times++
				if(times >= ad_name[index].length) {
					clearInterval(runShowAd)
				}
			}, speed*2)
		}
	}
}

const div_showAd = $("div.show-ad")
function showAd(ad_name) {
	var paragraph = document.createElement("p");
	paragraph.textContent = `changeAd("${ad_name}");`
	div_showAd.append(paragraph)
	
	// setTimeout(function(){
	// 	$("div.show-ad p:first").fadeOut(500)
	// 		.promise().done(function() {
	// 			$("div.show-ad p:first").remove()
	// 	})
	// },speed*10)
}
const fadeOutP = setInterval(function(){
	$("div.show-ad p:first").fadeOut(500)
		.promise().done(function() {
			$("div.show-ad p:first").remove()
	})
},speed*20)



//SECTION - B | GLitch Text

const chars = "☺Σ×Π#-_¯—→↓↑←0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";

var Glitch = function(selector, index, numberOfGlitchedLetter, timeGlitch, timePerLetter, timeBetweenGlitch){
	this.selector = selector;
	this.index = index;
	this.numberOfGlitchedLetter = numberOfGlitchedLetter;
	this.innerText;
	this.charArray = [];
	this.charIndex = [];
	this.timeGlitch = timeGlitch;
	this.timeBetweenGlitch = timeBetweenGlitch;
	this.timePerLetter = timePerLetter;
	this.maxCount = Math.floor(this.timeGlitch/this.timePerLetter);
	this.count = 0;
}

Glitch.prototype.init = function(){
	this.innerText = this.selector.innerText;
	this.charArray = this.innerText.split("");
	if(this.numberOfGlitchedLetter == undefined || this.numberOfGlitchedLetter > this.innerText.length){
		this.numberOfGlitchedLetter = this.innerText.length;
	}
	this.defineCharIndexToRandomize();
}

Glitch.prototype.defineCharIndexToRandomize = function(){
	this.charIndex = [];
	for(let i=0; i<this.numberOfGlitchedLetter; i++){
		let randCharIndex = Math.floor(Math.random() * this.charArray.length);
		this.charIndex.push(randCharIndex);
	}
}

Glitch.prototype.randomize = function(){
	//copy the char array
	let randomString = Array.from(this.charArray);
	
	//randomize char
	for(let i=0; i<this.numberOfGlitchedLetter; i++){
		let randIndex = Math.floor(Math.random() * chars.length);
		let randCharIndex = this.charIndex[i];
		if(randomString[randCharIndex] !== ' '){
			randomString[randCharIndex] = chars[randIndex];
		}
	}
	this.selector.innerText = randomString.join("");
}

Glitch.prototype.update = function(interval){
	if(this.count >= this.maxCount - 1){
		this.selector.innerText = this.innerText;
		this.defineCharIndexToRandomize();
		let ctx = this;
		let wait = setTimeout(function(){
			ctx.count = 0;
		}, this.timeBetweenGlitch);
	}else{
		this.randomize();
		this.count ++;
	}
}

Glitch.prototype.glitch = function(){
	let ctx = this;
	let interval= setInterval(function(){
        ctx.update(this);
      },this.timePerLetter);
}

var arrayElements;
var glitchArray = [];

function initAllGlitch(){
	arrayElements = document.querySelectorAll(".glitch-text");
	for(let i=0; i<arrayElements.length; i++){
		let selector = arrayElements[i];
		let randLetterNumber = 2 + Math.floor(Math.random() * 8);
		let randGlitchTime = 500 + Math.floor(Math.random() * 2500);
		let randGlitchPauseTime = 500 + Math.floor(Math.random() * 2500);
		let glitch = new Glitch(selector, i, randLetterNumber, 200, 65, randGlitchPauseTime);
		glitch.init();
		glitchArray.push(glitch);
	}
}


function update(){
	for(let i=0; i<glitchArray.length; i++){
		let glitch = glitchArray[i];
		glitch.glitch();
	}
}

initAllGlitch();
update();

// SECTION - B | EARNINGS
var dollar_unit = ['','K','M','B','T']
var money = 10
var unit_times = 1

window.setInterval(function() {
	money += 10
	if (money>=Math.pow(1000,unit_times)) {
		unit_times += 1
	}
	$("span#unit").text(dollar_unit[unit_times-1])
	$("span#num").text(money/Math.pow(1000,unit_times-1))
}, 100)
