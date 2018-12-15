/* 
 Buffer 对象 
  用于操作二进制数据的类
    类似数组
    长度固定
    只能操作二进制数据
  Buffer 类在nodejs中是一个全局变量，因此无需引入

*/
// process.stdin.on("data", data => {
//   console.log(data);
// })

// let bf1 = new Buffer(4); // 创建一个占 4 个字节的Buffer对象
// console.log(bf1); // 只支持写入二进制的值(允许 进制 之间的 转换) 2 8 10 16 进制
// bf1[0] = 96; // 十进制的96 转换十六进制 60 最后输出的是 <Buffer 60 00 00 00>
// console.log(bf1);


// unicode编码 和 acsii 不一样 ，而且同样是 unicode 编码 UTF-8下一个中文占3个字节，但是在GBK下占2个字节
// let bf2 = new Buffer('c'); // <Buffer 63> // 一个英文占了1个字节
// console.log(bf2);
// let bf3 = new Buffer("一"); // <Buffer e4 b8 80> // 一个 中文占了3个字节
// console.log(bf3);

console.log('陈帅'.length);  // 2
console.log(Buffer.byteLength("陈帅")); // 6 