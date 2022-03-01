$(document).ready(function() {
  //fisher yates shuffling algorithm
  Array.prototype.shuffle = function() {
    let i = this.length,
      j,
      tmp;
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = this[j];
      this[j] = this[i];
      this[i] = tmp;
    }
    return this;
  };
  function loadSrc(src) {
    $("#grid").append(`
      <div class="card">
        <img class="back" src="./images/mona-lisa.jpg" alt="back" />
        <img class="front" src=${src} alt="front" />
      </div>
     `);
  }
  function loadImgs(srcs) {
    let shuffled = srcs.shuffle();
    shuffled.forEach(function(src) {
      loadSrc(src);
    });
  }
  let srcs = [
    "./images/unicef.png",
    "./images/acf.png",
    "./images/alima.jpg",
    "./images/intersos.png",
    "./images/who.jpg",
    "./images/merry.png",
    "./images/icrc.png",
    "./images/wfp.jpg",
    "./images/unicef.png",
    "./images/acf.png",
    "./images/alima.jpg",
    "./images/intersos.png",
    "./images/who.jpg",
    "./images/merry.png",
    "./images/icrc.png",
    "./images/wfp.jpg"
  ];
  loadImgs(srcs);
  $(".progress__restart").on("click", function() {
    location.reload();
  });
  const cards = document.querySelectorAll(".card");

  let hasFlippedCard = false,
    lock = false;

  let firstCard, secondCard;
  function flipACard() {
    if (lock) {
      return;
    }
    if (this === firstCard) {
      return;
    }
    this.classList.add("flip");
    if (!hasFlippedCard) {
      //first click
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
    //second click
    hasFlippedCard = false;
    secondCard = this;
    isMatch();

    // $(this).addClass("flip");
    // if ($isFirst) {
    //   $secondCard = $(this);
    //   let $isSimilar =
    //     $(".front", $firstCard).attr("src") ===
    //     $(".front", $secondCard).attr("src");
    //   if ($isSimilar) {
    //     $firstCard = null;
    //     $secondCard = null;
    //     $($firstCard).removeEventListener("click", flipACard);
    //     $($secondCard).removeEventListener("click", flipACard);
    //   } else {
    //     setTimeout(function() {
    //       $firstCard.removeClass("flip");
    //       $secondCard.removeClass("flip");
    //     }, 1300);
    //   }
    //   $isFirst = !$isFirst;
    // } else {
    //   $firstCard = $(this);
    //   $secondCard = null;
    //   $isFirst = !$isFirst;
    // }
  }
  function isMatch() {
    let isSimilar =
      $(".front", firstCard).attr("src") ===
      $(".front", secondCard).attr("src");

    isSimilar ? disable() : unflip();
  }
  function disable() {
    firstCard.removeEventListener("click", flipACard);
    secondCard.removeEventListener("click", flipACard);
    resetBoard();
  }
  function unflip() {
    lock = true;
    setTimeout(function() {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1300);
  }
  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    [hasFlippedCard, lock] = [false, false];
  }
  cards.forEach(card => card.addEventListener("click", flipACard));
});
