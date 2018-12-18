const http = require("http");

/**
 * http.Server类
 *  new http.Server()
 *  http.createServer()
 */

 const server = http.createServer();

server.on("request", (request, response) => {
  console.log("接收到了请求");
  // 向客户端返回数据
  // request 本质是net.socket+http协议增加的一些内容
  // console.log(request);
  console.log(request.socket.remoteAddress); // request.socket => net.socket
  switch(request.url) {
    case "/":
      response.setHeader("Content-Type", "text/html"); // MIME  text/plain是纯文本无法识别标签
      response.write("<h1>index</h1>");
      break;
    case "/list":
      response.write("<h1>list</h1>");
      break;
    default:
      // response.writeHead(404, 'bu ok', { //第二个参数可以随便填自己喜欢的个性描述
      //   "content-type": "text/html"
      // });
      response.writeHead(301, http.STATUS_CODES[305], { 
        "Content-Type": "text/html",
        "Location": "/" // 如果有Location这个字段，状态码为301时会自动帮我们重定向
      });
      // response.writeHead(404, http.STATUS_CODES[404], { 
      //   "Content-Type": "text/html"
      // });
      response.write("<h1>404</h1>");
      break;
  }
  response.end();
})

 // 80 默认,约定 给 http 使用
 server.listen(8080, "0.0.0.0");