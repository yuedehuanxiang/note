/**
 * usage: node miaov app -i
 *  miaov : 我们的脚本文件
 *  app : 要生成的项目的名称
 *  -i : 参数，表示是否要同时生成index.html文件
 */

 const fs = require("fs");

 // 通过 process 获取用户要生成的项目名称
//  console.log(process.argv);
let appName = process.argv[2];
// 根据项目名称生成指定目录
let appPath = __dirname + "/" + appName;
if ( fs.existsSync(appPath) ) {
  console.log("项目已经存在了，请勿重复创建");
  process.exit();
}
fs.mkdirSync(appPath);
fs.mkdirSync(appPath + "/images");
fs.mkdirSync(appPath + "/css");
fs.mkdirSync(appPath + "/js");

if (process.argv.includes("-i")) {
  fs.writeFileSync(appPath + "/index.html", `
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <h1>app</h1>
    </body>
    </html>
  `);
}

console.log("项目创建完成!");
