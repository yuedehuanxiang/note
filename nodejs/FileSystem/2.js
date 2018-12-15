// 监听文件或者文件夹 可以用于热更新
// const fs = require("fs");

// fs.watchFile("./1.txt", e => {
//   console.log(e);
//   // console.log("change");
// });

// node 大于 10.0的版本开始支持promise 写法
const fsPromise = require("fs").promises;

fsPromise.mkdir("./b").then(() => {
  console.log("成功");
}).catch(err => {
  console.log(err);
});
