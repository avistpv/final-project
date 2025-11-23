import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Task } from "./task.model.js";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Omit<
  UserAttributes,
  "id" | "createdAt" | "updatedAt"
>;

@Table({ tableName: "users" })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @HasMany(() => Task)
  declare tasks: Task[];

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;
}
