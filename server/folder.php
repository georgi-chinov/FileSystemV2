<?php
session_start();
require 'dbnfo.php';
$folderName = $_POST['foldername'];
$parent = null;
$user = $_SESSION['user'];
if(isset($_POST['parent'])){
	$parent = $_POST['parent'];
} else {
	$parent=null;
}

$conn = new PDO("mysql:host=$servername; dbname=filesystem",$username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("INSERT INTO folders (username, foldername, parentname) VALUES('$user', '$folderName','$parent')");
$stmt-> execute();
echo json_encode('Done');
