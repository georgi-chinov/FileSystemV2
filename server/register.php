<?php
require 'dbnfo.php';
$name = $_POST['username'];
$passWD = $_POST['password'];
$mail = $_POST['mail'];



$conn = new PDO("mysql:host=$servername; dbname=filesystem",$username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("INSERT INTO users (username, password, mail)
    VALUES (:username, :password, :mail)");
$stmt->bindParam(':username', $name);
$stmt->bindParam(':password', $passWD);
$stmt->bindParam(':mail', $mail);
$stmt-> execute();