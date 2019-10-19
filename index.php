<?php

$cm_nick = filter_input(INPUT_POST, "cm-nick");
$cm_email = filter_input(INPUT_POST, "cm-email");
//$prize_name = htmlspecialchars(trim(filter_input(INPUT_POST, "prizeName"))); //字符實體化&去除多餘空格

var_dump($cm_nick);
var_dump($cm_email);
