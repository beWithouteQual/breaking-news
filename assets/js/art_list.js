$(() => {
  var data = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };

  initTable();

  function initTable() {
    $.ajax({
      type: "get",
      url: "/my/article/list",
      data: data,
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
        renderPage(res.total);
      },
    });
  }
  template.defaults.imports.dataFormat = (value) => {
    const date = new Date(value);

    var y = date.getFullYear();
    var m = padZero(date.getMonth() + 1);
    var d = padZero(date.getDate());

    var hh = padZero(date.getHours());
    var mm = padZero(date.getMinutes());
    var ss = padZero(date.getSeconds());

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  };

  function padZero(n) {
    return n.toString().padStart(2, "0");
  }

  initCate();

  function initCate() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        var htmlStr = template("tpl-cate", res);
        $("#cateId").html(htmlStr);
        layui.form.render();
      },
    });
  }

  $(".layui-form").on("submit", (e) => {
    e.preventDefault();

    let formData = $(".layui-form").serializeArray();

    formData.forEach((value) => {
      data[value.name] = value.value;
    });

    initTable();
  });

  function renderPage(total) {
    layui.laypage.render({
      elem: "pageBox", // 分页容器的 Id
      count: total, // 总数据条数
      limit: data.pagesize, // 每页显示几条数据
      curr: data.pagenum, // 设置默认被选中的分页
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 10], // 每页展示多少条
      // 分页发生切换的时候，触发 jump 回调
      jump: function (obj, first) {
        // 把最新的页码值，赋值到 q 这个查询参数对象中
        data.pagenum = obj.curr;
        data.pagesize = obj.limit;
        if (!first) {
          initTable();
        }
      },
    });
  }

  $("tbody").on("click", ".btn-delete", (e) => {
    var id = e.target.getAttribute("data-id");
    var len = $(".btn-delete").length;
    layer.confirm("是否删除?", { icon: 3, title: "提示" }, (index) => {
      $.ajax({
        method: "get",
        url: "/my/article/delete/" + id,
        success: (res) => {
          if (res.status !== 0) return layer.msg(res.message);
          layer.msg(res.message);

          if (len === 1) {
            data.pagenum = data.pagenum === 1 ? 1 : data.pagenum - 1;
          }
          initTable();
        },
      });

      layer.close(index);
    });
  });
});
