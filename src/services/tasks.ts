import { Op } from 'sequelize';
import { sequelize } from '../../models';
import { TasksAttributes, Task, TasksInstance } from '../../models/tasks';

function normalize(task: TasksAttributes) {
  const copyOfLists = { ...task };

  delete copyOfLists.createdAt;

  return copyOfLists;
}

async function getAllTasks() {
  const loadedData: TasksAttributes[] = await Task.findAll({
    raw: true,
    order: ['order'],
  });

  return loadedData;
}

async function postTask(list: Pick<TasksAttributes, 'title' | 'listId'>) {
  const addTask = await Task.create({
    title: list.title,
    listId: list.listId
  });
  const plainTask = addTask.get({ plain: true });

  return normalize(plainTask);
}

async function deleteTask(taskId: number) {
  const removeTask = await Task.destroy({
    where: {
      id: taskId
    }
  });

  return removeTask;
}

async function updateTask(taskId: number, title: string, listId: number) {
  await Task.update({ title, listId }, {
    where: {
      id: taskId
    }
  });

  const updatedTask = await getTaskById(taskId) as TasksInstance;
  const plainTask = updatedTask.get({ plain: true });

  return normalize(plainTask);
}

function getTaskById(taskId: number) {
  return Task.findByPk(taskId);
}

async function changeTaskOrder(taskId: number, newPosition: number, newListId: number) {
  const task = await getTaskById(taskId);

  if (!task) {
    throw new Error(`Task with id ${taskId} not found`);
  }

  const currentOrder = task.order;
  const currentListId = task.listId;

  const transaction = await sequelize.transaction();

  try {
    if (currentListId === newListId && currentOrder && currentListId) {
      // Shift all the tasks between the old and the new position by 1
      if (currentOrder < newPosition) {
        await Task.update(
          { order: sequelize.literal('"order" - 1'), updatedAt: new Date() },
          {
            where: {
              order: {
                [Op.gt]: currentOrder,
                [Op.lte]: newPosition,
              },
              listId: currentListId,
              id: { [Op.ne]: taskId } // Exclude the current task from the update
            },
            transaction,
            silent: true // Only update the specified fields
          }
        );
      } else {
        await Task.update(
          { order: sequelize.literal('"order" + 1'), updatedAt: new Date() },
          {
            where: {
              order: {
                [Op.gte]: newPosition,
                [Op.lt]: currentOrder,
              },
              listId: currentListId,
              id: { [Op.ne]: taskId } // Exclude the current task from the update
            },
            transaction,
            silent: true // Only update the specified fields
          }
        );
      }
    } else {
      // Shift all the tasks after the new position by 1
      await Task.update(
        { order: sequelize.literal('"order" + 1'), updatedAt: new Date() },
        {
          where: {
            order: { [Op.gte]: newPosition },
            listId: newListId,
          },
          transaction,
          silent: true // Only update the specified fields
        }
      );

      // Shift all the tasks after the old position by -1
      await Task.update(
        { order: sequelize.literal('"order" - 1'), updatedAt: new Date() },
        {
          where: {
            order: { [Op.gt]: currentOrder },
            listId: currentListId,
          },
          transaction,
          silent: true // Only update the specified fields
        }
      );
    }

    // Update the task's position and listId
    await Task.update(
      { order: newPosition, listId: newListId, updatedAt: new Date() },
      {
        where: { id: taskId },
        transaction,
        silent: true // Only update the specified fields
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export const tasksServices = {
  normalize,
  getAllTasks,
  postTask,
  deleteTask,
  getTaskById,
  updateTask,
  changeTaskOrder,
};
