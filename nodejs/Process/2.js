// node 中的标准输入输出流 

// process.stdout.write("hello");
var fs = require("fs");

// process.stdin.on("data", e => {
//   console.log("用户输入", e.toString()); // 打印用户输入的信息
//   process.exit(); // 结束当前进程
// });

// 在当前目录根据用户输入创建一个文件夹 demo
// process.stdout.write("请输入项目名称：")
// process.stdin.on("data", e => {
//   //console.log("用户输入", e.toString()); // 打印用户输入的信息
//   //fs.mkdirSync(e.toString().replace("\r\n", "")); // windows 下要去掉回车换行符，不然会报错
//   fs.mkdirSync(e.toString()); // mac下可以正常使用
//   process.stdout.write("项目创建成功");
//   process.exit(); // 结束当前进程
// });


