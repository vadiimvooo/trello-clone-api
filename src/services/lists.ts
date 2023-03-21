import { ListsAttributes, List, ListInstance } from '../../models/lists';

function normalize(list: ListsAttributes) {
  const copyOfLists = { ...list };

  delete copyOfLists.createdAt;
  delete copyOfLists.updatedAt;

  return copyOfLists;
}

async function getAllLists() {
  const loadedData: ListsAttributes[] = await List.findAll({
    raw: true,
  });

  return loadedData.map(normalize);
}

async function postList(list: Pick<ListsAttributes, 'title'>) {
  const addList = await List.create({
    title: list.title
  });
  const plainList = addList.get({ plain: true });

  return normalize(plainList);
}

async function deleteList(listId: number) {
  const removeList = await List.destroy({
    where: {
      id: listId
    }
  });

  return removeList;
}

async function updateList(listId: number, title: string) {
  await List.update({ title }, {
    where: {
      id: listId
    }
  });

  const updatedList = await getListById(listId) as ListInstance;
  const plainList = updatedList.get({ plain: true });

  return normalize(plainList);
}

function getListById(listId: number) {
  return List.findByPk(listId);
}

export const listsServices = {
  normalize,
  getAllLists,
  postList,
  deleteList,
  getListById,
  updateList,
};
