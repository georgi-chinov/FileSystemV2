<?php
require 'dbnfo.php';
session_start();
$currentUser = $_SESSION['user'];
/* 
$conn = new PDO("mysql:host=$servername; dbname=filesystem",$username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("SELECT username, password FROM users WHERE username = '$name' AND password = '$passWD'");
$stmt-> execute() */;