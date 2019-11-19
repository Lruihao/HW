/**
 * @Name: main.js
 * @Description: 個人主頁
 * @Author: 李瑞豪
 * @Update: 2019-09-25 14:42
 */

window.onload = function () {
  //主頁運行時間
  if (!document.hidden) {
    let siteTime = setInterval("createTime()", 500);
  } else {
    clearInterval(siteTime);
  }
  //獲取并設置作業進度
  progress();
  //崩潰欺騙
  crashCheat();
  //建立全局雙擊事件監聽，點擊頭像翻開aside
  document.querySelector('aside > .avatar').addEventListener("click", function () {
    asideToggle();
  });
  document.querySelector('section > h2').addEventListener("click", function () {
    sectionToggle();
  });

  //此處使用jQuery進行異步提交
  $(".cm-submit").click(function () {
    cmSubmit();
  });
  //獲取評論 獲取最新留言進行播報
  cmReload();
};

/**
 * 通過控制aside的類來實現aside翻頁效果
 */
function asideToggle() {
  let aside = document.querySelector("aside");
  let section = document.querySelector("section");
  let guestbook = document.querySelector(".guestbook");
  if (aside.className === "close-aside") {
    if (section.className === "open-section") {
      guestbook.style.zIndex = -1;
      section.className = "close-section";
      setTimeout(function () {
        section.style.zIndex = 0;
      }, 1000);
    }
    aside.style.zIndex = 1;
    aside.className = "open-aside";
  } else {
    aside.className = "close-aside";
    setTimeout(function () {
      aside.style.zIndex = 0;
    }, 1000);
  }
}
/**
 * 通過控制section的類來實現section翻頁效果
 */
function sectionToggle() {
  let aside = document.querySelector("aside");
  let section = document.querySelector("section");
  let guestbook = document.querySelector(".guestbook");
  if (section.className === "close-section") {
    if (aside.className === "open-aside") {
      aside.className = "close-aside";
      setTimeout(function () {
        aside.style.zIndex = 0;
      }, 500);
      setTimeout(function () {
        section.style.zIndex = 1;
        section.className = "open-section";
      }, 500);
      setTimeout(function () {
        guestbook.style.zIndex = 1;
      }, 1500);
    } else {
      section.style.zIndex = 1;
      section.className = "open-section";
      setTimeout(function () {
        guestbook.style.zIndex = 1;
      }, 1000);
    }
  } else {
    guestbook.style.zIndex = -1;
    section.className = "close-section";
    setTimeout(function () {
      section.style.zIndex = 0;
    }, 1000);
  }
}

/**
 * 離開時改變網頁標題
 */
function crashCheat() {
  let oldTitle = document.title;
  let titleTime; //標題恢復計時器
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
  let progress = document.querySelector("details progress");
  let value = document.querySelectorAll("details > ul > li");
  //延遲2s放慢效果
  setTimeout(function () {
    progress.setAttribute("value", value.length);
    progress.title += progress.value + "/10";
  }, 2000);
}

/**
 * 創建建站時間
 */
function createTime() {
  let now = new Date();
  let run = new Date("08/01/2019 11:30:00");
  //總的秒數
  let runTime = (now - run) / 1000,
          days = Math.floor(runTime / 60 / 60 / 24),
          hours = Math.floor(runTime / 60 / 60 - (24 * days)),
          minutes = Math.floor(runTime / 60 - (24 * 60 * days) - (60 * hours)),
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

/**
 * 提交評論
 */
function cmSubmit() {
  if ($(".cm-content").val() !== "") {
    $.ajax({
      type: "POST",
      url: "comment.php",
      data: $("#cm-form").serialize(),
      dataType: "json",
      success: function (response) {
        $(".cm-content").val("");
        loadComments(response);
      },
      error: function () {
        $(".cm-display").html("評論加載失敗！");
      }
    });
  }
}

/**
 * 回顯評論請求
 */
function cmReload() {
  $.ajax({
    type: "POST",
    url: "comment.php",
    dataType: "json",
    success: function (response) {
      loadComments(response);
    },
    error: function () {
      $(".cm-display").html("評論加載失敗！");
    }
  });
}

/**
 * 加載評論
 * @param {Object} res 向後臺請求返回的結果
 */
function loadComments(res) {
  let parent = document.querySelector(".cm-display");
  parent.innerHTML = "";
  if (res.length === 0) {
    parent.innerHTML = "快來搶沙發吧~";
    return;
  }
  for (let i = 0; i < res.length; i++) {
    let obj = res[i];
    let nick = obj.cm_nick;
    let avatar = obj.cm_avatar;
    let date = obj.cm_date;
    let content = obj.cm_content;
    let div = document.createElement("div");
    let img = document.createElement("img");
    let span = document.createElement("span");
    let p = document.createElement("p");
    img.src = avatar;
    img.alt = nick;
    span.innerHTML = `${nick}<br/>${date}`;
    p.textContent = content;
    div.className = "cm-card";
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(p);
    parent.appendChild(div);
  }
  //統計
  cmCount();
}

/**
 * 統計評論數 獲取最新留言進行播報
 */
function cmCount() {
  let num = document.querySelectorAll(".cm-card").length;
  document.querySelector(".cm-info>span").textContent = num;
  if (num !== 0) {
    let lastComment = document.querySelector(".cm-card:last-child>p").textContent;
    let lastNick = document.querySelector(".cm-card:last-child>img").alt;
    document.querySelectorAll(".welcome-inner>span")[0].textContent = `最新評論✁ 『${lastNick}』: “${lastComment}”`;
    document.querySelectorAll(".welcome-inner>span")[1].textContent = `最新評論✄ 『${lastNick}』: “${lastComment}”`;
  }
}

