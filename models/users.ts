import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  UUIDV4,
} from "sequelize";
import sequelize from "../config/database";

export interface IUser {
  id?: string;
  username: string;
  password: string;
}

class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements IUser
{
  declare id?: CreationOptional<string>;
  declare username: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

export default User;
