/**
 * @Name: HW_6-1.js
 * @Description: 造型商城
 * @Author: 李瑞豪
 * @Update: 2019-10-08 15:54
 */

$(function () {
  //首頁301重定向
  var path = window.location.href;
  if (path.indexOf("#") !== -1) {
    window.location.replace(window.location.protocol + window.location.pathname);
  }

  var localStorage = window.localStorage;
  // 先判斷localStorage里有沒有數據
  if (localStorage.length !== 0) {
    loadingImg();
  }

  /**
   * 加載保存的穿著
   */
  function loadingImg() {
    $(".bg>img").attr("src", localStorage.bgModel);
    $(".cape>img").attr("src", localStorage.capeModel);
    $(".body>img").attr("src", localStorage.bodyModel);
    $(".trousers>img").attr("src", localStorage.trousersModel);
    $(".laps>img").attr("src", localStorage.lapsModel);
    $(".eye>img").attr("src", localStorage.eyeModel);
    $(".glass>img").attr("src", localStorage.glassModel);
    $(".hair>img").attr("src", localStorage.hairModel);
    $(".hat>img").attr("src", localStorage.hatModel);
    $(".pet>img").attr("src", localStorage.petModel);
  }

  /**
   * 試穿
   */
  $(".try-on").click(function () {
    var img = $(".item-img").eq($(this).index(".try-on")); //找到图片元素
    var imgUrl = img.attr("src"); //獲取圖片鏈接
    var fileName = imgUrl.slice(imgUrl.lastIndexOf("/"), -4); //截取圖片文件名
    var src = `../images/HW_6-2/img/${fileName}.gif`; //template string平湊新的圖片鏈接
    var type = img.attr("name"); //獲取圖片name屬性
    $(`.${type}>img`).attr("src", src); //修改預覽圖片路徑
  });
  $(".item-img").click(function () {
    var imgUrl = $(this).attr("src"); //獲取圖片鏈接
    var fileName = imgUrl.slice(imgUrl.lastIndexOf("/"), -4); //截取圖片文件名
    var src = `../images/HW_6-2/img/${fileName}.gif`; //template string平湊新的圖片鏈接
    var type = $(this).attr("name"); //獲取圖片name屬性
    $(`.${type}>img`).attr("src", src); //修改預覽圖片路徑
  });

  /**
   * 保存當前穿著
   */
  $(".save").click(function () {
    if (typeof localStorage === 'undefined') {
      alert("浏览器不支持localStorage，推荐使用Chrome！");
    } else {
      localStorage.bgModel = $(".bg>img").attr("src");
      localStorage.capeModel = $(".cape>img").attr("src");
      localStorage.bodyModel = $(".body>img").attr("src");
      localStorage.trousersModel = $(".trousers>img").attr("src");
      localStorage.lapsModel = $(".laps>img").attr("src");
      localStorage.eyeModel = $(".eye>img").attr("src");
      localStorage.glassModel = $(".glass>img").attr("src");
      localStorage.hairModel = $(".hair>img").attr("src");
      localStorage.hatModel = $(".hat>img").attr("src");
      localStorage.petModel = $(".pet>img").attr("src");
    }
  });

  /**
   * 恢復原樣
   */
  $(".restore").click(function () {
    $(".bg>img").attr("src", "../images/HW_6-2/img/0000000.gif");
    $(".cape>img").attr("src", "../images/HW_6-2/img/0000000.gif");
    $(".body>img").attr("src", "../images/HW_6-2/img/0500000.gif");
    $(".trousers>img").attr("src", "../images/HW_6-2/img/1210000.gif");
    $(".laps>img").attr("src", "../images/HW_6-2/img/1300001.gif");
    $(".eye>img").attr("src", "../images/HW_6-2/img/0710001.gif");
    $(".glass>img").attr("src", "../images/HW_6-2/img/0000000.gif");
    $(".hair>img").attr("src", "../images/HW_6-2/img/0901011.gif");
    $(".hat>img").attr("src", "../images/HW_6-2/img/0000000.gif");
    $(".pet>img").attr("src", "../images/HW_6-2/img/0000000.gif");
    localStorage.clear(); //將localStorage所有內容清空
  });
});