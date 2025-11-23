import { Optional } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model.js";
import type { TaskStatus, TaskPriority } from "../types/task.types.js";

export interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  userId: number;
  deadline?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type TaskCreationAttributes = Optional<
  TaskAttributes,
  "id" | "createdAt" | "updatedAt"
>;

@Table({ tableName: "tasks" })
export class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  @Column(DataType.TEXT)
  declare description?: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM,
    values: ["todo", "in-progress", "review", "done"],
    defaultValue: "todo",
  })
  declare status: TaskStatus;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM,
    values: ["low", "medium", "high"],
    defaultValue: "medium",
  })
  declare priority: TaskPriority;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  declare assignee: User;

  @Column(DataType.DATE)
  declare deadline?: Date;

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;
}
