/**
 * @Name: HW_6-1.js
 * @Description: 計算機 enter計算 退格鍵刪除 Alt+退格清空
 * @Author: 李瑞豪
 * @Update: 2019-09-26 11:45
 */
//全局變量用來保存輸入框的值
let inputValue = "0";

$(document).ready(function () {
  //加載歷史記錄
  if (localStorage.length !== 0) {
    $(".history1").html(localStorage.calcuHist1);
    $(".history2").html(localStorage.calcuHist2);
  }
  //給所有button建立監聽器
  $("button").on('click', function () {
    let value = $(this).text();
    if (value !== "=" && value !== "AC" && value !== "←" && checkOut(value)) {
      inputValue += value;
      $(".input-calc").val(inputValue); // 顯示輸入的值
    }
  });
  //給"="按鈕建立監聽器
  $(".calculate").on('click', function () {
    calculate();
  });
  //給"AC"按鈕建立監聽器
  $(".clear").on('click', function () {
    clear();
  });
  //給"←"按鈕建立監聽器
  $(".del-char").on('click', function () {
    delChar();
  });
  //鍵盤事件監聽器
  $(document).on('keypress', function () {
    //取消keypress預設動作，防止enter對獲得焦點的button觸發click事件！
    event.preventDefault();
    let keyValue = event.key; // 獲取鍵值
    let reg = /[-/*+.0-9]/;
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
  $(document).on('keyup', function () {
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
 * @param {String} value 用戶輸入值
 */
function checkOut(value) {
  let fisrtValue = inputValue.slice(0, 1);
  let lastValue = inputValue.slice(-1);
  let sear = "/*-+.";
  let sear1 = "/*-+";
  //限制輸入長度
  if (inputValue.length >= 21) {
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
  } else if (sear1.indexOf(value) > -1 && sear.indexOf(lastValue) > -1
          && sear1.indexOf(lastValue) !== sear1.indexOf(value)) {    //用戶輸入和輸入框最後一個字符都是運算符但不相同,替換運算符
    inputValue = inputValue.slice(0, -1);
    $(".input-calc").val(inputValue);
    return true;
  } else {
    if (value === ".") { //解決多小數點的輸入，eg:0.0.0.1
      let otherIndex = -1;
      let dotIndex = inputValue.lastIndexOf(".");
      let opeStr = "+-*/";
      for (let i = 0; i < 4; i++) {
        let lastIndex = inputValue.lastIndexOf(opeStr[i]);
        otherIndex < lastIndex ? otherIndex = lastIndex : "";
      }
      if (dotIndex > otherIndex) {
        return false;
      }
    }
    return true;
  }
}

/**
 * 計算并顯示結果
 */
function calculate() {
  let calculateStr = "";
  let firstIndex = 99;
  let opeStr = "+-*/";
  if (inputValue[0] === "-") {
    calculateStr = "-";
    inputValue = inputValue.slice(1);
  }
  while (1) {
    for (let i = 0; i < 4; i++) {
      let index = inputValue.indexOf(opeStr[i]);
      (firstIndex > index && index > 0) ? firstIndex = index : "";
    }
    if (firstIndex === 99) {
      if (inputValue.indexOf(".") === -1 && inputValue !== "") {
        calculateStr += parseInt(inputValue, 10);
      } else if (inputValue !== "") {
        calculateStr += inputValue;
      }
      break;
    }
    //字串分割，把每個整數變成10進制數
    let num = inputValue.slice(0, firstIndex);
    if (num.indexOf(".") === -1) {
      calculateStr += parseInt(num, 10);
    } else {
      calculateStr += num;
    }
    inputValue = inputValue.slice(firstIndex);
    calculateStr += inputValue.slice(0, 1);
    inputValue = inputValue.slice(1);
    firstIndex = 99;
  }
  try {
    inputValue = calculateStr;
    let result = eval(calculateStr); // 計算字符串中的內容
    result = eval(result.toFixed(14)); //精確一下
    $(".input-calc").val(result); // 顯示計算的結果
    inputValue = result + "";
    $(".history1").html(`${$(".history2").html()}`);
    $(".history2").html(`${calculateStr}=${result}`);
    if (typeof localStorage === 'undefined') {
      $(".tip").html("浏览器不支持localStorage，推荐使用Chrome！");
      setTimeout(function () {
        $(".tip").html("");
      }, 3000);
    } else {
      localStorage.calcuHist1 = $(".history1").html();
      localStorage.calcuHist2 = $(".history2").html();
    }
  } catch (e) {
    $(".tip").html("&emsp;請輸入正確的表達式！&emsp;");
    setTimeout(function () {
      $(".tip").html("");
    }, 3000);
  }
}