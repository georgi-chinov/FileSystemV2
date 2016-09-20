<?php
session_start();
require 'dbnfo.php';
$name = $_POST['username'];
$passWD = $_POST['password'];


$conn = new PDO("mysql:host=$servername; dbname=filesystem",$username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("SELECT username, password FROM users WHERE username = '$name' AND password = '$passWD'");
$stmt-> execute();

if ($stmt->rowCount() > 0) {
	$resp =  'success';
	$_SESSION['user'] = $name;
} else {
   $resp = 'nothing';
}
echo json_encode($resp);