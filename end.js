// End of all games -- show hacked
function load_cam() {
    Webcam.set({
        width: 160,
        height: 90,
        image_format: 'jpeg',
        jpeg_quality: 90
    })
    Webcam.attach( '#my_camera' )
}


function hack() {
    //Capture face and show
    Webcam.snap( function(data_uri) {
        // display results in page
        $("img#hack-face").attr("src",data_uri)
        // $("div.hack-face").innerHTML = '<img class="hack-face" src="'+data_uri+'"/>'
        console.log("take snapshot")
        // console.log(data_uri)
    } )
    
    //Countdown and redirect to logout page
    let hack_time = 10
    setInterval(() => {
        $("span#hack-countdown").text(hack_time)
        hack_time -= 1
    }, 1000);
    
    setTimeout(function() {
        // alert("times up")
    },10000)
}

Webcam.set({
    width: 160,
    height: 90,
    image_format: 'jpeg',
    jpeg_quality: 90
})
Webcam.attach('#my_camera')