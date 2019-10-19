<?php

//POST參數接收 操作類型/查詢方式/獎品名稱/獎品ID
$oper_type = filter_input(INPUT_POST, "operType");
$sel_type = filter_input(INPUT_POST, "selType");
$prize_name = htmlspecialchars(trim(filter_input(INPUT_POST, "prizeName"))); //字符實體化&去除多餘空格
$prize_id = filter_input(INPUT_POST, "prizeId");

//SQL語句 查詢/刪除/修改/新增/重置
$sel_all = "SELECT `rp_id`, `rp_name`, `rp_create_datetime`, `rp_used_datetime` FROM `reward_pool` WHERE 1";
$sel_part = "SELECT `rp_id`, `rp_name`, `rp_create_datetime`, `rp_used_datetime` FROM `reward_pool` WHERE `rp_used_datetime` IS NULL";
$sel_used = "SELECT `rp_used_datetime` FROM `reward_pool` WHERE `rp_id` = {$prize_id}";
$del_sql = "DELETE FROM `reward_pool` WHERE `reward_pool`.`rp_id` = {$prize_id}";
$update_sql = "UPDATE `reward_pool` SET `rp_name` = '{$prize_name}' WHERE `rp_id` = {$prize_id}";
$ins_sql = "INSERT INTO `reward_pool` (`rp_id`, `rp_name`, `rp_create_datetime`, `rp_used_datetime`) VALUES (NULL, '{$prize_name}', CURRENT_TIMESTAMP, NULL)";
$reset_sql = "UPDATE `reward_pool` SET `rp_used_datetime` = null WHERE 1";
