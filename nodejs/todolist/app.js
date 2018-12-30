const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const Swig = require("koa-swig");
const Co = require("co");
const koaStaticCache = require("koa-static-cache");

const router = new Router();

const app = new Koa();

// 处理post请求中的数据
app.use(bodyParser({}));

// 处理静态文件
app.use(
  koaStaticCache("./static", {
    prefix: "/static",
    gzip: true
  })
);

// swig模板配置
const render = Swig({
  root: __dirname + "/views",
  autoescape: true, // 是否编码（将字符串解析成html）为了安全起见一般不开启该功能 设置成true
  cache: false, // memory: 把解析后的结果保存在内存中，避免每次访问都去解析模板重新渲染
  ext: "html"
});
app.context.render = Co.wrap(render);

// 测试数据
let datas = {
  maxId: 3,
  appName: "todolist",
  skin: "index.css",
  tasks: [
    { id: 1, title: "测试任务一", done: true },
    { id: 2, title: "测试任务二", done: false },
    { id: 3, title: "测试任务三", done: false }
  ]
};

router.get("/", async (ctx, next) => {
  // ctx.body = "/";
  ctx.body = await ctx.render("index.html", { datas });
});

router.get("/add", async (ctx, next) => {
  ctx.body = await ctx.render("add.html", {
    datas: {
      appName: datas.appName
    }
  });
});

router.post("/posttask", async ctx => {
  // let title1 = ctx.query.title;
  // console.log(title1); 如果在action中拼接？title = xxx 依然能取到值
  // querystring 与当前的请求方式没有任何关系，无论是get 还是 post 它都可以传递数据
  let title = ctx.request.body.title || "";
  // ctx.body = "接收提交的新任务" + title;

  if (!title) {
    ctx.body = await ctx.render("message", {
      msg: "请输入任务标题",
      href: "javascript:history.back();"
    });
    return;
  }

  datas.tasks.push({
    id: ++datas.maxId,
    title: title,
    done: false
  });

  ctx.body = await ctx.render("message", {
    msg: "添加成功",
    href: "/"
  });
});

router.get("/change/:id", (ctx, next) => {
  // ctx.body = "/change/" + ctx.params.id;
  let id = ctx.params.id;
  datas.tasks.forEach(task => {
    if (task.id == id) {
      task.done = !task.done;
    }
  });
  ctx.redirect("/");
});

router.get("/remove/:id", async (ctx, next) => {
  // ctx.body = "/remove/" + ctx.params.id;
  let id = ctx.params.id;
  datas.tasks = datas.tasks.filter(task => task.id != id);

  ctx.body = await ctx.render("message", {
    msg: "删除成功",
    href: "/"
  });
});

// 使用路由
app.use(router.routes());

//监听端口
app.listen(8080);
