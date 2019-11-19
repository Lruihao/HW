<?php

/**
 * 連接DB
 */
$host = "10.151.110.164";
$username = "F1684914";
$password = "ilovefoxconn";
$database = "f1684914";
$db_conn = mysqli_connect($host, $username, $password, $database);
if (mysqli_connect_errno($db_conn)) {
  die("Connection failed: " . mysqli_connect_error());
}
mysqli_query($db_conn, "SET NAMES 'UTF8'");

if (filter_input(INPUT_SERVER, "REQUEST_METHOD") === "GET") {
  //關閉數據庫連接
  mysqli_close($db_conn);
}
