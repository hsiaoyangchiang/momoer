<?php
session_start();
include("../pdoInc.php");

$data = array();
$sql = "SELECT * FROM Game";
$sth = $dbh->query($sql);
while($row = $sth->fetch(PDO::FETCH_ASSOC)){
    // 所有資料匯入arr
    $arr = array(
        'id' => $row['id'],
        'username' => $row['username'],
        'pwd' => $row['pwd'],
        'q1' => $row['Q1'],
        'q2' => $row['Q2'],
        'q3' => $row['Q3'],
        'q4' => $row['Q4'],
        'q5' => $row['Q5'],
        'q6' => $row['Q6'],
        'q7' => $row['Q7'],
        'amount' => $row['amount']
    );
    array_push($data, $arr);
};
echo json_encode($data);
unset($sth);

//傳出資料
// , 'arrival'=>$row['arrival'], 'departure'=>$row['departure'], 'stayTime'=>$row['stayTime'], 'test1'=>$row['test1'], 'test2'=>$row['test2']

?>