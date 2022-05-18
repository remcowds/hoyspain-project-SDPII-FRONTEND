import {
  axios
} from './index';

const linkAPI = '/recensie';

export const GETRecensiesByWoning = async (woningID) => {
  return await axios.get(`${linkAPI}/${woningID}`);
};

export const POSTRecensie = async (recensieData) => {
  return await axios.post(linkAPI, recensieData);
};

// export const editWoning = async (woningID, bodyData) => {
//   return await axios.put(`${linkAPI}/${woningID}`, bodyData);
// };

// export const deleteWoning = async (woningID) => {
//   return await axios.delete(`${linkAPI}/${woningID}`);
// };