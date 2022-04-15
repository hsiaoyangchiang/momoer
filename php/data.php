<?php
session_start();
include("../pdoInc.php");

$data = array();
$sql = "SELECT * FROM Game";
$sth = $dbh->query($sql);
while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    // 所有資料匯入arr
    $arr = array('id'=>$row['id'],'username' => $row['username'], 'password' => $row['pwd'], 'Q1' => $row['Q1'], 'Q2' => $row['Q2'], 'Q3' => $row['Q3'], 'Q4' => $row['Q4'], 'Q5' => $row['Q5'], 'Q6' => $row['Q6'], 'Q7' => $row['Q7']);
    array_push($data, $arr);
};
echo json_encode($data);
unset($sth);

//傳出資料
// , 'arrival'=>$row['arrival'], 'departure'=>$row['departure'], 'stayTime'=>$row['stayTime'], 'test1'=>$row['test1'], 'test2'=>$row['test2']

?>