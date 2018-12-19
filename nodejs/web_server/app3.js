const http = require("http");
const fs = require("fs");
const Mime = require("./libs/Mime");
let users = [
  {
    name: "reci",
    skills: ["美女", "声柔"]
  },
  {
    name: "cs",
    skills: ["程序员", "死宅"]
  }
];
const app = http.createServer((req, res) => {
  let content = "";

  /**
   * 把动态与静态资源进行区分：url
   * 约定：以 /static 开头的都算是静态，我把约定的静态文件都放在了 /static 对应的目录下
   */
  if (req.url.startsWith("/static")) {
    sendStatic(__dirname + req.url);
  } else {
    // 动态
    switch (req.url) {
      case "/user":
        res.setHeader("Content-Type", "application/json");
        let data = users.map(user => user.name);
        res.end(JSON.stringify(data));
        break;
    }
  }

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
