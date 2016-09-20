<?php 
session_start();
if (!$_SESSION) {
	echo json_encode('no user');
} else {
	echo json_encode('there is a user');
}