const Koa = require("koa");
const StaticCache = require("koa-static-cache");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");
const fs = require("fs");

const app = new Koa();

app.use(BodyParser());

// 静态
app.use(
  StaticCache("./static", {
    prefix: "/static",
    gzip: true
  })
);

const router = new Router();

let data = JSON.parse(fs.readFileSync("./data/data.json"));
// let data = {
//   _id: 3,
//   todos: [
//     { id: 1, title: "学习node", done: true },
//     { id: 2, title: "学习koa", done: false },
//     { id: 3, title: "学习mysql", done: false }
//   ]
// };

router.get("/", async ctx => {
  ctx.body = "hello";
});

router.get("/todos", async ctx => {
  ctx.body = {
    code: 0,
    data: data.todos
  };
});

router.post("/toggle", async ctx => {
  let id = ctx.request.body.id || 0;
  if (!id) {
    ctx.body = {
      code: 1,
      data: "请传入id"
    };
    return;
  }

  let todo = data.todos.find(todo => todo.id == id);
  todo.done = !todo.done;
  ctx.body = {
    code: 0,
    data: todo
  };

  fs.writeFileSync("./data/data.json", JSON.stringify(data));
});

router.post("/remove", async ctx => {
  let id = ctx.request.body.id || 0;
  if (!id) {
    ctx.body = {
      code: 1,
      data: "请传入id"
    };
    return;
  }

  data.todos = data.todos.filter(todo => todo.id != id);

  ctx.body = {
    code: 0,
    data: "删除成功"
  };
  fs.writeFileSync("./data/data.json", JSON.stringify(data));
});

router.post("/add", async ctx => {
  let title = ctx.request.body.title || "";
  if (!title) {
    ctx.body = {
      code: 1,
      data: "请传入任务标题"
    };
    return;
  }

  let newTask = {
    id: ++data._id,
    title,
    done: false
  };

  data.todos.push(newTask);
  ctx.body = {
    code: 0,
    data: newTask
  };
  fs.writeFileSync("./data/data.json", JSON.stringify(data));
});

app.use(router.routes());

app.listen(8080);
