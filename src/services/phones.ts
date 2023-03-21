const { Phones } = require('../../models');
import { Phone as PhoneType } from '../types/Phone';

function normalize(phone: PhoneType) {
  const copyOfPhone = { ...phone };
  delete copyOfPhone.createdAt;
  return copyOfPhone;
}

async function getSomeNewest() {
  const loadedData: PhoneType[] = await Phones.findAll({
    order: [['year', 'DESC']],
    raw: true,
  });

  const result = loadedData.slice(0, 10).map(normalize);

  return {
    result,
    loadedData: loadedData.length,
  };
}

export const phonesServices = {
  normalize,
  getSomeNewest,
};
