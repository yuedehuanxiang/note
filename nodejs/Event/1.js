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

// document.body.addEventListener("click")