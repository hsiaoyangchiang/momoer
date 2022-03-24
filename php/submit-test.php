<?php
    require_once"../pdoInc.php";
    session_start();
    $username = $_SESSION['username'];
    // echo "<script>alert('OAO')</script>";

    if(isset($username) && isset($_POST['gamePlayed'])){
        echo $_POST['gamePlayed'];
        // $sql = "SELECT id, amount FROM Game WHERE username = '{$username}'";
        // $stmt = $dbh->prepare($sql);
        // $stmt ->execute(array());
        // $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // echo "data is saved into database".$_POST['gamePlayed'];
    }
?>