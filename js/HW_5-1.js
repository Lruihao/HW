/**
 * @Name: HW_5-1.js
 * @Description: 問卷管理 - 問卷設計
 * @Author: 李瑞豪
 * @Update: 2019-09-18 11:04
 */

//全局變量，單選或多選的name屬性編號
let nameNum = 0;

//建立窗口鍵盤事件監聽
window.addEventListener("keydown", shortcutKeys);

/**
 * 全局快捷鍵設置函數：
 * 回車/F8 新增問題、F7 保存問卷、Alt+x 清空選項
 */
function shortcutKeys() {
  if (event.keyCode === 13 || event.keyCode === 119) {
    questionAdd();
  } else if (event.keyCode === 118) {
    save();
  } else if (event.altKey && event.keyCode === 88) {
    document.querySelector(".question-type").value = "text";
    document.querySelector("#required-item").checked = false;
    clearLastInfo();
  }
}

/**
 * 判斷問題類型，預覽不同問題
 */
function selectType() {
  //找到select元素節點，獲取問題類型
  let questionType = document.querySelector(".question-type").value;
  //根據問題類型執行對應响应
  switch (questionType) {
    case "number":
      clearLastInfo();
      numberTpye();
      break;
    case "textarea":
      clearLastInfo();
      textareaType();
      break;
    case "radio":
      clearLastInfo();
      radioTpye();
      break;
    case "checkbox":
      clearLastInfo();
      checkType();
      break;
    default:
      clearLastInfo();
      break;
  }
}

/**
 * 把所選問題類型添加到下面的問卷列表
 */
function questionAdd() {
  //獲取問題類型
  let questionType = document.querySelector(".question-type").value;
  //獲取問卷列表節點
  let questionList = document.querySelector(".question-list");
  //required判斷問題是否必選
  let required = document.querySelector("#required-item").checked ? true : false;
  //獲取標題
  let questionTitle = document.querySelector(".question-title");
  //創建元素
  let questionItem = document.createElement("div");
  let detailOperation = document.createElement("div");
  let delBtn = document.createElement("button");
  let downBtn = document.createElement("button");
  let upBtn = document.createElement("button");
  let delImg = document.createElement("img");
  let downImg = document.createElement("img");
  let upImg = document.createElement("img");
  let delSpan = document.createElement("span");
  let downSpan = document.createElement("span");
  let upSpan = document.createElement("span");
  let h4 = document.createElement("h4");
  let requiredSign = document.createElement("span");
  let input = document.createElement("input");

  questionItem.className = "question-item";
  detailOperation.className = "detail-operation";
  delBtn.addEventListener("click", deleteItem);
  downBtn.addEventListener("click", moveDown);
  upBtn.addEventListener("click", moveUp);
  delImg.src = "../images/HW_5-1/delete.png";
  delImg.alt = "刪除";
  downImg.src = "../images/HW_5-1/down.png";
  downImg.alt = "下移";
  upImg.src = "../images/HW_5-1/up.png";
  upImg.alt = "上移";
  delSpan.innerHTML = "刪除";
  downSpan.innerHTML = "下移";
  upSpan.innerHTML = "上移";
  requiredSign.className = "required-sign";
  requiredSign.innerHTML = "*";
  delBtn.appendChild(delImg);
  delBtn.appendChild(delSpan);
  downBtn.appendChild(downImg);
  downBtn.appendChild(downSpan);
  upBtn.appendChild(upImg);
  upBtn.appendChild(upSpan);
  detailOperation.appendChild(delBtn);
  detailOperation.appendChild(downBtn);
  detailOperation.appendChild(upBtn);
  questionItem.appendChild(detailOperation);
  questionItem.appendChild(h4);

  if (questionTitle.value === "") {
    document.querySelector("header>span").innerHTML = "請輸入題目！";
    setTimeout(function () {
      document.querySelector("header>span").innerHTML = "";
    }, 2000);
    return;
  } else {
    //簡單防止XSS注入，將用戶輸入先轉化為實體字符
    h4.innerHTML = stringToEntity(questionTitle.value);
    if (required) {
      h4.appendChild(requiredSign);
    }
  }
  //根據問題類型構造對應的節點的字符串
  switch (questionType) {
    case "text":
      input.type = "text";
      required ? input.setAttribute("required", "") : "";
      questionItem.appendChild(input);
      break;
    case "password":
      input.type = "password";
      required ? input.setAttribute("required", "") : "";
      questionItem.appendChild(input);
      break;
    case "number":
      if (!numberInfo(required)) {
        return;
      } else {
        questionItem.appendChild(numberInfo(required));
        break;
      }
    case "textarea":
      let textarea = document.createElement("textarea");
      required ? textarea.setAttribute("required", "") : "";
      questionItem.appendChild(textarea);
      break;
    default:
      let choiceResult = choiceInfo(required);
      if (!choiceResult) {
        return;
      } else {
        let choiceNodes = choiceResult.childNodes;
        let num = choiceNodes.length;
        for (let i = 0; i < num; i++) {
          //每次添加一個節點
          questionItem.appendChild(choiceNodes[0]);
        }
        break;
      }
  }
  //將問題添加到問卷的內容中，并清空原標題
  questionList.appendChild(questionItem);
  questionTitle.value = "";
}

/**
 * 簡單防止XSS注入，將用戶輸入先轉化為實體字符
 * @param {String} str 需要轉化的字符串
 * @return {String} 轉化后的字符串
 */
function stringToEntity(str) {
  let div = document.createElement('div');
  //利用textContent屬性轉化"<",">","&","'"等為實體字符
  div.textContent = str;
  return div.innerHTML;
}

/**
 *  清空上一次題目的標題和預覽內容
 */
function clearLastInfo() {
  document.querySelector(".question-title").value = "";
  //找到問題預覽父元素
  let questionPreview = document.querySelector(".question-preview");
  while (questionPreview.hasChildNodes()) {
    questionPreview.removeChild(questionPreview.firstChild);      //删除子节点
  }
}

/**
 * 獲取number類型的相關參數，進行相關提示
 * @param {Boolean} required 是否必填
 * @returns {Object} input節點
 */
function numberInfo(required) {
  let input = document.createElement("input");
  //獲取最大最下值選項的勾選狀況
  let checkMin = document.querySelector("#check-min").checked;
  let checkMax = document.querySelector("#check-max").checked;
  //獲取用戶輸入的最大最小值
  let minValue = document.querySelector("input[name='min-value']").value;
  let maxValue = document.querySelector("input[name='max-value']").value;
  if (checkMax && maxValue === "") {
    document.querySelector("header>span").innerHTML = "請輸入最大值！";
    setTimeout(function () {
      document.querySelector("header>span").innerHTML = "";
    }, 2000);
    return false;
  }
  if (checkMin && minValue === "") {
    document.querySelector("header>span").innerHTML = "請輸入最小值！";
    setTimeout(function () {
      document.querySelector("header>span").innerHTML = "";
    }, 2000);
    return false;
  }
  if (checkMin && checkMax && minValue >= maxValue) {
    document.querySelector("header>span").innerHTML = "最小值大於或等於最大值，請重新輸入！";
    setTimeout(function () {
      document.querySelector("header>span").innerHTML = "";
    }, 2000);
    return false;
  }
  checkMax ? document.querySelector("input[name='max-value']").setAttribute("required", "") : "";
  checkMin ? document.querySelector("input[name='min-value']").setAttribute("required", "") : "";
  input.type = "number";
  checkMin ? input.min = minValue : "";
  checkMax ? input.max = maxValue : "";
  required ? input.setAttribute("required", "") : "";
  return input;
}

/**
 * 獲取單選或多選類型的相關參數，進行相關提示
 * @param {Boolean} required 是否必填
 * @returns {Object} radio或checkbox 節點組合
 */
function choiceInfo(required) {
  //獲取問題預覽父節點的所有子節點
  let childNodesPreview = document.querySelector('.question-preview').childNodes;
  //根據子節點的DOM排列計算出 單選/多選 的選項個數
  let choiceNum = childNodesPreview.length / 3;
  let choiceType = document.querySelector('.first-check').type;
  let questionContent = document.createElement("div");
  let br = document.createElement("br");
  //判斷第幾個選項名稱是否為空
  for (let i = 1; i <= choiceNum; i++) {
    //根據子節點的DOM順序計算出 單選/多選 的選項名稱所在節點位置
    if (childNodesPreview[i * 3 - 1].value === "") {
      document.querySelector("header>span").innerHTML = `請填寫選項 ${i}！`;
      setTimeout(function () {
        document.querySelector("header>span").innerHTML = "";
      }, 2000);
      return false;
    }
  }
  //構造 單選/多選 節點
  for (let i = 1; i <= choiceNum; i++) {
    //判斷某個選項是否需要默認勾選
    let checked = childNodesPreview[i * 3 - 2].checked ? true : false;
    let input = document.createElement("input");
    let label = document.createElement("label");
    let span = document.createElement("span");
    input.type = choiceType;
    input.name = choiceType + nameNum;
    checked ? input.setAttribute("checked", "") : "";
    span.innerHTML = childNodesPreview[i * 3 - 1].value;
    if (i === 1) {
      required ? input.setAttribute("required", "") : "";
    }
    label.appendChild(input);
    label.appendChild(span);
    questionContent.appendChild(label);
    i !== choiceNum ? "" : questionContent.appendChild(br);
  }
  nameNum++;
  return questionContent;
}

/**
 * number類型問題初始化
 */
function numberTpye() {
  let quesPrev = document.querySelector('.question-preview');
  let maxSpan = document.createElement("span");
  let minSpan = document.createElement("span");
  let maxLabel = document.createElement("label");
  let minLabel = document.createElement("label");
  let maxCheck = document.createElement("input");
  let minCheck = document.createElement("input");
  let maxInput = document.createElement("input");
  let minInput = document.createElement("input");
  let maxLabelSpan = document.createElement("span");
  let minLabelSpan = document.createElement("span");
  let maxBr1 = document.createElement("br");
  let maxBr2 = document.createElement("br");
  let minBr = document.createElement("br");
  maxSpan.innerHTML = "最大值";
  minSpan.innerHTML = "最小值";
  maxLabel.for = "check-max";
  minLabel.for = "check-min";
  maxCheck.id = "check-max";
  minCheck.id = "check-min";
  maxCheck.type = minCheck.type = "checkbox";
  maxLabelSpan.innerHTML = "設置最大值";
  minLabelSpan.innerHTML = "設置最小值";
  maxInput.type = minInput.type = "number";
  maxInput.placeholder = "最大數字";
  minInput.placeholder = "最小數字";
  maxInput.name = "max-value";
  minInput.name = "min-value";
  maxLabel.appendChild(maxCheck);
  minLabel.appendChild(minCheck);
  maxLabel.appendChild(maxLabelSpan);
  minLabel.appendChild(minLabelSpan);
  quesPrev.appendChild(maxSpan);
  quesPrev.appendChild(maxLabel);
  quesPrev.appendChild(maxBr1);
  quesPrev.appendChild(maxInput);
  quesPrev.appendChild(maxBr2);
  quesPrev.appendChild(minSpan);
  quesPrev.appendChild(minLabel);
  quesPrev.appendChild(minBr);
  quesPrev.appendChild(minInput);
}

/**
 * textarea類型問題初始化
 */
function textareaType() {
  let textArea = document.createElement('textarea');
  document.querySelector('.question-preview').appendChild(textArea);
}
/**
 * radio類型問題初始化
 */
function radioTpye() {
  let quesPrev = document.querySelector('.question-preview');
  let span = document.createElement("span");
  let radio1 = document.createElement("input");
  let radio2 = document.createElement("input");
  let textInput1 = document.createElement("input");
  let textInput2 = document.createElement("input");
  let br = document.createElement("br");
  span.innerHTML = "選&emsp;&emsp;項";
  radio1.type = radio1.name = radio2.type = radio2.name = "radio";
  radio1.className = "first-check";
  textInput1.type = textInput2.type = "text";
  textInput1.placeholder = "請輸入選項名稱";
  textInput2.placeholder = "雙擊新增選項";
  textInput1.setAttribute("required", "");
  textInput2.setAttribute("required", "");
  textInput2.className = "add-choice";
  textInput2.addEventListener("dblclick", addChoice);
  quesPrev.appendChild(span);
  quesPrev.appendChild(radio1);
  quesPrev.appendChild(textInput1);
  quesPrev.appendChild(br);
  quesPrev.appendChild(radio2);
  quesPrev.appendChild(textInput2);
}

/**
 * checkbox類型問題初始化
 */
function checkType() {
  let quesPrev = document.querySelector('.question-preview');
  let span = document.createElement("span");
  let check1 = document.createElement("input");
  let check2 = document.createElement("input");
  let textInput1 = document.createElement("input");
  let textInput2 = document.createElement("input");
  let br = document.createElement("br");
  span.innerHTML = "選&emsp;&emsp;項";
  check1.type = check1.name = check2.type = check2.name = "checkbox";
  check1.className = "first-check";
  textInput1.type = textInput2.type = "text";
  textInput1.placeholder = "請輸入選項名稱";
  textInput2.placeholder = "雙擊新增選項";
  textInput1.setAttribute("required", "");
  textInput2.setAttribute("required", "");
  textInput2.className = "add-choice";
  textInput2.addEventListener("dblclick", addChoice);
  quesPrev.appendChild(span);
  quesPrev.appendChild(check1);
  quesPrev.appendChild(textInput1);
  quesPrev.appendChild(br);
  quesPrev.appendChild(check2);
  quesPrev.appendChild(textInput2);
}

/**
 * 雙擊新增 單選/多選 選項
 */
function addChoice() {
  //獲取問題預覽的父節點
  let questionPreview = document.querySelector('.question-preview');
  //最後一個input元素的前一個元素，即最後一個 單選/多選 元素
  let lastChoice = this.previousSibling;
  //克隆 單選/多選 元素
  let choice = lastChoice.cloneNode();
  //創建 文本輸入元素 和 <br/>
  let input = document.createElement('input');
  let br = document.createElement('br');//換行
  //給新元素賦值，除掉最後一個元素的值
  input.type = "text";
  input.placeholder = "請輸入選項名稱 （DELETE鍵刪除選項）";
  input.value = this.value;
  input.required = " ";
  this.value = "";
  lastChoice.checked = false;
  //設置按鍵按下事件監聽器
  input.addEventListener("keydown", deleteChoice);
  questionPreview.insertBefore(choice, lastChoice); //先插入 單選/多選 元素
  questionPreview.insertBefore(input, lastChoice); //再插入 input[type="text"] 元素
  questionPreview.insertBefore(br, lastChoice); //最後插入一個換行
}

/**
 * DELETE鍵刪除單選或多選選項預覽
 */
function deleteChoice() {
  let questionPreview = document.querySelector('.question-preview');
  //delete鍵keyCode為46
  if (event.keyCode === 46) {
    questionPreview.removeChild(this.previousSibling);
    questionPreview.removeChild(this.nextSibling);
    questionPreview.removeChild(this);
  }
}
/**
 * 上移功能
 */
function moveUp() {
  let currentNode = this.parentNode.parentNode;//按鈕父节点的父节点，即question-item
  let parentNode = currentNode.parentNode;//question-list，即整个问卷div
  if (currentNode !== parentNode.firstChild) {
    let upNode = currentNode.previousSibling;
    parentNode.insertBefore(currentNode, upNode);//相當於交换节点位置
  } else {
    document.querySelector("header>span").innerHTML = "第一题，无法上移!";
    setTimeout(function () {
      document.querySelector("header>span").innerHTML = "";
    }, 2000);
  }
}
/**
 * 下移功能
 */
function moveDown() {
  let currentNode = this.parentNode.parentNode;//按鈕父节点的父节点，即question-item
  let parentNode = currentNode.parentNode;//question-list，即整个问卷div
  if (currentNode !== parentNode.lastChild) {
    let dwNode = currentNode.nextSibling;
    parentNode.insertBefore(dwNode, currentNode);//相當於交换节点位置
  } else {
    document.querySelector("header>span").innerHTML = "最后一题，无法下移!";
    setTimeout(function () {
      document.querySelector("header>span").innerHTML = "";
    }, 2000);
  }
}
/**
 * 刪除功能
 */
function deleteItem() {
  let currentNode = this.parentNode.parentNode;//按鈕父节点的父节点，即question-item
  let parentNode = currentNode.parentNode;//question-list，即整个问卷div
  parentNode.removeChild(currentNode);//删除子节点
}

/**
 * 保存問卷
 */
function save() {
  if (document.querySelector(".question-list").innerHTML === "") {
    document.querySelector("header>span").innerHTML = "問卷內容為空！";
    setTimeout(function () {
      document.querySelector("header>span").innerHTML = "";
    }, 2000);
    return;
  }
  if (typeof localStorage === 'undefined') {
    document.querySelector("header>span").innerHTML = "浏览器不支持localStorage，推荐使用Chrome！";
    setTimeout(function () {
      document.querySelector("header>span").innerHTML = "";
    }, 2000);
  } else {
    localStorage.questionList = document.querySelector(".question-list").innerHTML;
    document.querySelector("header>span").innerHTML = "已保存！";
    setTimeout(function () {
      document.querySelector("header>span").innerHTML = "";
    }, 2000);
    window.open("./questions.html");
  }
}