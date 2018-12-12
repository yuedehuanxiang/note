// 在node中使用es6的模块语句 import 和 export
// 在cli中输入 node --experimental-modules 1.mjs

import { a, obj } from "./2"; // a, obj 名字不能乱填 涉及到解构赋值
import * as m2 from "./2";  // m2 是整个2.mjs文件导出的那个大的对象
import xx from "./2"

console.log(a); // 1
console.log(obj); // { x: 100 }
console.log(m2); // [Module] { a: 1, default: 100, obj: { x: 100 } }
console.log(xx); // 100