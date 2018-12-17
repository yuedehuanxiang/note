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
      response.write("index");
      break;
    case "/list":
      response.write("list");
      break;
    default:
      response.write("others");
      break;
  }
  response.end();
})

 // 80 默认,约定 给 http 使用
 server.listen(8080, "0.0.0.0");