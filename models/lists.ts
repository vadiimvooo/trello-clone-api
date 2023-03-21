import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Task from './tasks';

export interface ListsAttributes {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ListsCreationAttributes = Optional<ListsAttributes, 'id'>

export interface ListInstance
  extends Model<ListsAttributes, ListsCreationAttributes>,
    ListsAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

export const List = sequelize.define<ListInstance>(
  'Lists',
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

List.hasMany(Task, {
  sourceKey: 'id',
  foreignKey: 'listId',
  as: 'list'
});

Task.belongsTo(List, {
  foreignKey: 'listId',
  as: 'author'
});

export default List;