<?php

/**
 * 連接DB
 */
$host = "127.0.0.1";
$username = "lruihao";
$password = "123456";
$database = "lruihao";
$db_conn = mysqli_connect($host, $username, $password, $database,3307);
if (mysqli_connect_errno($db_conn)) {
  die("Connection failed: " . mysqli_connect_error());
}
mysqli_query($db_conn, "SET NAMES 'UTF8'");

if (filter_input(INPUT_SERVER, "REQUEST_METHOD") === "GET") {
  //關閉數據庫連接
  mysqli_close($db_conn);
}
