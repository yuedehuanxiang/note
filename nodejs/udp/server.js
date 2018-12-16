/**
 * 
 * 
 */

 const dgram = require("dgram");

 const serverSocket = dgram.createSocket("udp4"); // ipv4

 serverSocket.bind(12345, "127.0.0.1");

 serverSocket.on("listening", () => {
   console.log("服务器开启成功，等待数据。。。");
 });

 serverSocket.on("message", data => {
   console.log(data.toString());
 })

