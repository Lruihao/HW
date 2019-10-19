/**
 * @Name: HW_6-1.js
 * @Description: 計算機 enter計算 退格鍵刪除 Alt+退格清空
 * @Author: 李瑞豪
 * @Update: 2019-09-26 11:45
 */

//全局變量用來保存輸入框的值
var inputValue = "0";

$(document).ready(function () {
//給所有button建立監聽器(除了=, c, d)
  $("button").on('click', function (event) {
    //$(this).blur(); //取消button焦點，防止enter觸發click事件！(治標不治本-_-！)
    var value = $(this).text();
    if (!checkOut(value)) {
      return;
    }
    if (value !== "=" && value !== "c" && value !== "d") {
      inputValue += value;
      $(".input-calc").val(inputValue); // 顯示輸入的值
    }
  });
//給"="按鈕建立監聽器
  $(".calculate").on('click', function () {
    calculate();
  });
//給"c"按鈕建立監聽器
  $(".clear").on('click', function () {
    clear();
  });
//給"d"按鈕建立監聽器
  $(".del-char").on('click', function () {
    delChar();
  });
//鍵盤事件監聽器
  $(document).on('keypress', function (event) {
    //取消keypress預設動作，防止enter對獲得焦點的button觸發click事件！
    event.preventDefault();
    var keyValue = event.key; // 獲取鍵值
    var reg = /[-/*+.0-9]/;
    //test()用於檢測用戶輸入的keyValue是否符合正則表達式reg的內容
    if (reg.test(keyValue)) {
      if (checkOut(keyValue)) {
        inputValue += keyValue;
        $(".input-calc").val(inputValue);
        return;
      }
    }
    if (keyValue === "Enter") {
      calculate();
    }
  });
  $(document).on('keyup', function (event) {
    if (event.keyCode === 8) {
      delChar(); //退格鍵刪除,keyup在輸入事件keypress後面觸發
    }
    if (event.altKey && event.keyCode === 8) {
      clear(); //Alt+退格清空
    }
  }
  );
});

/**
 * 清空輸入框的值
 */
function clear() {
  $(".input-calc").val("0");
  inputValue = "0";
}

/**
 * 刪除最後一個字符功能
 */
function delChar() {
  if (inputValue.length !== 0) {
    inputValue = inputValue.slice(0, -1);
    $(".input-calc").val(inputValue.length !== 0 ? inputValue : 0);
    if (inputValue.length === 0) {
      inputValue = "0";
    }
  }
}

/**
 * 檢查用戶輸入
 * @param {Object} value 用戶輸入值
 */
function checkOut(value) {
  var fisrtValue = inputValue.slice(0, 1);
  var lastValue = inputValue.slice(-1);
  var sear = "/*-+.";
  //限制輸入長度
  if (inputValue.length >= 23) {
    $(".tip").html("&emsp;輸入內容超過最大長度！&emsp;");
    setTimeout(function () {
      $(".tip").html("");
    }, 3000);
    return false;
  }
  //第一次輸入為數字取代默認0
  if (value !== "=" && sear.indexOf(value) === -1 && fisrtValue === "0" && inputValue.length === 1) {
    inputValue = value;
    $(".input-calc").val(inputValue);
    return false;
  }
  //用戶輸入運算符且和輸入框最後一個字符相同
  if (sear.indexOf(value) > -1 && sear.indexOf(lastValue) === sear.indexOf(value)) {
    return false;
  } else if (sear.indexOf(value) > -1 && sear.indexOf(lastValue) > -1
          && sear.indexOf(lastValue) !== sear.indexOf(value)) {    //用戶輸入和輸入框最後一個字符都是運算符但不相同,替換運算符
    inputValue = inputValue.slice(0, -1);
    $(".input-calc").val(inputValue);
    return true;
  } else {
    return true;
  }
}

/**
 * 計算并顯示結果
 */
function calculate() {
  try {
    var result = eval(inputValue); // 計算字符串中的內容
    result = eval(result.toFixed(14)); //精確一下
    $(".input-calc").val(result); // 顯示計算的結果
    inputValue = result + "";
  } catch (e) {
    $(".tip").html("&emsp;請輸入正確的表達式！&emsp;");
    setTimeout(function () {
      $(".tip").html("");
    }, 3000);
  }
}




