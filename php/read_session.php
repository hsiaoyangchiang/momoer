<?php
session_start();
include("../pdoInc.php");

echo "ask question".$_SESSION['askQuestion'];
?>