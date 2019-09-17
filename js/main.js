/**
 * @Name: main.js
 * @Description: 個人主頁aside雙擊翻頁
 * @Author: 李瑞豪
 * @Update: 2019-09-04 9:52
 */

function ready() {
  document.querySelector('aside').addEventListener('click', function () {
    document.querySelector('aside').className += "open-aside";
  });
}