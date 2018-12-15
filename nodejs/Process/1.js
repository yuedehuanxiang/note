// argv : 用来获取当前运行node程序的相关参数
// 如果运行 node 1 -v process.argv 数组中会多一项[..,.., '-v'] 这样我们就能通过
// 判断 process.argv.includes('-v') 来实现很多自定义逻辑

// console.log(process);
// console.log(process.argv);

console.log(process.env); // 会打印系统中的环境变量

if (process.env.mode == "dev") {
  console.log("现在是开发模式，会打印警告信息");
} else {
  console.log("生产模式，不打印");
}
