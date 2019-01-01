(async function() {
  // const mysql = require("mysql2/promise");
  // const connection = await mysql.createConnection({
  //   host: "127.0.0.1",
  //   user: "root",
  //   password: "",
  //   database: "test2"
  // });

  // let [users] = await connection.query("SELECT username,age,gender FROM users");
  // console.log(users);
  // users.forEach(user => {
  //   console.log(user.username);
  // });

  const Koa = require("koa");
  const Static = require("koa-static-cache");
  const Router = require("koa-router");
  const BodyParser = require("koa-bodyparser");
  const fs = require("fs");
  const Mysql = require("mysql2/promise");

  const app = new Koa();

  app.use(BodyParser());

  app.use(
    Static("./static", {
      prefix: "/static",
      gzip: true
    })
  );

  const connection = await Mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "test2"
  });

  const router = new Router();

  router.get("/", ctx => {
    // 如果觉得 /static/index.html 太丑，可以使用这里的方法，实际就是koa-static-cache模块的实现原理
    let content = fs.readFileSync("./static/index.html");
    ctx.body = content.toString();
  });

  router.get("/todos", async ctx => {
    // ctx.body = [
    //   { id: 1, title: "学习node", done: true },
    //   { id: 2, title: "学习koa2", done: true },
    //   { id: 3, title: "学习mysql", done: false }
    // ];
    let page = ctx.query.page || 1;
    page = Number(page);
    let prepage = ctx.query.prepage || 4;
    prepage = Number(prepage);
    let type = ctx.query.type;
    let where = "";

    if (type) {
      where = "WHERE done=" + type;
    }

    // 查询总的记录条数
    const sql2 = `SELECT id,title,done FROM todos ${where}`;
    const [todosAll] = await connection.query(sql2);

    // 计算总页码
    const pages = Math.ceil(todosAll.length / prepage);

    // const sql = `SELECT id,title,done FROM todos  LIMIT ${prepage} OFFSET ${(page - 1) * prepage}`;

    // where 条件过滤
    // const sql = `SELECT id,title,done FROM todos ${where} LIMIT ${prepage} OFFSET ${(page - 1) * prepage}`;

    // where ??=?   ??表示字段名或者表名  ?表示值
    const sql = `SELECT id,title,done FROM todos ${where} LIMIT ? OFFSET ?`;
    // console.log(sql);
    // let [data] = await connection.query(sql); // 直接使用拼接好的sql语句
    let [data] = await connection.query(sql, [prepage, (page - 1) * prepage]); // 占位符用法
    // console.log(data);
    ctx.body = {
      code: 0,
      data: {
        page,
        prepage,
        pages,
        todos: data
      }
    };
  });

  router.post("/toggle", async ctx => {
    const id = Number(ctx.request.body.id) || 0;
    const todo = Number(ctx.request.body.todo) || 0;

    let sql = `UPDATE todos SET ??=? WHERE ??=?`;
    let [rs] = await connection.query(sql, ["done", todo, "id", id]);
    if (rs.affectedRows > 0) {
      ctx.body = {
        code: 0,
        data: "修改成功"
      };
    } else {
      ctx.body = {
        code: 1,
        data: "修改失败"
      };
    }
  });

  router.post("/remove", async ctx => {
    const id = Number(ctx.request.body.id) || 0;
    let sql = `DELETE FROM todos WHERE ??=?`;
    let [rs] = await connection.query(sql, ["id", id]);
    if (rs.affectedRows > 0) {
      ctx.body = {
        code: 0,
        data: "删除成功"
      };
    } else {
      ctx.body = {
        code: 1,
        data: "删除失败"
      };
    }
  });

  router.post("/add", async ctx => {
    const title = ctx.request.body.title || "";

    if (title == "") {
      ctx.body = {
        code: 1,
        data: "title不能为空"
      };
      return;
    }
    const [rs] = await connection.query("INSERT INTO todos (title, done) VALUES ('" + title + "', 0)");

    if (rs.affectedRows > 0) {
      ctx.body = {
        code: 0,
        data: "添加成功"
      };
    } else {
      ctx.body = {
        code: 2,
        data: "添加失败"
      };
    }
  });

  app.use(router.routes());

  app.listen(8080);
})();
