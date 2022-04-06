var obj = new Object();
var i = 0;
var speed = 50;
var data;
var dataLength;


function ajax1(){
    return $.ajax({
        url:"php/data.php",
        success: function(data) {
            len = JSON.parse(data).length
            for(let i = 0; i<len; i++){
                obj.username = JSON.parse(data)[i].username;
                obj.amount  = JSON.parse(data)[i].amount;
                var jsonString= JSON.stringify(obj);
                // callback(jsonString);
            }
            callback(data);
        }
    })
}
function callback(response) {
    data = response;
    // console.log(typeof(data));
    dataLength = data.length;
    // console.log(data);
}

Promise.all([ajax1()]).then(() => {
    callback(response);
}).catch(() => {
})

typeWriter();


function typeWriter() {
    if (i < dataLength) {
      document.getElementById("demo").innerHTML += data.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
}