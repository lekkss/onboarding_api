import mysql from "mysql2";
import { dbConfig } from "../configs/db-config.js";
import Sequelize from "sequelize";
import User from "./user.js";
import Kyc from "./kyc.js";
import Bank from "./bank.js";
import DocumentTypes from "./document-types.js";

const { DATABASE, DIALECT, HOST, PASSWORD, USER } = dbConfig;

//Create database if not exist
const createDatabaseConnection = async () => {
  const connection = mysql
    .createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
    })
    .promise();
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`);
};

// Create the database before establishing the Sequelize connection
await createDatabaseConnection();
//Connect database
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  dialect: DIALECT,
  host: HOST,
});

//initiate connection
const db = {};
db.sequelize = sequelize;

db.models = {
  User: User(sequelize, Sequelize.DataTypes),
  Kyc: Kyc(sequelize, Sequelize.DataTypes),
  Bank: Bank(sequelize, Sequelize.DataTypes),
  DocumentTypes: DocumentTypes(sequelize, Sequelize.DataTypes),
};

db.models.User.hasOne(db.models.Kyc, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});
db.models.Kyc.belongsTo(db.models.User, {
  targetKey: "uuid",
  foreignKey: "user_id",
});

db.models.User.hasMany(db.models.Bank, {
  foreignKey: "user_id",
});
db.models.Bank.belongsTo(db.models.User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// db.models.User.hasMany(db.models.Invoice, {
//   foreignKey: "user_id",
// });

// db.models.Client.hasMany(db.models.Invoice, {
//   foreignKey: "client_id",
// });

// db.models.Invoice.belongsTo(db.models.User, {
//   foreignKey: "user_id",
//   targetKey: "uuid",
//   onDelete: "CASCADE",
// });
// db.models.Invoice.belongsTo(db.models.Client, {
//   foreignKey: "client_id",
//   targetKey: "uuid",
//   onDelete: "CASCADE",
// });

export { db };
