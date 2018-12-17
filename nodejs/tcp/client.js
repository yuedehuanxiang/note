const net = require("net");

/**
 * 创建客户端与udp不同
 * net.Socket 类
 *  1. new net.Socket()
 *  2. net.createConnection()
 */

 // 要连接的目标主机的地址以及端口号
 const clientSocket = net.createConnection(12345, "127.0.0.1");

 // 监听数据传输
 clientSocket.on("data", data => {
   console.log("服务器返回：", data.toString());
  //  clientSocket.write("get money");
 })