import { config } from "dotenv";
import { Options, Sequelize } from "sequelize";

config();
const DB_OPTIONS: Options = {
  host: process.env.HOST,
  dialect: "mysql",
  username: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
};
const sequelize = new Sequelize(DB_OPTIONS);
export default sequelize;
