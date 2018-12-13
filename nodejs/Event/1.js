const EventEmmiter = require("events");

class Person extends EventEmmiter {
  constructor(name) {
    super();
    this.name = name;
    this.age = 0;
    this.growup();
  }
  growup() {
    setInterval(() => {
      this.age++;
      this.emit("growup");
    }, 1000);
  }
}

const p1 = new Person("cs");

p1.addListener("growup", function() {
  console.log("长大了1岁");
})

// 各种自定义事件监听设置详情参考 http://nodejs.cn/api/events.html

// document.body.addEventListener("click")