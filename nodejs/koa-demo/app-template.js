const Koa = require("koa");
const koaStaticCache = require("koa-static-cache");
const Router = require("koa-router");
const Swig = require("koa-swig");
const Co = require("co");
const app = new Koa();

app.use(
  koaStaticCache(__dirname + "/static", {
    prefix: "/public" // 如果当前请求的url是以/public开始的，则作为静态资源请求
  })
);

let users = [{ username: "mt" }, { username: "reci" }, { username: "kimoo" }];
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "index";
});

const render = Swig({
  root: __dirname + "/views",
  autoescape: true,
  cache: false,
  ext: "html"
});
app.context.render = Co.wrap(render);
router.get("/list", async (ctx, next) => {
  ctx.body = await ctx.render("list.html", { users });
});

// 把路由对象挂载到app对象中
app.use(router.routes());

app.use((ctx, next) => {});

app.listen(8080);
