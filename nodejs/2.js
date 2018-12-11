// 文件类型的模块 (中心思想就是一个文件就是一个模块)

console.log(module.id); //返回的是一个绝对路径

// 实际上
//exports == module.exports // true

//可以这么理解 他们俩者的关系
var module = {
  exports: {}
}
var exports = module.exports

exports.a = 1;
exports.b = 2;
//上面俩行代码相当于只是在 module.exports对象上增加了俩个属性
//而如果你这样改
exports = {
  a: 1,
  b: 2
}
//就相当于直接改了引用关系，在1.js中将引用不到你定义的内容，获取的仍然是module.exports下的空对象
//但是 
module.exports = {
  a: 1,
  b: 2
}
// 这样写是不会有问题的

//总结下来就是 如果你想单个单个导出的话，就用 exports.的方式一个一个来
// 如果你想批量导出一个对象下很多内容的话， 建议用 module.exports = {...} 的方式