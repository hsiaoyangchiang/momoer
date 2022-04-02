<?php
session_start();
include("../pdoInc.php");

$data = array();
$sql = "SELECT * FROM Game";
$sth = $dbh->query($sql);
while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    $arr = array('username' => $row['username'], 'amount' => $row['amount']);
    array_push($data, $arr);
};
echo json_encode($data);
unset($sth);

?>