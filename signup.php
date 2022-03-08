<?php 
require_once"pdoInc.php";
// error_reporting(E_ALL & ~E_NOTICE);



$username = $_POST['username'];
$pwd = $_POST['password'];
$confirm_pwd = $_POST['confirm_password'];
$nickname = $_POST['nickname'];
$checkbox = $_POST['agree_toc'];
// echo $checkbox;
//有勾：on
//沒勾：underdefined


// echo $username, $pwd, $confirm_pwd, $nickname;

if($checkbox != 'on'){
    echo "<script> {window.alert('請同意使用條款');location.href='signup.html'} </script>";
    exit;
}
//確認密碼是否為空
if (empty(trim($pwd))){
    echo "<script> {window.alert('密碼不得為空');location.href='signup.html'} </script>";   
    exit;
} 
//密碼長度
if(strlen($pwd)<3){
    echo "<script> {window.alert('密碼太短');location.href='signup.html'} </script>";
    exit;
}
//確認密碼與密碼相同
// if (empty(trim($confirm_pwd))) {
//     echo "<script> {window.alert('請確認密碼');location.href='signup.html'} </script>";
//     // exit;
// } else if ($confirm_pwd != $pwd) {
//     echo "<script> {window.alert('請確認密碼');location.href='signup.html'} </script>";
// }else{
//     $checkPassword = $pwd;
//     // echo $checkPassword;
// }
//確認帳號不為空＆確認帳號是否重複
if(empty(trim($username))){
    echo "<script> {window.alert('帳號或暱稱不得留空');} </script>";
}else{
    $sql = "SELECT id FROM Game WHERE username = :username";
    if ($stmt = $dbh->prepare($sql)) {
        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
        if ($stmt->execute()){
            if ($stmt->rowCount() == 1) {
                echo "<script> {window.alert('帳號被用過');location.href='signup.html'} </script>";
                // echo "帳號被用過";
                exit;
            } 
            else {
                $checkUsername = $username;
            }
        } else {
            echo "<script> {window.alert('Opps, 現在有問題請稍等');location.href='signup.html'} </script>";
            exit;
        }
        // Close statement
        unset($stmt);
    }
}

//確認暱稱不為空＆確認暱稱重複

//加入資料表game
$sql = "INSERT INTO Game(username, pwd) VALUES (:username, :pwd)";
echo $checkUsername;
echo $pwd;
$stmt = $dbh->prepare($sql);
$stmt -> bindParam(":username", $checkUsername);
$stmt -> bindParam(":pwd", $pwd);

if ($stmt->execute()) {
    echo "<script> {window.alert('成功加入');} </script>";
    session_start();
    $_SESSION["loggedin"] = 1;

    // $_SESSION["id"] = $id;
    // $_SESSION["nickname"] = $checkNickname;
    $_SESSION['username'] = $checkUsername;
    $_SESSION['askQuestion'] = false;
    sleep(3);
    echo '<meta http-equiv=REFRESH CONTENT=0;url=main.php>';
} else {
    // echo "<script> {window.alert('Opps, 現在有問題請稍等');location.href='signup.html'} </script>";
}
unset($stmt);

?>