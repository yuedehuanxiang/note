const http = require("http");
const fs = require("fs");

/**
 * http.ClientRequest类
 *  new http.ClientRequest()
 *  http.request()
 */

 // 创建一个客户端（能发http请求）的对象
 let client = http.request({
  // tcp
   host: "127.0.0.1",
   port: 8080,
  // http
   protocol: "http:",
   method: "get",
   path: ""
 }, res => {
  // 这个函数会在服务器相应的时候触发
  // res => socket
  res.on("data", data => {
    console.log(data.toString());
  });
  
 });

 // 请求的发送需要调用下面的方法
 client.write("");
 client.end();