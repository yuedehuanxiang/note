const Sequelize = require("sequelize");

const sequelize = new Sequelize("miaov", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("连接成功");
  })
  .catch(err => {
    console.log("连接失败");
  });

// 定义模型
const User = sequelize.define("User", {
  // ... 字段具体配置和设置索引与映射的真实表民啥的
});

User.findAll().then(rs => {
  console.log(rs);
});
