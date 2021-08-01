<?php 
require 'core/init.php';
$id = $_GET['id'];


$sql="DELETE FROM accounts WHERE id = $id";

$query = mysqli_query($db, $sql);


header('Location: ../index.html');

?>