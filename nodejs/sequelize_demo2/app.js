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
  // let kimo = UserModel.build({
  //   // 和上面new出来的一样
  //   // 字段对应的值
  //   username: "kimo",
  //   age: 30,
  //   gender: "男"
  // });
  // 通过new或者build出来的对象不会立即同步到数据库中，需要使用一些后续的方法来同步
  // console.log(kimo);
  // await kimo.save();
  // console.log(kimo);

  // let kimo = await UserModel.findById(2);
  // console.log(kimo);
  // kimo.set("age", 40);
  // await kimo.save();
  // await kimo.update({
  //   age: 44
  // });
  // kimo.destroy();
  // let rs = await UserModel.findOne({
  //   where: {
  //     username: "reci"
  //   }
  // });
  // console.log(rs);
  // let rs = await UserModel.findAll();
  // console.log(rs.map(r => r.get("username")));

  // let rs = await UserModel.findAll({
  //   where: {
  //     // username: {
  //     //   [Sequelize.Op.eq]: "reci"  // 等同于 username: "reci"
  //     // }

  //     // 单条件查询
  //     // age: {
  //     //   [Sequelize.Op.gt]: 20 // age > 20 的数据
  //     // }

  //     // 多条件查询
  //     // [Sequelize.Op.or]: [
  //     //   {
  //     //     age: {
  //     //       [Sequelize.Op.gt]: 20
  //     //     }
  //     //   },
  //     //   {
  //     //     gender: "女"
  //     //   }
  //     // ]
  //   }
  // });
  // console.log(rs.map(r => r.get("username")));

  // let rs = await UserModel.findAll({
  //   limit: 2
  // });
  // let rs = await UserModel.findAll({
  //   offset: 2
  // });
  // let rs = await UserModel.findAll({
  //   order: [["age", "desc"]]
  // });
  // let count = await UserModel.count();
  // console.log(count);

  // 组合方法 UserModel.findAndCountAll({})
  // console.log(rs.map(r => r.get("username")));

  // let rs = await UserModel.sum("age", {
  //   where: {
  //     gender: "男"
  //   }
  // });
  // console.log(rs);

  const MessageModel = sequelize.define(
    "message",
    {
      id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      uid: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
        references: {
          //设置外键关系
          model: UserModel,
          key: "id"
        }
      },
      content: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: ""
      }
    },
    {
      // 用来设置字段以外的其它信息
      timestamps: false,
      freezeTableName: true, //是否在自定义的表名上自动加s
      tableName: "message2" // 实际使用的表名
    }
  );

  // 根据某条留言查询留言内容和这条留言用户的所有信息
  // let data = {};
  // let message = await MessageModel.findById(2);
  // let user = await UserModel.findById(message.get("uid"));
  // Object.assign(data, {
  //   id: message.get("id"),
  //   uid: message.get("uid"),
  //   username: user.get("username"),
  //   age: user.get("age"),
  //   gender: user.get("gender"),
  //   content: message.get("content")
  // });
  // console.log(data);

  // MessageModel.belongsTo(UserModel, {
  //   foreignKey: "uid"
  // });

  // let data2 = await MessageModel.findById(2, {
  //   include: [UserModel]
  // });
  // console.log(`
  //   id: ${data2.get("id")}
  //   content: ${data2.get("content")}
  //   user: ${data2.User.username}
  // `);

  UserModel.hasMany(MessageModel, {
    foreignKey: "uid"
  });
  let data3 = await UserModel.findById(3, {
    include: [MessageModel]
  });
  console.log(data3);
})();
