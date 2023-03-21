import { Request, Response } from 'express';
import { tasksServices } from '../services/tasks';

const getMany = async (req: Request, res: Response) => {
  const loadedLists = await tasksServices.getAllTasks();

  res.send(loadedLists);
};

const createTask = async (req: Request, res: Response) => {
  const { title, listId } = req.body;

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

  const isListExists = tasksServices.getTaskById(+taskId);
  
  if (!isListExists) {
    res.sendStatus(404);

    return;
  }
  
  const updatedData = await tasksServices.updateTask(+taskId, title, listId);

  res.send(updatedData);
};

export const tasksControllers = {
  getMany,
  createTask,
  deleteTask,
  updateTask,
};
