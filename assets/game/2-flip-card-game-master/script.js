const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let time = document.getElementById('timer').innerText;
let score = parseInt(document.getElementById('count').innerText);
let result = document.getElementById('result').innerText;


function gameStart() {
    // $('#startScreen').css('display', 'none');
    $('#startScreen').hide();
    $('#score-panel').css('display', 'flex');
    $('#memory-game').css('display', 'flex');
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();

}

cards.forEach(card => card.addEventListener('click', flipCard));

function checkForMatch() {
    // 如果牌組配對成功 => isMatch
    // 就不可以再點擊那組牌 => disableCards()
    // 配對錯誤就把該牌組蓋起來 => unflipCards()
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // 移除監聽事件，釋放記憶體
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    plusOne();
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    // 把牌蓋起來
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function plusOne(){
    score+=1;
    if(score===6){
        document.getElementById("result").innerHTML = "YOU WIN";
        $('#gameEnd').css('display', 'block');
        $('#score-panel').css('display', 'none');
        $('#memory-game').css('display', 'none');
    }
    document.getElementById('count').innerHTML = score;
    
}


//IIFE：script執行後馬上執行shuffle函式
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

var downloadTimer = setInterval(function(){
  if(time <= 0){
    clearInterval(downloadTimer);
    gameEnd();
  }
  document.getElementById("timer").innerHTML = time;
  time -= 1;
}, 1000);

// gameEnd();

function gameEnd() {
    if(score === 6){
        console.log("win");
        document.getElementById("result").innerHTML = "YOU WIN";
        $('#gameEnd').css('display', 'block');
        $('#score-panel').css('display', 'none');
        $('#memory-game').css('display', 'none');
    }else{
        console.log('lose');
        document.getElementById("result").innerHTML = " YOU LOSE";
        $('#gameEnd').css('display', 'block');
        $('#score-panel').css('display', 'none');
        $('#memory-game').css('display', 'none');
    }
}