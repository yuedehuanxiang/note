const Koa = require("koa");
const koaStaticCache = require("koa-static-cache");
const Router = require("koa-router");
const app = new Koa();

app.use(
  koaStaticCache(__dirname + "/static", {
    prefix: "/public" // 如果当前请求的url是以/public开始的，则作为静态资源请求
  })
);

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "hello";
});

// 动态路由参数
router.get("/goods/:id", (ctx, next) => {
  ctx.body = "商品名称：" + ctx.params.id;
});

// 重定向
router.redirect("/admin", "/user", 301);

// 子路由 写法1
const userRouter = new Router();

userRouter.get("/", (ctx, next) => {
  ctx.body = "用户首页";
});

userRouter.get("/address", (ctx, next) => {
  ctx.body = "用户收获地址";
});

router.use("/user", userRouter.routes());

// 子路由 写法2
const itemRouter = new Router({
  prefix: "/item"
});

itemRouter.get("/add", (ctx, next) => {
  ctx.body = "添加商品";
});

router.use(itemRouter.routes());

// 把路由对象挂载到app对象中
app.use(router.routes());

app.use((ctx, next) => {});

app.listen(8080);
