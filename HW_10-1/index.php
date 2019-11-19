<?php

if (filter_input(INPUT_SERVER, "REQUEST_METHOD") !== "POST") {
  die("請用POST請求！");
}

//連接數據庫 獲取獎品實體類
require_once './includes/db_connect.php';
require_once './includes/Prize.php';

//SQL查詢數據資料ID存入數組
$count_sql = "SELECT `rp_id` FROM `reward_pool` WHERE `rp_used_datetime` IS NULL";
$result = mysqli_query($db_conn, $count_sql);
$prize_arr = array();
while ($data = mysqli_fetch_object($result)) {
  $prize_arr[] = $data;
}

//獲取數據資料數目
$num_rows = count($prize_arr);
//獲取其兩倍範圍內的隨機數 相當於50%中獎率
$rand_id = rand(0, 2 * $num_rows - 1);
//默認id為-1 即抽獎結果為謝謝惠顧
$rp_id = -1;

//獎品ID若存在 則更新領取時間
if ($num_rows !== 0 && $rand_id < $num_rows) {
  $rp_id = $prize_arr[$rand_id]->rp_id;
  //更新領取時間
  $update_sql = "UPDATE `reward_pool` SET `rp_used_datetime` = CURRENT_TIMESTAMP WHERE `rp_id` = {$rp_id}";
  mysqli_query($db_conn, $update_sql);
}
//返回領取結果
if ($num_rows !== 0) {
  $sel_sql = "SELECT `rp_id`, `rp_name`, `rp_create_datetime`, `rp_used_datetime` FROM `reward_pool` WHERE `rp_id` = {$rp_id}";
  $prize = mysqli_fetch_object(mysqli_query($db_conn, $sel_sql));
  if ($prize === null) {
    //謝謝惠顧
    $prize = new Prize();
  }
  echo json_encode($prize);
} else {
  //數據庫無可領取獎品
  $prize = new Prize();
  $prize->rp_name = "獎品告罄";
  echo json_encode($prize);
}

  

  