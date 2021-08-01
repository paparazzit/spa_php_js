<?php 
require 'core/init.php';
$id =$_POST['id'];
$name = $_POST['name'];
$deposit = $_POST['deposit'];
$credit_card = $_POST['credit_card'];

$sql= "UPDATE accounts SET name= '$name', deposit='$deposit', credit_card='$credit_card' WHERE id='$id'";
$query = mysqli_query($db, $sql);

if($query){
    echo "OK";

 }else{
     echo "not ok";
 }
?>