<?php
require_once"pdoInc.php";
session_start();

$username = $_POST['username'];
$pwd = $_POST['password'];


// //確認帳號不為空
// if(empty(trim($username))){
//     echo "帳號不得為空";
// }
// else{
//     $checkUser = $username;
// }
// //確認密碼不為空
// if(empty(trim($pwd))){
//     echo "密碼不得為空";
// }else{
//     $checkPwd = $pwd;
// }
if(isset($_SESSION['account']) && $_SESSION['account'] != null){
    // echo '<meta http-equiv=REFRESH CONTENT=0;url=main.php>';
    echo "已登入";
}
else if(isset($username) && isset($pwd)){
    $checkUser = preg_replace("/[^A-Za-z0-9]/", "", $username);
    $sql = "SELECT * FROM Game where username = ?";
    $stmt = $dbh->prepare($sql);
    // $stmt -> bindParam(":username", $checkUser);
    $stmt ->execute(array($checkUser));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // print_r($row);
    if($row['pwd'] == $pwd){
        $_SESSION['username'] = $row['username'];
        $_SESSION['nickname'] = $row['nickname'];
        $_SESSION['loggedin'] = true;
        // $_SESSION['is_admin'] = $row['is_admin'];
        echo "<script> {window.alert('登入成功');location.href='main.php'} </script>";
        // sleep(3);
        echo '<meta http-equiv=REFRESH CONTENT=0;url=main.php>';
    }else{
        echo "<script> {window.alert('帳號或密碼有誤');location.href='login.html'} </script>";
    }
}



?>