import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface TasksAttributes {
  id: number;
  title: string;
  listId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TasksCreationAttributes = Optional<TasksAttributes, 'id'>

export interface TasksInstance
  extends Model<TasksAttributes, TasksCreationAttributes>,
    TasksAttributes {
      createdAt: Date;
      updatedAt: Date;
    }

export const Task = sequelize.define<TasksInstance>(
  'Tasks',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    title: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
  }
);

export default Task;