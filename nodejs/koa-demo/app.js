const Koa = require("koa");

const app = new Koa();

// 注册中间件函数
app.use((ctx, next) => {
  console.log(1);
  ctx.body = "hello koa2";
  next();
  console.log(3);
});

app.use((ctx, next) => {
  console.log(2);
  ctx.body += "!!!";
});

app.listen(8080);
