var url = localStorage.getItem('imgURL')
console.log(url)

function hack() {
    $("img#hack-face").show()

    $("img#hack-face").attr("src",url)

    //Countdown and redirect to logout page
    let hack_time = 9
    setInterval(() => {
        $("span#hack-countdown").text(hack_time)
        hack_time -= 1
    }, 1000);
    
    setTimeout(function() {
        console.log("times up")
        localStorage.clear();
        window.location = "main.php"
    },10000)
}

