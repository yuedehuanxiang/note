const Koa = require("koa");
const app = new Koa();

// 捕捉页面错误
// app.use((ctx, next) => {
//   ctx.throw(404, "bu ok");
//   next();
// });

// app.on("error", err => {
//   console.log("错了", err);
// });

app.use((ctx, next) => {
  ctx.response.body = { a: 1, b: 2 }; // ctx.response.body == ctx.body 完全等价的类似的这种别名还有很多详情见官网
  // ctx.attachment("a.txt"); // 自动下载文件
});

app.listen(8080);
