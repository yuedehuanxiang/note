// 文件夹模块

/*
当我们导入的模块名称是一个文件夹的时候
1.读取文件夹下的package.json 文件
2.导入package.json文件中main选项指定的文件
3.如果不存在package.json文件或者main没指定文件的话，则默认自动导入模块文件夹下的index.js

*/

// let m1 = require('./m1')  // 默认读取改文件夹下的index.js,但是也可以根据package.json 文件改变


/*
如果我们导入的模块是在node_modules目录下的，又会又另外一套规则
1. 如果模块的加载是以 ./ ../ / 开始的，那么就是路径模块加载模式
2. 不以 ./ ../ / 开始的，按照另外一种加载机制进行加载
    打印 module.paths 返回的是一个数组 里面保存的就是这种非路径加载模式需要查找的路径列表
    会一层一层的往上找

非路径的加载模式其实还有其他几种情况
1. 设置全局模块
2. 核心模块 core modules 比如 fs , http 模块
*/
console.log(module);
//let m2 = require("./node_modules/m2") 
let m2 = require("m2"); //不必像上面那样引入 可以直接这么写效果是一样的
console.log(m2);

/*
模块文件后缀机制
  文件 > .js > .json > .node
*/