const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let time = document.getElementById('timer').innerText;
let score = 0;
// console.log(time);




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
    score+=1;
    console.log(score);

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


//IIFE：script執行後馬上執行shuffle函式
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

// function timer(){
//     time -= 1;
//     // console.log(time);
//     document.getElementById("timer").innerHTML = time;
//     if(time === 0){
//         // window.alert('timesup');
//         // document.getElementById("timer").innerHTML = "0";
//         // time = 0;
//         // return false;
//         // return time;
//         clearInterval(timer);
//     }
// }
// setInterval(timer, 1000);
// winOrNot();
// var timeleft = 10;
var downloadTimer = setInterval(function(){
  if(time <= 0){
    clearInterval(downloadTimer);
    winOrNot();
  }
  document.getElementById("timer").innerHTML = time;
  time -= 1;
}, 1000);

function winOrNot(){
    if(score===8){
        window.alert('you win');
    }else{
        window.alert('you lose');
    }
}