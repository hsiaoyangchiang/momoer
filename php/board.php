<?php
session_start();
include("../pdoInc.php");
$board = array();

$sql = "SELECT * from Game ORDER BY score DESC LIMIT 3";
$sth = $dbh->query($sql);
while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    $arr = array('username' => $row['username'], 'score' => $row['score']);
    array_push($board, $arr);
};
echo json_encode($board);

?>