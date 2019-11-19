/**
 * @Name: HW_10-1.js
 * @Description: 抽獎機前臺
 * @Author: 李瑞豪
 * @Update: 2019-10-17 16:37
 */

$(document).ready(function () {
  $(".welcome").dialog({
    autoOpen: false, //設置初始不可見
    modal: true, //设置对话框外无法操作
    resizable: false, //不可調整大小
    show: {
      effect: "bounce",
      duration: 1000
    },
    hide: {
      effect: "drop",
      duration: 200
    },
    buttons: {
      "開始抽獎": function () {
        $(this).dialog("close");
      }
    }
  });
  $(".prize").dialog({
    autoOpen: false,
    modal: true,
    resizable: false,
    show: {
      effect: "clip",
      duration: 500
    },
    hide: {
      effect: "drop",
      duration: 200
    },
    close: function () {
      $("[src$='boom_box.png']")[0].src = "../images/HW_10-1/prize_box.png";
      getRandom();
    },
    buttons: {
      "再抽一次": function () {
        $(this).dialog("close");
      }
    }
  });

  //隨機獲取寶箱位置,設置監聽
  getRandom();
  setTimeout(function () {
    $(".welcome").dialog("open");
  }, 2000);
});

/**
 * 爆炸圖片替換 延時2s抽取獎品 顯示結果
 */
function showPrize() {
  this.src = "../images/HW_10-1/boom_box.png";
  $("#ui-id-4").html("抽抽樂");
  $(".prize>p").html("正在開獎，請稍等...");
  $(".prize").dialog("open");
  setTimeout(function () {
    $.ajax({
      url: "index.php",
      method: "POST",
      dataType: "json",
      success: function (response) {
//        var prize = JSON.parse(response);
        if (response.rp_id !== null) {
          $("#ui-id-4").html("中獎啦！");
          $(".prize>p").html(`恭喜你獲得： ${response.rp_name}`);
        } else if (response.rp_name === "謝謝惠顧") {
          $("#ui-id-4").html("謝謝惠顧！");
          $(".prize>p").html("長得帥的人早晚會中獎！");
        } else if (response.rp_name === "獎品告罄") {
          $("#ui-id-4").html("獎品告罄！");
          $(".prize>p").html("請前往後臺添加獎品后重試！");
        }
      },
      error: function () {
        $("#ui-id-4").html("加載失敗！");
        $(".prize>p").html("數據加載失敗！請檢查網絡連接或反饋管理員。");
        console.log("數據加載失敗！請檢查網絡連接或反饋管理員。");
      }
    });
  }, 2000);
}

/**
 * 生成兩個隨機數作為寶箱的位置后設置監聽
 */
function getRandom() {
  let imgTop, imgLeft;
  $(".prize-img").off("click");
  let timer = setInterval(function () {
    for (let i = 1; i <= 6; i++) {
      //在單獨的盒子里獲取隨機位置
      imgTop = Math.floor(Math.random() * 70) + "%";
      imgLeft = Math.floor(Math.random() * 60) + "%";
      $(`.prize-box:nth-child(${i})>.prize-img`).css("top", imgTop);
      $(`.prize-box:nth-child(${i})>.prize-img`).css("left", imgLeft);
    }
  }, 400);
  setTimeout(function () {
    clearInterval(timer);
    $(".prize-img").on("click", showPrize);
  }, 2000);
}