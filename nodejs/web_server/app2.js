const http = require("http");
const fs = require("fs");
const Mime = require("./libs/Mime");
const app = http.createServer((req, res) => {
  let content = "";
  sendStatic(__dirname + req.url);

  function sendStatic(filename, headers = { "Content-Type": "text/html;charset=utf-8" }, statusCode = 200) {
    if (fs.existsSync(filename)) {
      let ext = filename.substring(filename.lastIndexOf(".") + 1);
      console.log(ext);
      if (!ext) {
        ext = "tet";
      }
      // 根据扩展名输出对应的MIME
      headers["Content-Type"] = Mime.getType(ext);
      res.writeHead(statusCode, http.STATUS_CODES[statusCode], headers);
      content = fs.readFileSync(filename);
      res.end(content);
    } else {
      sendStatic(__dirname + "/static2/404.html", { "Content-Type": "text/html;charset=utf-8" }, 404);
    }
  }
});

app.listen(8080, () => {
  // 不写host默认是0.0.0.0
  console.log("服务器启动成功了");
});
