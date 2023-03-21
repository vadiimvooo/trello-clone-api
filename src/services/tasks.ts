import { TasksAttributes, Task, TasksInstance } from '../../models/tasks';

function normalize(task: TasksAttributes) {
  const copyOfLists = { ...task };

  delete copyOfLists.createdAt;

  return copyOfLists;
}

async function getAllTasks() {
  const loadedData: TasksAttributes[] = await Task.findAll({
    raw: true,
  });

  return loadedData.map(normalize);
}

async function postTask(list: Pick<TasksAttributes, 'title' | 'listId'>) {
  console.log(list);

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

export const tasksServices = {
  normalize,
  getAllTasks,
  postTask,
  deleteTask,
  getTaskById,
  updateTask,
};
