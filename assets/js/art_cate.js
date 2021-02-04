$(() => {
  initArtCateList();

  function initArtCateList() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: (res) => {
        var htmlStr = template("tpl-user", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  var indexAdd, indexEdit;
  $("#addBtn").on("click", () => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#addDialog").html(),
    });
    //拿到的index是一个重要的凭据，它是诸如layer.close(index)等方法的必传参数。
  });

  $("body").on("submit", "#form-add", (e) => {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/addcates",
      data: $("#form-add").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        initArtCateList();
        layer.msg(res.message);
        layer.close(indexAdd);
      },
    });
  });

  var form = layui.form;

  $("body").on("click", "#editBtn", (e) => {
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#editDialog").html(),
    });

    var id = e.target.parentNode.getAttribute("data-id");

    $.ajax({
      method: "get",
      url: "/my/article/cates/" + id,
      success: (res) => {
        form.val("form-edit", res.data);
      },
    });
  });

  $("body").on("submit", "#form-edit", (e) => {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/updatecate",
      data: $("#form-edit").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });

  $("body").on("click", "#delBtn", (e) => {
    var id = e.target.parentNode.getAttribute("data-id");
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "get",
        url: "/my/article/deletecate/" + id,
        success: (res) => {
          if (res.status !== 0) return layer.msg(res.message);
          layer.msg(res.message);
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });

  
});
