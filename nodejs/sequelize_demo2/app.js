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

  // 定义模型
  const UserModel = sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: ""
      },
      age: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      gender: {
        type: Sequelize.ENUM(["男", "女", "保密"]),
        allowNull: false,
        defaultValue: "男"
      }
    },
    {
      // 用来设置字段以外的其它信息
      timestamps: false,
      paranoid: false,
      freezeTableName: true, //是否在自定义的表名上自动加s
      tableName: "user2", // 实际使用的表名
      indexes: [
        {
          name: "uname",
          fileds: ["username"]
        },
        {
          name: "age",
          fileds: ["age"]
        }
      ]
    }
  );

  // let kimo = new UserModel();
  let kimo = UserModel.build({
    // 和上面new出来的一样
    // 字段对应的值
    username: "kimo",
    age: 30,
    gender: "男"
  });
  // 通过new或者build出来的对象不会立即同步到数据库中，需要使用一些后续的方法来同步
  // console.log(kimo);
  await kimo.save();
  console.log(kimo);
})();
