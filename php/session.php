<?php
session_start();
include("../pdoInc.php");

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true) {
    $user_session = array(
        "loggedin" => $_SESSION['loggedin'],
        "username" => $_SESSION['username'],
        "askQuestion" => $_SESSION['askQuestion']
    );
    echo json_encode( $user_session );
}
?>