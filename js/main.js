/**
 * @Name: main.js
 * @Description: 個人主頁
 * @Author: 李瑞豪
 * @Update: 2019-09-18 16:02
 */

window.onload = function () {
  //主頁運行時間
  if (!document.hidden) {
    var siteTime = setInterval("createTime()", 500);
  } else {
    clearInterval(siteTime);
  }
  //獲取并設置作業進度
  progress();
  //崩潰欺騙
  crashCheat();
  //建立全局雙擊事件監聽，點擊頭像翻開aside
  document.querySelector('aside > .avatar').addEventListener("click", function () {
    toggle();
  });
};

/**
 * 通過控制aside的類來實現aside翻頁效果
 */
function toggle() {
  var aside = document.querySelector("aside");
  if (aside.className === "close-aside") {
    aside.className = "open-aside";
  } else {
    aside.className = "close-aside";
  }
}

/**
 * 離開時改變網頁標題
 */
function crashCheat() {
  var oldTitle = document.title;
  var titleTime; //標題恢復計時器
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.querySelector('[rel="icon"]').setAttribute("href", "./images/avatar.png");
      document.title = "網站崩潰了！";
      clearTimeout(titleTime);
    } else {
      document.title = "其實並沒有！";
      document.querySelector('[rel="icon"]').setAttribute("href", "https://10.151.110.165/favicon.ico");
      titleTime = setTimeout(function () {
        document.title = oldTitle;
      }, 1000);
    }
  });
}
/**
 * 獲取并設置作業進度
 */
function progress() {
  var progress = document.querySelector("details progress");
  var value = document.querySelectorAll("details > ul > li");
  progress.setAttribute("value", value.length);
  progress.title = "當前進度：" + progress.value + "/10";
}

function createTime() {
  var now = new Date();
  var run = new Date("08/01/2019 11:30:00");
  //總的秒數
  var runTime = (now - run) / 1000;
  days = Math.floor(runTime / 60 / 60 / 24);
  hours = Math.floor(runTime / 60 / 60 - (24 * days));
  minutes = Math.floor(runTime / 60 - (24 * 60 * days) - (60 * hours));
  seconds = Math.floor(runTime - (24 * 60 * 60 * days) - (60 * 60 * hours) - (60 * minutes));
  //前置零
  if (String(hours).length === 1) {
    hours = "0" + hours;
  }
  if (String(minutes).length === 1) {
    minutes = "0" + minutes;
  }
  if (String(seconds).length === 1) {
    seconds = "0" + seconds;
  }
  document.querySelector(".run-times").innerHTML = "Running: " + days + "," + hours
          + ":" + minutes + ":" + seconds + "";
}

