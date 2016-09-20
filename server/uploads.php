<?php
session_start();
require 'dbnfo.php';

$file = $_FILES['upload'];
$file_name = $file['name'];
$file_tmp = $file['tmp_name'];
$file_owner = $_SESSION['user'];

$success = 'success';
$folder = "../uploads/$file_owner";

$conn = new PDO("mysql:host=$servername; dbname=filesystem",$username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("SELECT filename FROM userfiles WHERE username = '$file_owner'");
$stmt-> execute();
$result = $stmt->fetchAll(PDO::FETCH_NUM);

for ($i = 0; $i < count($result); $i++) {

	if ($result[$i][0] == $file_name) {
		echo json_encode('You have that already');
		die();
	}
}



if (!file_exists ($folder)) {
	mkdir("../uploads/$file_owner",0777 );
}

$file_ext = explode('.', $file_name);
$file_ext = end($file_ext);

$file_new_name = uniqid(' ', true). '.' . $file_ext;

trim($file_new_name);

$file_destination = "../uploads/". $file_owner . '/' . $file_new_name;
move_uploaded_file ($file_tmp, $file_destination);
$file_location = "uploads/". $file_owner . '/' . $file_new_name;

$conn = new PDO("mysql:host=$servername; dbname=filesystem", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("INSERT INTO userfiles (username, filename, filepath)
    VALUES (:username, :filename, :filepath)");
$stmt->bindParam(':username', $file_owner);
$stmt->bindParam(':filename', $file_name);
$stmt->bindParam(':filepath', $file_location);
$stmt-> execute();
echo json_encode('Done');


