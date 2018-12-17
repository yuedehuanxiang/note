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
   host: "www.baidu.com",
   port: 80,
  // http
   protocol: "http:",
   method: "get",
   path: "/img/bd_logo1.png?qua=high"
 }, res => {
  // 这个函数会在服务器相应的时候触发
  let content = Buffer.alloc(0);
  // res => socket
  res.on("data", data => {
    content = Buffer.concat([content , data], content.length + data.length);
  });
  res.on("end", () => {
    fs.writeFileSync("./baidu.png", content);
  })
 });

 // 请求的发送需要调用下面的方法
 client.write("");
 client.end();