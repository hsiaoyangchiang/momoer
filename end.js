Webcam.set({
    width: 160,
    height: 90,
    image_format: 'jpeg',
    jpeg_quality: 90
})
Webcam.attach( '#my-camera' )

function hack() {
    $("img#hack-face").show()

    //Capture face and show
    Webcam.snap( function(data_uri) {
        // display results in page
        $("img#hack-face").attr("src",data_uri)
        // $("div.hack-face").innerHTML = '<img class="hack-face" src="'+data_uri+'"/>'
        console.log("take snapshot")
        // console.log(data_uri)
    } )
    
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