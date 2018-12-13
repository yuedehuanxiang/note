// argv : 用来获取当前运行node程序的相关参数
// 如果运行 node 1 -v process.argv 数组中会多一项[..,.., '-v'] 这样我们就能通过
// 判断 process.argv.includes('-v') 来实现很多自定义逻辑


// console.log(process);
console.log(process.argv);
