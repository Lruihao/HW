<?php

if (filter_input(INPUT_SERVER, "REQUEST_METHOD") !== "POST") {
  die("請用POST請求！");
}

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

$cm_nick = htmlspecialchars(trim(filter_input(INPUT_POST, "cm-nick"))); //字符實體化&去除多餘空格
$cm_email = htmlspecialchars(trim(filter_input(INPUT_POST, "cm-email")));
$cm_content = htmlspecialchars(trim(filter_input(INPUT_POST, "cm-content")));
if ($cm_nick === "") {
  $cm_nick = "Anonymous";
}
$cm_avatar = get_gravatar($cm_email);

if ($cm_content !== "") {
  $ins_sql = "INSERT INTO `comments` (`cm_id`, `cm_nick`, `cm_email`, `cm_content`, `cm_avatar`, `cm_date`) VALUES (NULL, '{$cm_nick}', '{$cm_email}', '{$cm_content}', '{$cm_avatar}', CURRENT_TIMESTAMP)";
  mysqli_query($db_conn, $ins_sql);
}
query_cm($db_conn);

/**
 * 查詢評論
 * @param object $db_conn
 */
function query_cm($db_conn) {
  $sel_sql = "SELECT `cm_nick`, `cm_content`, `cm_avatar`, `cm_date` FROM `comments` WHERE 1";
  $result = mysqli_query($db_conn, $sel_sql);
  $comment = array();
  while ($data = mysqli_fetch_object($result)) {
    $comment[] = $data;
  }
  echo json_encode($comment);
}

/**
 * Get either a Gravatar URL or complete image tag for a specified email address.
 *
 * @param string $email The email address
 * @param string $s Size in pixels, defaults to 80px [ 1 - 2048 ]
 * @param string $d Default imageset to use [ 404 | mp | identicon | monsterid | wavatar ]
 * @param string $r Maximum rating (inclusive) [ g | pg | r | x ]
 * @return String containing either just a URL
 * @source https://gravatar.com/site/implement/images/php/
 */
function get_gravatar($email, $s = 80, $d = 'wavatar', $r = 'g') {
  $url = 'https://www.gravatar.com/avatar/';
  $url .= md5(strtolower(trim($email)));
  $url .= "?s=$s&d=$d&r=$r";
  return $url;
}
