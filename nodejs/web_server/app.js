const http = require("http");
const app = http.createServer((req, res) => {
  // console.log("有人请求了");
  // req: IncomingMessage类的实例对象，保存和提供了当前请求的客户端信息
  // res: ServerResponse类的实例对象，保存和提供了响应的相关方法

  // console.log(req.httpVersion);
  // console.log(req.method);
  // console.log(req.headers);
  // console.log(req.url);

  //向客户端发送数据则需要使用res对象
  //res.write()
  // res.end("hello"); // end里如果传参的话相当于内部调了一次write方法，end是必须的

  //设置并写入头信息 res.writeHead(状态码，状态码描述，头信息)
  //设置头信息 res.setHeader(头信息名称，值) res.setHeader("Content-Type", "text/html;charset=utf-8")
  /**
   * 头信息在设置的时候需要注意的问题
   *  1. 头信息的写入与设置必须在res的write \ end 之前,否则无效
   */
  res.writeHead(200, http.STATUS_CODES[200], {
    "Content-Type": "text/html;charset=utf-8" // type类型和编码一定要设置不然可能会出现乱码
  });

  switch (req.url) {
    case "/":
      res.end("首页");
      break;
    case "/list":
      res.end("列表页面");
      break;
    case "/view":
      res.end("内容页面");
      break;
    default:
      res.writeHead(404, http.STATUS_CODES[404], {
        "Content-Type": "text/html;charset=utf-8" 
      });
      res.end("其他");
      break;
  }
});

app.listen(8080, () => {
  // 不写host默认是0.0.0.0
  console.log("服务器启动成功了");
});
