<?php
    require_once"../pdoInc.php";
    session_start();
    $username = $_SESSION['username'];
    $test1 = filter_var($_POST['gamePlayed1'], FILTER_VALIDATE_BOOLEAN);
    $test2 = filter_var($_POST['gamePlayed2'], FILTER_VALIDATE_BOOLEAN);

    if(isset($username) && isset($test1)){
        $sql = "UPDATE Game SET test1 = '$test1' WHERE username='$username'";
        $stmt= $dbh->prepare($sql);
        $stmt->bindParam(":test1", $test1);
        if($stmt->execute()){
            echo"成功加入心測1";
        }
        unset($stmt);
    }
    if(isset($username) && isset($test2)){
        $sql = "UPDATE Game SET test1 = '$test2' WHERE username='$username'";
        $stmt= $dbh->prepare($sql);
        $stmt->bindParam(":test1", $test2);
        if($stmt->execute()){
            echo"成功加入心測2";
        }
        unset($stmt);
    }
?>