(async function() {
  const Sequelize = require("sequelize");
  const sequelize = new Sequelize("miaov", "root", "", {
    // host: "127.0.0.1",
    // port: 3306,
    dialect: "mysql",
    timezone: "Asia/Shanghai"
  });

  try {
    sequelize.authenticate();
    console.log("连接成功");
  } catch (err) {
    console.log("连接失败");
  }
  // 以上为连接数据库的基本前置 配置
})();
