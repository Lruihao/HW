<!DOCTYPE html>
<html>
  <head>
    <title>九九乘法表</title>
    <link rel="stylesheet" type="text/css" href="../css/HW_7-1.css">
  </head>
  <body>
    <?php

    function set_table($rows, $cols) {
      $table = "<table>" . "<caption>九九乘法表</caption>";
      for ($i = 1; $i <= $rows; $i++) {
        $table .= "<tr>";
        for ($j = 1; $j <= $cols; $j++) {
          if ($i == $j) {
            $table .= ($i % 3 == 0) ? "<td class='red transform-bg'>" : "<td class='red'>";
          } else if ($i % 3 == 0 || $j % 3 == 0) {
            $table .= "<td class='transform-bg'>";
          } else {
            $table .= "<td>";
          }
          $table .= $i . "&ensp;*&ensp;" . $j . "&ensp;=&ensp;" . $i * $j . "</td>";
        }
        $table .= "</tr>";
      }
      $table .= "</table>";
      return $table;
    }

    echo set_table(9, 9);
    ?>
  </body>
</html>