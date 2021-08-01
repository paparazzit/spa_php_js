<?php 
require 'core/init.php';
$name = $_POST['name'];
$deposit = $_POST['deposit'];
$credit_card = $_POST['credit_card'];

$sql="INSERT INTO accounts(name, deposit, credit_card) VALUES ('$name', '$deposit', '$credit_card')";

$query = mysqli_query($db, $sql);
if($query){
    echo "OK";
}else{
    echo "not ok";
}
?>