/**
 * @Name: prize_admin.js
 * @Description: HW_10-1獎品列表
 * @Author: 李瑞豪
 * @Update: 2019-10-17 11:35
 */

$(document).ready(function () {
//新增模态框
  $(".add-data").dialog({
    autoOpen: false, //設置初始不可見
    modal: true, //设置对话框外无法操作
    resizable: false, //不可調整大小
    show: {
      effect: "clip",
      duration: 200
    },
    hide: {
      effect: "drop",
      duration: 200
    },
    close: function () {
      $(".add-name").removeClass("active");
    },
    buttons: {
      "取消": function () {
        $(this).dialog("close");
      },
      "儲存": addData //新增函數
    }
  });
  //修改模态框
  $(".revise-data").dialog({
    autoOpen: false,
    modal: true,
    resizable: false,
    show: {
      effect: "highlight",
      duration: 200
    },
    hide: {
      effect: "drop",
      duration: 200
    },
    close: function () {
      $(".revise-name").parent().parent().removeClass("selected");
    },
    buttons: {
      "取消": function () {
        $(this).dialog("close");
      },
      "儲存": modifyData //修改函數
    }
  });
  //删除模态框
  $(".del-data").dialog({
    title: "刪除獎品",
    autoOpen: false,
    modal: true,
    resizable: false,
    show: {
      effect: "bounce",
      duration: 200
    },
    hide: {
      effect: "drop",
      duration: 200
    },
    close: function () {
      $(".del-name").parent().parent().removeClass("selected");
    },
    buttons: {
      "取消": function () {
        $(this).dialog("close");
      },
      "確認": delData //刪除函數
    }
  });
  //重置模态框
  $(".reset-data").dialog({
    title: "重置獎品",
    autoOpen: false,
    modal: true,
    resizable: false,
    show: {
      effect: "bounce",
      duration: 200
    },
    hide: {
      effect: "drop",
      duration: 200
    },
    close: function () {
      $(".reset-time").removeClass("active");
    },
    buttons: {
      "取消": function () {
        $(this).dialog("close");
      },
      "確認": resetData
    }
  });

//取消enter鍵預設動作
  $(document).on("keypress", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
  //查詢按鈕点击事件監聽
  $(".sel-all").on("click", function () {
    queryData(1);
  });
  $(".sel-part").on("click", function () {
    queryData(2);
  });
  //新增按鈕点击事件監聽
  $(".add-name").on("click", function () {
    $(this).addClass("active");
    $("#ui-id-2").html("新增獎品");
    $(".add-data").dialog("open"); //打開dialog
  });
  $(".reset-time").on("click", function () {
    $(this).addClass("active");
    $(".reset-data").dialog("open");
  });
  //查詢 初始化页面数据
  queryData(1);
});
/**
 * 查詢數據請求
 * @param {number} selType 查詢的類型
 */
function queryData(selType) {
  if (selType === 1) {
    $(".sel-part").removeClass("active").prev().addClass("active");
  } else {
    $(".sel-all").removeClass("active").next().addClass("active");
  }
  $.ajax({
    url: "admin_api.php",
    method: "POST",
    dataType: "json",
    data: {
      operType: 1, //查詢
      selType: selType //查詢的類型
    },
    success: function (response) {
      loadData(response);
    },
    error: function () {
      $("tbody").empty().append("<tr><td colspan='6'>數據加載失敗！請檢查網絡連接或反饋管理員。</td></tr>");
      $(".prize-count>span").html(0);
    }
  });
}


/**
 * 加載數據顯示到頁面上
 * @param {array} res ajax請求後臺返回的json數組
 */
function loadData(res) {
  if (res.length === 0) {
    $("tbody").empty().append("<tr><td colspan='6'>數據庫獎品為空！請新增獎品。</td></tr>");
    return; //數據庫為空時提前結束
  }
  $("tbody").empty();
  //查詢全部的操作
  for (var i = 0; i < res.length; i++) {
    var obj = res[i];
    var id = obj.rp_id;
    var name = obj.rp_name;
    var createDate = obj.rp_create_datetime;
    var btnGroup = "<td></td><td></td>";
    if (obj.rp_used_datetime === null) {
      var usedDate = "尚未領取";
      btnGroup = "<td><button class='revise-name'>修改</button></td>"
              + "<td><button class='del-name'>刪除</button></td>";
    } else {
      var usedDate = obj.rp_used_datetime;
    }
    $("tbody").append(`<tr><td>${id}</td><td class='${id}'>${name}</td>`
            + `<td>${createDate}</td><td>${usedDate}</td>${btnGroup}</tr>`);
  }
  //加載完數據再設置監聽
  $(".revise-name").on("click", function () {
    $(this).parent().parent().addClass("selected");
    //獲取原來的獎品名稱和獎品Id并向dialog傳遞參數
    var prizeId = parseInt($(this).parent().parent().children("td:nth-child(1)").text());
    var prizeName = $(`.${prizeId}`).text();
    $(".revise-data input").val(prizeName);
    $("#ui-id-4").html("修改獎品");
    $(".revise-data").data("prizeId", prizeId).dialog("open"); //將數據儲存在element上
  });
  $(".del-name").on("click", function () {
    $(this).parent().parent().addClass("selected");
    //獲取獎品prizeId并向dialog傳遞參數prizeId
    var prizeId = parseInt($(this).parent().parent().children("td:nth-child(1)").text());
    $(".del-data").data("prizeId", prizeId).dialog("open");
  });
  //統計
  $(".prize-count>span").html($("tbody>tr").length);
}

/**
 * 删除確認處理
 */
function delData() {
  // 當前行數據的ID
  var prizeId = $(this).data("prizeId");
  $.ajax({
    url: "admin_api.php",
    method: "POST",
    dataType: "json",
    data: {
      operType: 2, //删除
      prizeId: prizeId, //獎品ID
      selType: $(".sel-all").hasClass("active") ? 1 : 2 //查詢回顯類型
    },
    success: function (response) {
      loadData(response);
    },
    error: function () {
      $("tbody").empty().append("<tr><td colspan='6'>數據加載失敗！請檢查網絡連接或反饋管理員。</td></tr>");
      $(".prize-count>span").html(0);
    }
  });
  $(this).dialog("close");
}

/**
 * 修改確認處理
 */
function modifyData() {
  var prizeId = $(this).data("prizeId"); //當前行數據的ID
  var prizeName = $(`.${prizeId}`).text(); //獎品名稱
  var modifyName = $("#revise-prize").val(); //修改後的獎品名稱
//  $('.revise-data>form').serialize();
  if (allSpace(modifyName)) {
    $("#revise-prize").val("");
    $("#ui-id-4").html("獎品名稱不能為空！");
  } else {
    if (modifyName !== prizeName) {
      $.ajax({
        url: "admin_api.php",
        method: "POST",
        dataType: "json",
        data: {
          operType: 3, //修改
          prizeId: prizeId, //獎品ID
          prizeName: modifyName, //獎品名稱
          selType: $(".sel-all").hasClass("active") ? 1 : 2 //查詢回顯類型
        },
        success: function (response) {
          loadData(response);
        },
        error: function () {
          $("tbody").empty().append("<tr><td colspan='6'>數據加載失敗！請檢查網絡連接或反饋管理員。</td></tr>");
          $(".prize-count>span").html(0);
        }
      });
    }
    $(this).dialog("close");
  }
}

/**
 * 新增確認處理
 */
function addData() {
  if (allSpace($("#add-prize").val())) {
    $("#add-prize").val("");
    $("#ui-id-2").html("獎品名稱不能為空！");
  } else {
    var prizeName = $("#add-prize").val();
    $.ajax({
      url: "admin_api.php",
      method: "POST",
      dataType: "json",
      data: {
        operType: 4, //新增
        prizeName: prizeName,
        selType: $(".sel-all").hasClass("active") ? 1 : 2
      },
      success: function (response) {
        loadData(response);
      },
      error: function () {
        $("tbody").empty().append("<tr><td colspan='6'>數據加載失敗！請檢查網絡連接或反饋管理員。</td></tr>");
        $(".prize-count>span").html(0);
      }
    });
    $("#add-prize").val("");
    $(this).dialog("close");
  }
}

/**
 * 重置已領取獎品
 */
function resetData() {
  $.ajax({
    url: "admin_api.php",
    method: "POST",
    dataType: "json",
    data: {
      operType: 5, //重置
      selType: $(".sel-all").hasClass("active") ? 1 : 2
    },
    success: function (response) {
      loadData(response);
    },
    error: function () {
      $("tbody").empty().append("<tr><td colspan='6'>數據加載失敗！請檢查網絡連接或反饋管理員。</td></tr>");
      $(".prize-count>span").html(0);
    }
  });
  $(this).dialog("close");
}

/**
 * 判斷字串是否全為空格
 * @param {string} str 需要判斷的字符串
 * @return {boolean} 判斷結果
 */
function allSpace(str) {
  var temp = str.replace(/\s+/g, "");
  if (temp.length === 0) {
    return true;
  } else {
    return false;
  }
}
