<?php
    require_once"../pdoInc.php";
    session_start();
    $username = $_SESSION['username'];
    $test1 = filter_var($_POST['gamePlayed'], FILTER_VALIDATE_BOOLEAN);

    if(isset($username) && isset($test1)){
        $sql = "UPDATE Game SET test1 = '$test1' WHERE username='$username'";
        $stmt= $dbh->prepare($sql);
        $stmt->bindParam(":test1", $test1);
        if($stmt->execute()){
            echo"成功加入心測";
                    // echo "data is saved into database".$_POST['gamePlayed'];
        }
        unset($stmt);
    }
?>