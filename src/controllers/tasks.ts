import { Request, Response } from 'express';
import { tasksServices } from '../services/tasks';

const getMany = async (req: Request, res: Response) => {
  const loadedLists = await tasksServices.getAllTasks();

  res.send(loadedLists);
};

const createTask = async (req: Request, res: Response) => {
  const { title, listId } = req.body;

  if (!title || !listId) {
    res.sendStatus(404);

    return;
  }

  const createList = await tasksServices.postTask({ title, listId });

  res.send(createList);
};

const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const isListExists = await tasksServices.getTaskById(+taskId);

  if (!isListExists) {
    res.sendStatus(404);

    return;
  }

  await tasksServices.deleteTask(+taskId);

  res.sendStatus(204);
};

const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, listId } = req.body;

  if (!title) {
    res.sendStatus(404);

    return;
  }

  const isListExists = tasksServices.getTaskById(+taskId);
  
  if (!isListExists) {
    res.sendStatus(404);

    return;
  }
  
  const updatedData = await tasksServices.updateTask(+taskId, title, listId);

  res.send(updatedData);
};

async function updateTaskOrder(req: Request, res: Response): Promise<void> {
  const { taskId, newPosition, newListId } = req.body;

  try {
    const success = await tasksServices.changeTaskOrder(taskId, newPosition, newListId);

    res.status(200).json({ success });
  } catch {
    res.sendStatus(500);
  }
}

export const tasksControllers = {
  getMany,
  createTask,
  deleteTask,
  updateTask,
  updateTaskOrder,
};
