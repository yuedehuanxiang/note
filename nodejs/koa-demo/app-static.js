const Koa = require("koa");
const koaStaticCache = require("koa-static-cache");
const app = new Koa();

app.use(
  koaStaticCache(__dirname + "/static", {
    prefix: "/public" // 如果当前请求的url是以/public开始的，则作为静态资源请求
  })
);

app.use((ctx, next) => {});

app.listen(8080);
