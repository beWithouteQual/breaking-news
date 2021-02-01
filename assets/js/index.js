$(() => {
  function getUserInfo() {
    $.ajax({
      method: "get",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status != 0) return layer.msg(res.message);
        renderAvatar(res.data);
      },
    });
  }
  getUserInfo();

  function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp" + name);
    if (user.user_pic !== null) {
      $(".layui-nav-img").attr("src", user.user_pic).show();
      $(".text-avatar").hide();
    } else {
      $(".layui-nav-img").hide();
      $(".text-avatar").html(name[0].toUpperCase()).show();
    }
  }

  $("#btnLogout").on("click", () => {
    //eg1
    layer.confirm(
      "确认退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        localStorage.removeItem("token");
        location.replace("../../login.html");

        layer.close(index);
      }
    );
  });
});
