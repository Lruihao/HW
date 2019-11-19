/**
 * @Name: questions.js
 * @Description: 我的問卷
 * @Author: 李瑞豪
 * @Update: 2019-11-07 11:28
 */

window.onload = function () {
  if (localStorage.length !== 0) {
    document.querySelector("form").innerHTML = localStorage.questionList;
  }
  let quesItem = document.querySelectorAll(".question-item");
  for (let i = 0; i < quesItem.length; i++) {
    quesItem[i].removeChild(document.querySelector(".detail-operation"));
  }
  let submit = document.createElement("input");
  let reset = document.createElement("input");
  submit.type = "submit";
  submit.value = "提交";
  reset.type = "reset";
  reset.value = "重置";
  document.querySelector("form").appendChild(reset);
  document.querySelector("form").appendChild(submit);
  document.querySelector(".print").addEventListener("click", printDiv);
};

/**
 * 打印局部問卷
 */
function printDiv() {
  let headHtml = "<html><head></head><body>";
  let footHtml = "</body>";
  // 获取問題列表中的html内容
  let newHtml = document.querySelector('form').innerHTML;
  // 获取原来的窗口界面body的html内容，并保存起来
  let oldHtml = document.body.innerHTML;

  // 给窗口界面重新赋值，赋自己拼接起来的html内容
  document.body.innerHTML = headHtml + newHtml + footHtml;
  // 调用window.print方法打印新窗口
  window.print();
  // 将原来窗口body的html值回填展示
  document.body.innerHTML = oldHtml;
  document.querySelector(".print").addEventListener("click", printDiv);
  return false;
}