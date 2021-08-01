<?php 
require 'core/init.php';
$sql = 'SELECT * FROM accounts';
$query = mysqli_query($db, $sql);
$accounts = mysqli_fetch_all($query, MYSQLI_ASSOC);

echo json_encode($accounts);


?>