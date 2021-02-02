$(() => {
  var form = layui.form;
  form.verify({
    nickname: (value) => {
      if (value.length > 6) return "昵称长度必须在1~6个字符之间!";
    },
  });

  initUserInfo();

  function initUserInfo() {
    $.ajax({
      method: "get",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) {
          return layer.mag(res.message);
        }
        form.val("formUserInfo", res.data);
      },
    });
  }

  $(".layui-form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/userinfo",
      data: $(".layui-form").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        window.parent.getUserInfo();
      },
    });
  });

  $("#resetBtn").on("click", (e) => {
    e.preventDefault();
    initUserInfo();
  });
});
