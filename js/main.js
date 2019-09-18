/**
 * @Name: main.js
 * @Description: 個人主頁
 * @Author: 李瑞豪
 * @Update: 2019-09-18 16:02
 */

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

//建立窗口鍵盤事件監聽
window.addEventListener("keydown", function () {
  submit(event);
});

function submit(event) {
  var welcomeInput = document.querySelector(".welcome-input");
  var welcomeInner = document.querySelectorAll(".welcome-inner > span");
  if (event.keyCode === 13 && welcomeInput.value !== "") {
    //先清空再賦值，再把value清空
    welcomeInner[0].textContent = welcomeInner[1].textContent = "";
    welcomeInner[0].textContent = welcomeInner[1].textContent = welcomeInput.value;
    welcomeInput.value = "";
  }
}