$(() => {
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,18}$/, "密码必须6~18位,且不能出现空格"],
    samePwd: (value) => {
      if (value === $("[name=oldPwd]").val()) return "新密码不能与旧密码相同";
    },
    rePwd: (value) => {
      if (value !== $("[name=newPwd]").val()) return "两次密码输入不一致";
    },
  });

  $(".layui-form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/updatepwd",
      data: $(".layui-form").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        $(".layui-form")[0].reset();
      },
    });
  });
});
