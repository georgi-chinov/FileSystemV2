<?php
session_start();
require 'dbnfo.php';

$user = $_SESSION['user'];


$conn = new PDO("mysql:host=$servername; dbname=filesystem",$username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("SELECT foldername,id FROM folders WHERE username = '$user' AND parentId = '' ");
$stmt-> execute();
$result = $stmt->fetchAll(PDO::FETCH_NUM);
echo json_encode($result);
	 