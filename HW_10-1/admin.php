<?php

if (filter_input(INPUT_SERVER, "REQUEST_METHOD") !== "POST") {
  die("請用POST請求！");
}

/*
 * **************************************
 * 連接數據庫 POST參數接收 全局SQL語句
 * **************************************
 */
require_once "./includes/db_connect.php";
require_once "./includes/admin_params.php";

/*
 * **************************************
 * 主流程 根據操作類型選擇不同函數處理請求
 * **************************************
 */
switch ($oper_type) {
  case 1:
    read_data(); //查詢
    break;
  case 2:
    del_data(); //刪除
    break;
  case 3:
    update_data(); //修改
    break;
  case 4:
    insert_data(); //新增
    break;
  case 5:
    reset_time(); //重置
    break;
  default:
    echo "操作類型參數錯誤！";
    break;
}
//關閉數據庫連接
mysqli_close($db_conn);

/**
 * **************************************
 * 函數定義區域
 * **************************************
 */

/**
 * 查詢結果序列化json返回前臺
 * @param object $result 查詢結果
 */
function ajax_api($result) {
  $prize_arr = array();
  while ($data = mysqli_fetch_object($result)) {
    $prize_arr[] = $data;
  }
  echo json_encode($prize_arr);
}

/**
 * 查詢數據并回顯
 * @global object $db_conn 數據庫連接對象
 * @global number $sel_type 查詢類型
 * @global string $sel_all SQL全部查詢語句
 * @global string $sel_part SQL部份查詢語句
 */
function read_data() {
  global $db_conn, $sel_type, $sel_all, $sel_part;
  if ($sel_type === "1") {
    $sel_sql = $sel_all; //全部查詢
  } else if ($sel_type === "2") {
    $sel_sql = $sel_part; //部份查詢
  }
  $result = mysqli_query($db_conn, $sel_sql);
  ajax_api($result);
}

/**
 * 刪除數據操作
 * @global object $db_conn 數據庫連接對象
 * @global string $del_sql SQL刪除語句
 */
function del_data() {
  global $db_conn, $del_sql, $sel_used;
  $temp = mysqli_fetch_array(mysqli_query($db_conn, $sel_used));
  // 進一步判斷 只有未領取才能刪除
  if ($temp["rp_used_datetime"] === null) {
    mysqli_query($db_conn, $del_sql);
    read_data(); //查詢一下，回顯數據
  } else {
    echo "已領取獎品不能刪除！";
  }
}

/**
 * 修改數據操作
 * @global object $db_conn 數據庫連接對象
 * @global string $update_sql SQL修改語句
 */
function update_data() {
  global $db_conn, $update_sql, $sel_used;
  $temp = mysqli_fetch_array(mysqli_query($db_conn, $sel_used));
  // 進一步判斷 只有未領取才能修改
  if ($temp["rp_used_datetime"] === null) {
    mysqli_query($db_conn, $update_sql);
    read_data(); //查詢一下，回顯數據
  } else {
    echo "已領取獎品不能修改！";
  }
}

/**
 * 新增數據操作
 * @global object $db_conn 數據庫連接對象
 * @global string $ins_sql SQL新增語句
 */
function insert_data() {
  global $db_conn, $ins_sql;
  mysqli_query($db_conn, $ins_sql);
  read_data(); //查詢一下，回顯數據
}

/**
 * 重置已領取獎品時間
 * @global object $db_conn 數據庫連接對象
 * @global string $reset_sql SQL重置語句
 */
function reset_time() {
  global $db_conn, $reset_sql;
  mysqli_query($db_conn, $reset_sql);
  read_data(); //查詢一下，回顯數據
}
