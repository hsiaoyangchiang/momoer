<?php
$db_server = "localhost";
$db_user = "root";
$db_passwd = "9597cat";
$db_name = "demo";
 
try {
    $dsn = "mysql:host=$db_server;dbname=$db_name";
    // $dbh = new PDO($dsn, $db_user, $db_passwd);
    $dbh = new PDO($dsn, $db_user);
}
catch (Exception $e){
    die('無法對資料庫連線');
}
$dbh->exec("SET NAMES utf8");


?>