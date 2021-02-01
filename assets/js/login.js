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
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: $("#register-form").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
      },
    });
  });

  $("#login-form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: $("#login-form").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        localStorage.setItem("token", res.token);
        location.href = "../../index.html";
      },
    });
  });
});
