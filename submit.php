<?php
require_once"pdoInc.php";
session_start();
$username = $_SESSION['username'];

//未註冊不得玩遊戲
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true) {
        // echo "你好，".$_SESSION['nickname'];
        // echo $_SESSION['username'];
}else{
    echo "<script> {window.alert('未註冊不得玩遊戲');location.href='signup.html'} </script>";
}

//未答題前的amount：$beforeAmount
if(!isset($beforeAmount)){
    $sql = "SELECT id, amount FROM Game WHERE username = '{$username}'";
    $stmt = $dbh->prepare($sql);
    $stmt ->execute(array());
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if(isset($row['amount'])){
        $beforeAmount = $row['amount'];
        // echo "未答題前遊戲次數:".$beforeAmount."<br>";
    }
}
$ans = $_POST['selected_radio'];
// echo $ans;
//把post來的答案放入$ans
if(isset($_POST['selected_radio'])){
    // echo "答案：".$ans."<br>";
}


if(isset($ans)){
    $afterAmount = $beforeAmount+1;
    for($afterAmount; $afterAmount<8; $afterAmount++){
        // echo "送出後遊戲次數:".$afterAmount."<br>";
        break;
    }
}
if(isset($afterAmount)){
    $sql = "UPDATE Game SET Q{$afterAmount} = '{$ans}', amount = '{$afterAmount}' WHERE username = '{$username}' ";
    $stmt = $dbh->prepare($sql);
    $stmt->execute(array());
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $_SESSION['askQuestion'] = 0;
    // print_r($row);
    // echo "加入成功";
}

// echo $_SESSION['askQuestion'];


// $_REQUEST["s"]=$afterAmount;

// $data[] = 

echo $afterAmount;

// echo "<script> {location.href='game.php?game_id=1'} </script>";
// echo $afterAmount;

?>