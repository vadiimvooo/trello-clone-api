import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface TasksAttributes {
  id: number;
  title: string;
  order?: number;
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
    order: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }
);

Task.beforeCreate(async (task: TasksInstance) => {
  if (!task.order) {
    const maxOrder = await Task.max('order', { where: { listId: task.listId } });
    task.order = typeof maxOrder === 'number' ? maxOrder + 1 : 0;
  }
});

export default Task;