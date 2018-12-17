/**
 * 在node中，tcp协议，基于net模块来实现的
 */

 const net = require("net");

 /**
  * 创建一个服务器端
  *   1. 监听地址以及端口
  *   2. 处理发送到当前监听地址以及端口的数据
  *   3. 返回（发送）数据到连接的客户端
  * 
  * net.Server 类
  *   new net.Server()
  *   net.createServer()  =>  return new net.Server()
  */

  const server = net.createServer();

  //当有客户端连接的时候
  server.on("connection", socket => {
    // socket => 当前连接的socket对象
    console.log("有人连接来");
    socket.write("hello");
    // socket.on("data", data => {
    //   console.log(data.toString());
    //   socket.write("show me the money");
    // })
  });

  /**
   * 监听地址以及端口
   */

  server.listen(12345, "127.0.0.1");