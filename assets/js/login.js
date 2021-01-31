$(() => {
  $("#login-link").on("click", () =>
    $(".login-box").hide().siblings(".register-box").show()
  );
  $("#register-link").on("click", () =>
    $(".register-box").hide().siblings(".login-box").show()
  );

  var form = layui.form;

  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: (value) => {
      var pwd = $(".register-box [name=password]").val();
      if (pwd !== value) return "两次密码不一致";
    },
  });

  $("#register-form").on("submit", (e) => {
    e.preventDefault();
    var data = {
      username: $(".register-box [name=username]").val(),
      password: $(".register-box [name=password]").val(),
    };
    $.ajax({
      type: "post",
      url: "http://ajax.frontend.itheima.net/api/reguser",
      data,
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
      },
    });
  });

  $("#login-form").on("submit", (e) => {
    e.preventDefault();
    var data = {
      username: $(".loginBox [name=username]").val(),
      password: $(".loginBox [name=password]").val(),
    };
    $.ajax({
      type: "post",
      url: "http://ajax.frontend.itheima.net/api/login",
      data,
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        location.href = "../../index.html";
      },
    });
  });
});
