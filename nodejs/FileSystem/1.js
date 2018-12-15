const fs = require("fs");

// 如果目录不存在，创建文件就会失败
// first error node 中的一种约定，如果一个回调可能有错误情况，那么约定
// 回调函数的第一个参数专门用来提供错误对象
// fs.writeFile("./1.txt", "hello", (err) => {  // 异步写入文件
//   console.log(err); // 如果成功是null ，失败则会打印一个错误对象
//   console.log("文件写入成功");
// })

// let res = fs.writeFileSync("./1.txt", "bilibili"); // 同步写入如果有错误，我们可以通过try catch 来实现
// console.log(res); // undefined

// try {
//   let res = fs.writeFileSync("./aa/1.txt", "miaov");
//   console.log("写入成功");
// } catch(e) {
//   console.log(e);
// }

// fs.appendFileSync("./1.txt", "我是追加的内容");

// let content = fs.readFileSync("./1.txt");
// console.log(content);
// console.log(content.toString());

// let info = fs.statSync("./data");
// console.log(info); // 这个info对象不仅有文件的很多基本信息，下面还有很多方法，比如isFile可以判断当前对象是文件还是文件夹
// console.log(info.isFile());

// 递归删除文件夹
rmdir("./a");
function rmdir(dirPath) {
  let files = fs.readdirSync(dirPath);
  files.forEach( child => {
    let childPath = dirPath + "/" +child;
    if (fs.statSync(childPath).isDirectory()) {
      rmdir(childPath);
    } else {
      fs.unlinkSync(childPath);
    }
  });
  fs.rmdirSync(dirPath);
}