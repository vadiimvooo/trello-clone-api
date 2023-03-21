import { Request, Response } from 'express';
import { listsServices } from '../services/lists';

const getMany = async (req: Request, res: Response) => {
  const loadedLists = await listsServices.getAllLists();

  res.send(loadedLists);
};

const createList = async (req: Request, res: Response) => {
  const { title } = req.body;

  const createList = await listsServices.postList({ title });

  res.send(createList);
};

const deleteList = async (req: Request, res: Response) => {
  const { listId } = req.params;

  const isListExists = await listsServices.getListById(+listId);

  if (!isListExists) {
    res.sendStatus(404);

    return;
  }

  await listsServices.deleteList(+listId);

  res.sendStatus(204);
};

const updateList = async (req: Request, res: Response) => {
  const { listId } = req.params;
  const { title } = req.body;

  const isListExists = listsServices.getListById(+listId);
  
  if (!isListExists) {
    res.sendStatus(404);

    return;
  }
  
  const updatedData = await listsServices.updateList(+listId, title);

  res.send(updatedData);
};

export const listsControllers = {
  getMany,
  createList,
  deleteList,
  updateList,
};
