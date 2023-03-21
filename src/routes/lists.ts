import express from 'express';
import { listsControllers } from '../controllers/lists';

export const router = express.Router();

router.get('/', listsControllers.getMany);
router.post('/', listsControllers.createList);
router.delete('/:listId', listsControllers.deleteList);
router.patch('/:listId', listsControllers.updateList);
