const Koa = require("koa");
const app = new Koa();

// 注册中间件函数
app.use((ctx, next) => {
  // console.log(1);
  ctx.body = "<h1>hello koa2";
  next();
  // console.log(3);
});

app.use((ctx, next) => {
  // console.log(2);
  ctx.body += "</h1>";
  next();
});

app.use((ctx, next) => {
  let n = Math.random();
  // ctx.n = n;
  ctx.state.n = n;
  next();
});

app.use((ctx, next) => {
  // console.log(ctx.n); // 这里的ctx其实是同一个，可以取到但是不推荐
  console.log(ctx.state.n); // 建议用这个ctx.state的命名空间
  next();
});

app.listen(8080);
