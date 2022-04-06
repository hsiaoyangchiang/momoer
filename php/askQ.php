<?php
session_start();
include("../pdoInc.php");

if(isset($_SESSION['askQuestion'])) {
    if($_SESSION['askQuestion'] == 0) {
        // echo "<script>var askQuestion = 0</script>";
        $_SESSION['askQuestion'] = 1;
        echo 0;
    }else {
        // echo "要顯示問題";
        // echo "<script>var askQuestion = 1</script>";
        echo 1;
    }
}

?>