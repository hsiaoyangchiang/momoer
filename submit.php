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

// echo $ans;
//把post來的答案放入$ans
// 最後一題問答題另外存
if(isset($_POST['selected_radio'])){
    $ans = $_POST['selected_radio'];
    // echo $ans; 
}else if(isset($_POST['short_answer'])){
    $short_answer = $_POST['short_answer'];
    $finalAns = htmlspecialchars($short_answer);
}

// if(isset($ans)||isset($finalAns)){
//     // echo "here";
//     $finalAns = htmlspecialchars($POST['short_answer']);
// }



if(isset($ans)||isset($short_answer)){
    $afterAmount = $beforeAmount+1;
    for($afterAmount; $afterAmount<8; $afterAmount++){
        // echo "送出後遊戲次數:".$afterAmount."<br>";
        break;
    }
}

// echo "aA".$afterAmount;
if(isset($_POST['gameID']) && $afterAmount<3){
    $gameID = $_POST['gameID'];
    $a = "{$gameID}-{$ans}";
    $sql = "UPDATE Game SET Q{$afterAmount} = '{$a}', amount = '{$afterAmount}' WHERE username = '{$username}' ";
    $stmt = $dbh->prepare($sql);
    $stmt->execute(array());
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // $_SESSION['askQuestion'] = 0;
    unset($stmt);
} elseif($afterAmount == 7){
    $sql = "UPDATE Game SET Q{$afterAmount} = '{$finalAns}', amount = '{$afterAmount}' WHERE username = '{$username}' ";
    // $sql = "UPDATE Game SET Q7 = '{$short_answer}', amount = 7 WHERE username = '{$username}' ";
    $stmt = $dbh->prepare($sql);
    $stmt->execute(array());
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // $_SESSION['askQuestion'] = 0;
    unset($stmt);
} else {
    $sql = "UPDATE Game SET Q{$afterAmount} = '{$ans}', amount = '{$afterAmount}' WHERE username = '{$username}' ";
    $stmt = $dbh->prepare($sql);
    $stmt->execute(array());
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // $_SESSION['askQuestion'] = 0;
    unset($stmt);
}

echo $afterAmount;
?>