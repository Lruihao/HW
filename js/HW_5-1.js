/**
 * @Name: HW_5-1.js
 * @Description: 問卷管理 - 問卷設計
 * @Author: 李瑞豪
 * @Update: 2019-09-18 11:04
 */

//全局變量，單選或多選的name屬性編號
var nameNum = 0;

//建立窗口鍵盤事件監聽
window.addEventListener("keydown", function () {
  shortcutKeys(event);
});

/**
 * 全局快捷鍵設置函數：
 * 回車/F8 新增問題、F7 打印問卷、Alt+x 清空選項
 * @param {Object} event 鍵盤按下事件對象
 */
function shortcutKeys(event) {
  if (event.keyCode === 13 || event.keyCode === 119) {
    questionAdd();
  } else if (event.keyCode === 118) {
    printDiv();
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
  var questionType = document.querySelector(".question-type").value;
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
  var questionType = document.querySelector(".question-type").value;
  //獲取問卷列表節點
  var questionList = document.querySelector(".question-list");
  //required字段判斷問題是否必選
  var required = document.querySelector("#required-item").checked ? "required" : "";
  //獲取標題
  var questionTitle = document.querySelector(".question-title");
  var questionContent = "<div class='question-item'><div class='detail-operation'>"
          + "<button onclick='deleteItem(this)'>"
          + "<img src='../images/HW_5-1/delete.png' alt='刪除'/>"
          + "<span>删除</span></button>"
          + "<button onclick='moveDown(this)'>"
          + "<img src='../images/HW_5-1/down.png' alt='下移'/>"
          + "<span>下移</span></button>"
          + "<button onclick='moveUp(this)'>"
          + "<img src='../images/HW_5-1/up.png' alt='上移'/>"
          + "<span>上移</span></button></div><h4>";

  if (questionTitle.value === "") {
    alert("請輸入題目！");
    return;
  } else {
    //簡單防止XSS注入，將用戶輸入先轉化為實體字符
    questionContent += stringToEntity(questionTitle.value);
    questionContent += required ? "<span class='required-sign'>*</span></h4>" : "</h4>";
  }
  //根據問題類型構造對應的節點的字符串
  switch (questionType) {
    case "text":
      questionContent += "<input type='text'" + required + "/></div>";
      break;
    case "password":
      questionContent += "<input type='password'" + required + "/></div>";
      break;
    case "number":
      if (numberInfo(required) === "") {
        return;
      } else {
        questionContent += numberInfo(required) + "</div>";
        break;
      }
    case "textarea":
      questionContent += "<textarea " + required + "></textarea></div>";
      break;
    default:
      if (choiceInfo(required) === "") {
        return;
      } else {
        questionContent += choiceInfo(required) + "</div>";
        break;
      }
  }
  //將問題添加到問卷的內容中，并清空原標題
  questionList.innerHTML += questionContent;
  questionTitle.value = "";
}

/**
 * 簡單防止XSS注入，將用戶輸入先轉化為實體字符
 * @param {String} str 需要轉化的字符串
 * @return {String} 轉化后的字符串
 */
function stringToEntity(str) {
  var div = document.createElement('div');
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
  var questionPreview = document.querySelector(".question-preview");
  while (questionPreview.hasChildNodes()) {
    questionPreview.removeChild(questionPreview.firstChild);      //删除子节点
  }
}

/**
 * 獲取number類型的相關參數，進行相關提示
 * @param {String} required 是否必填
 * @returns {String} 詳細的input[type="number"]的字串
 */
function numberInfo(required) {
  //獲取最大最下值選項的勾選狀況
  var checkMin = document.querySelector("#check-min").checked;
  var checkMax = document.querySelector("#check-max").checked;
  //獲取用戶輸入的最大最小值
  var minValue = document.querySelector("input[name='min-value']").value;
  var maxValue = document.querySelector("input[name='max-value']").value;
  //構造最大最小值完整的字符串
  var minStr = checkMin ? "min='" + minValue + "'" : "";
  var maxStr = checkMax ? "max='" + maxValue + "'" : "";
  if (checkMax && maxValue === "") {
    alert("請輸入最大值！");
    return "";
  }
  if (checkMin && minValue === "") {
    alert("請輸入最小值！");
    return "";
  }
  if (checkMin && checkMax && minValue >= maxValue) {
    alert("最小值大於或等於最大值，請重新輸入！");
    return "";
  }
  if (checkMax) {
    document.querySelector("input[name='max-value']").setAttribute('required', '');
  }
  if (checkMin) {
    document.querySelector("input[name='min-value']").setAttribute('required', '');
  }
  return "<input type='number'" + minStr + maxStr + required + "/>";
}

/**
 * 獲取單選或多選類型的相關參數，進行相關提示
 * @param {String} required 是否必填
 * @returns {String} 詳細的radio或checkbox
 */
function choiceInfo(required) {
  //獲取問題預覽父節點的所有子節點
  var childNodesPreview = document.querySelector('.question-preview').childNodes;
  //根據子節點的DOM排列計算出 單選/多選 的選項個數
  var choiceNum = childNodesPreview.length / 3;
  var choiceType = document.querySelector('.first-check').type;
  var questionContent = "";
  //判斷第幾個選項名稱是否為空
  for (var i = 1; i <= choiceNum; i++) {
    //根據子節點的DOM順序計算出 單選/多選 的選項名稱所在節點位置
    if (childNodesPreview[i * 3 - 1].value === "") {
      alert("請填寫選項 " + i + "！");
      return "";
    }
  }
  //構造 單選/多選 的完整的字符串
  for (var i = 1; i <= choiceNum; i++) {
    //判斷某個選項是否需要默認勾選
    var checked = childNodesPreview[i * 3 - 2].checked ? "checked" : "";
    if (i === 1) {
      questionContent += "<label><input type='" + choiceType + "' name='" + choiceType
              + nameNum + "'" + checked + " " + required + "/><span>"
              + childNodesPreview[i * 3 - 1].value + "</span></label>";
    } else {
      questionContent += "<label><input type='" + choiceType + "' name='" + choiceType
              + nameNum + "'" + checked + "/><span>" + childNodesPreview[i * 3 - 1].value
              + "</span></label>";
    }
    questionContent += (i !== choiceNum) ? "" : "<br/>";
  }
  nameNum++;
  return questionContent;
}

/**
 * number類型問題初始化
 */
function numberTpye() {
  document.querySelector('.question-preview').innerHTML += "<span>最大值</span>"
          + "<label for='check-max'><input type='checkbox' id='check-max'/>"
          + "<span>設置最大值</span></label><br/>"
          + "<input type='number' placeholder='最大數字' name='max-value'/><br/>"
          + "<span>最小值</span>"
          + "<label for='check-min'><input type='checkbox' id='check-min'/>"
          + "<span>設置最小值</span></label><br/>"
          + "<input type='number' placeholder='最小數字' name='min-value'/>";
}

/**
 * textarea類型問題初始化
 */
function textareaType() {
  var textArea = document.createElement('textarea');
  document.querySelector('.question-preview').appendChild(textArea);
}
/**
 * radio類型問題初始化
 */
function radioTpye() {
  document.querySelector('.question-preview').innerHTML += "<span>選&emsp;&emsp;項</span>"
          + "<input type='radio' name='radio' class='first-check'/>"
          + "<input type='text' placeholder='請輸入選項名稱' required/><br/>"
          + "<input type='radio' name='radio'/>"
          + "<input type='text' placeholder='雙擊新增選項' class='add-choice' ondblclick='addChoice(this)' required/>";
}

/**
 * checkbox類型問題初始化
 */
function checkType() {
  document.querySelector('.question-preview').innerHTML += "<span>選&emsp;&emsp;項</span>"
          + "<input type='checkbox' name='checkbox' class='first-check'/>"
          + "<input type='text' placeholder='請輸入選項名稱' required/><br/>"
          + "<input type='checkbox' name='checkbox'/>"
          + "<input type='text' placeholder='雙擊新增選項' class='add-choice' ondblclick='addChoice(this)' required/>";
}

/**
 * 雙擊新增 單選/多選 選項
 * @param {Object} lastInput 最後一個輸入框的本身節點對象
 */
function addChoice(lastInput) {
  //獲取問題預覽的父節點
  var questionPreview = document.querySelector('.question-preview');
  //最後一個input元素的前一個元素，即最後一個 單選/多選 元素
  var lastChoice = lastInput.previousSibling;
  //克隆 單選/多選 元素
  var choice = lastChoice.cloneNode();
  //創建 文本輸入元素 和 <br/>
  var input = document.createElement('input');
  var enter = document.createElement('br');//換行
  //給新元素賦值，除掉最後一個元素的值
  input.type = "text";
  input.placeholder = "請輸入選項名稱 （DELETE鍵刪除選項）";
  input.value = lastInput.value;
  input.required = " ";
  lastInput.value = "";
  //設置按鍵按下事件監聽器
  input.setAttribute("onkeydown", "deleteChoice(event,this)");
  questionPreview.insertBefore(choice, lastChoice); //先插入 單選/多選 元素
  questionPreview.insertBefore(input, lastChoice); //再插入 input[type="text"] 元素
  questionPreview.insertBefore(enter, lastChoice); //最後插入一個換行
}

/**
 * DELETE鍵刪除單選或多選選項預覽
 * @param {Object} event 事件對象
 * @param {Object} itself 本身節點對象
 */
function deleteChoice(event, itself) {
  var questionPreview = document.querySelector('.question-preview');
  //delete鍵keyCode為46
  if (event.keyCode === 46) {
    questionPreview.removeChild(itself.previousSibling);
    questionPreview.removeChild(itself.nextSibling);
    questionPreview.removeChild(itself);
  }
}
/**
 * 上移功能
 */
function moveUp(div) {
  var currentNode = div.parentNode.parentNode;//按鈕父节点的父节点，即question-item
  var parentNode = currentNode.parentNode;//question-list，即整个问卷div
  if (currentNode !== parentNode.firstChild) {
    var upNode = currentNode.previousSibling;
    parentNode.insertBefore(currentNode, upNode);//相當於交换节点位置
  } else {
    alert("第一题，无法上移!");
  }
}
/**
 * 下移功能
 */
function moveDown(div) {
  var currentNode = div.parentNode.parentNode;//按鈕父节点的父节点，即question-item
  var parentNode = currentNode.parentNode;//question-list，即整个问卷div
  if (currentNode !== parentNode.lastChild) {
    var dwNode = currentNode.nextSibling;
    parentNode.insertBefore(dwNode, currentNode);//相當於交换节点位置
  } else {
    alert("最后一题，无法下移!");
  }
}
/**
 * 刪除功能
 */
function deleteItem(div) {
  var currentNode = div.parentNode.parentNode;//按鈕父节点的父节点，即question-item
  var parentNode = currentNode.parentNode;//question-list，即整个问卷div
  parentNode.removeChild(currentNode);//删除子节点
}

/**
 * 打印局部問卷
 */
function printDiv() {
  clearLastInfo();
  var headHtml = "<html><head></head><body>";
  var footHtml = "</body>";
  // 获取問題列表中的html内容
  var newHtml = document.querySelector('.question-list').innerHTML;
  // 获取原来的窗口界面body的html内容，并保存起来
  var oldHtml = document.body.innerHTML;

  // 给窗口界面重新赋值，赋自己拼接起来的html内容
  document.body.innerHTML = headHtml + newHtml + footHtml;
  // 调用window.print方法打印新窗口
  window.print();
  // 将原来窗口body的html值回填展示
  document.body.innerHTML = oldHtml;
  return false;
}