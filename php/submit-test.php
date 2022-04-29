<?php
    require_once"../pdoInc.php";
    session_start();
    $username = $_SESSION['username'];


    if(isset($_POST['gamePlayed1'])){
        $test1 = filter_var($_POST['gamePlayed1'], FILTER_VALIDATE_BOOLEAN);
        $sql = "UPDATE Game SET test1 = '$test1' WHERE username='$username'";
        $stmt= $dbh->prepare($sql);
        if($stmt->execute()){
            echo"成功加入心測1";
        }
        unset($stmt);
    }

    if(isset($_POST['gamePlayed2'])){
        $test2 = filter_var($_POST['gamePlayed2'], FILTER_VALIDATE_BOOLEAN);
        $sql = "UPDATE Game SET test2 = '$test2' WHERE username='$username'";
        $stmt= $dbh->prepare($sql);
        if($stmt->execute()){
            echo"成功加入心測2";
        }
        unset($stmt);
    }

    // if(isset($username) && $test1==true){

    // }
    // if(isset($username) && $test2==true){

    // }
?>